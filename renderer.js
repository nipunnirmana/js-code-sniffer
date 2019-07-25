// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var cp = require("child_process");
var eslint = require("eslint");
const buttonCreated = document.getElementById("eslint");
buttonCreated.addEventListener("click", function(event) {
  buttonCreated.disabled = true;
  document.querySelector(".log").innerHTML = "Running Eslint ...";
  cp.exec("eslint . -f json", (err, stdout, stderr) => {
    buttonCreated.disabled = false;
    document.querySelector(".log").innerHTML = "";

    JSON.parse(stdout).forEach((val, key) => {
      let eCount = val.errorCount;
      let wCount = val.warningCount;
      let filePath = `<div class="file-path"> ${val.filePath} </div>`;
      let errors = "";

      val.messages.forEach((val, key) => {
        errors += `<div class="error"> :${val.line} ${val.message} </div>`;
      });

      let errorSummary = `${eCount +
        wCount} problems (${eCount} errors, ${wCount} warning)`;

      document.querySelector(
        ".log"
      ).innerHTML += `<pre><div class='error-wrapper' > ${filePath +
        errors +
        errorSummary}  </div></pre>`;
    });
  });
});
