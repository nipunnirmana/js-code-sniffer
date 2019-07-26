setTimeout(function() {
  document.querySelector(".splash-wrapper").className += " active";
  setTimeout(function() {
    window.location.href = "./start.html";
  }, 1500);
}, 2500);
