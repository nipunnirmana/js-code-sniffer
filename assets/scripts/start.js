var app = require("electron");
var cp = require("child_process");
var eslint = require("eslint");

const formatPath = path =>
  path
    .replace(/[(]/g, "\\(")
    .replace(/[)]/g, "\\)")
    .replace(/ /g, "\\ ");

const showError = error => {
  document.querySelector(".results-error-summary").textContent =
    error.errorSummary;
};

document.ondragover = document.ondrop = ev => {
  ev.preventDefault();
};

document.querySelector(".start-screen-wrapper").addEventListener("drop", e => {
  if (e.dataTransfer.files) {
    document.querySelector(".start-screen-wrapper").style.display = "none";
    document.querySelector(".start-screen-main-text").textContent =
      "Checking ...";
    const file = e.dataTransfer.files;
    let fileList = [];

    for (i = 0; i < e.dataTransfer.files.length; i++) {
      fileList.push(formatPath(e.dataTransfer.files[i].path));
    }

    const configPath = `${formatPath(
      app.remote.process.env.PWD
    )}/.eslintrc.json`;

    cp.exec(
      `eslint ${fileList.join(" ")} --c ${configPath} -f json`,
      (err, stdout, stderr) => {
        const parsedErrorData = JSON.parse(stdout);

        parsedErrorData.forEach((val, key) => {
          let eCount = val.errorCount;
          let wCount = val.warningCount;
          let filePath = val.filePath;
          let errors = [];

          val.messages.forEach((val, key) => {
            errors.push(val.line, escape(val.message));
          });

          let errorSummary = `${eCount +
            wCount} problems (${eCount} errors, ${wCount} warnings)`;

          document.querySelector(
            ".results"
          ).innerHTML += `<pre><div class='error-wrapper' > ${filePath +
            errors}  </div></pre>`;

          document.querySelector(
            ".side-panel-file-list"
          ).innerHTML += `<li onclick='showError(${JSON.stringify({
            errorSummary,
            filePath,
            errors: JSON.stringify(errors)
          })})'>${filePath}</li>`;
        });
      }
    );
  }
});
