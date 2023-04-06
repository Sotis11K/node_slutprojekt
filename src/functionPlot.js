
import functionPlot from 'function-plot'

var y = 'x^2'

var options={
  target: '#root',
  title: 'Graf',
  width: 700,
  height: 500,
  xAxis: { domain: [-5, 5] },
  yAxis: { domain: [-5, 5] },
  grid: true,
  data: [
      {
      fn: y, color: 'blue', opacity: 1
  }]
}


window.onload = (event) => {
  var submit = document.querySelector(".submit")
  submit.addEventListener("click", inputReader)
  functionPlot(options)
};


function inputReader(){

    if(document.querySelector('#graphFunction').value == ""){
        console.log("ingen sträng")
        return
    }
    else{
        var y = document.querySelector('#graphFunction').value;
        options={
            target: '#root',
            title: 'Graf',
            width: 700,
            height: 500,
            xAxis: { domain: [-5, 5] },
            yAxis: { domain: [-5, 5] },
            grid: true,
            data: [
                {
                fn: y, color: 'blue', opacity: 1
            }]
        }
        console.log(options.target);
        functionPlot(options);

    }
    

};