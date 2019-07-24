// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var cp = require("child_process");
var eslint = require("eslint");
const buttonCreated = document.getElementById("eslint");
buttonCreated.addEventListener("click", function(event) {
  document.querySelector(".log").innerHTML = "Running Eslint ...";
  cp.exec("eslint sample.js", function(err, stdout, stderr) {
    document.querySelector(".log").innerHTML = "<pre>" + stdout + "</pre>";
  });
});
