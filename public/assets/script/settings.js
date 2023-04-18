var theInput = document.getElementById("pageColor");

theInput.addEventListener("input", function(){
  var theColor = theInput.value;

  document.querySelector(".container").style.background = theColor
}, false);