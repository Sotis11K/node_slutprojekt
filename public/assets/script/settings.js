/*function getColor(){

  
  fetch('/colors')
  .then(response => response.json())
  .then(hexColor => {

    var x = false
    var i = 0;

    var color = document.querySelector("#pageColor").value
    console.log(color)

    var searchField = "themeColor";
    var searchVal = color;


    while(!x){
      if (hexColor[i][searchField] == searchVal) {
          console.log((hexColor[i]));
          var x = true
      }
      i++;
  }
  i--;
  console.log("hej");
    document.querySelector(".container").style.background = hexColor[i].themeColor
  })
}
*/



var themeColor = document.querySelector("#pageColor").value

console.log(themeColor)

function test(){
  document.querySelector(".containerSettings").style.background = themeColor
}