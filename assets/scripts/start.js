var app = require("electron");
var cp = require("child_process");
var eslint = require("eslint");

const formatPath = path =>
  path
    .replace(/[(]/g, "\\(")
    .replace(/[)]/g, "\\)")
    .replace(/ /g, "\\ ");

const formatErrorType = severity => (severity === 2 ? "error" : "warning");

const showError = errorData => {
  document.querySelector(".results-error-summary").textContent =
    errorData.errorSummary;

  document.querySelector(".error-list").innerHTML = "";

  const unescapedParsedErrorList = JSON.parse(unescape(errorData.errors));
  unescapedParsedErrorList.forEach((val, key) => {
    document.querySelector(".error-list").innerHTML += `<li>
    <div class="error-line error-attribute">LINE</div>
    <div class="error-description">${val.line}:${val.endLine}</div>
    <div class="error-rule error-attribute">RULE</div>
    <div class="error-description">${val.nodeType} (${val.ruleId})</div>
    <div class="error-type-${formatErrorType(
      val.severity
    )} error-attribute">${formatErrorType(val.severity)}</div>
    <div class="error-description">${val.message}</div>
    </li>`;
  });
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
            errors.push({ line: val.line, msg: escape(val.message), s: 1 });
          });

          let errorSummary = `${eCount +
            wCount} problems (${eCount} errors, ${wCount} warnings)`;

          document.querySelector(
            ".side-panel-file-list"
          ).innerHTML += `<li title="${filePath}" onclick='showError(${JSON.stringify(
            {
              errorSummary,
              filePath,
              errors: escape(JSON.stringify(val.messages))
            }
          )})'>${filePath.split("/").pop()}</li>`;
        });

        document.querySelector(".side-panel-file-list li").click();
      }
    );
  }
});
