var cp = require("child_process");
var eslint = require("eslint");

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
      fileList.push(e.dataTransfer.files[i].path);
    }

    cp.exec(
      `eslint ${fileList.join(" ")} --no-eslintrc`,
      (err, stdout, stderr) => {
        document.querySelector(".start-screen-wrapper").className += " checked";
        document.querySelector(".results").innerHTML =
          "<pre>" + stdout + "</pre>";
      }
    );
  }
});
