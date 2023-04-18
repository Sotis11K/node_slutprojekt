import functionPlot from 'function-plot'
var y = 'x^2'
var x1 = ''
var x2 = ''
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
        fn: y, color: 'blue',
        range: [x1,x2],
        closed: true
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
        var x1 = document.querySelector('#x1').value;
        var x2 = document.querySelector('#x2').value;

        if(x1 == '' || x2 == '' || x1>x2 || x1==x2){
            console.log("x1 and x2 = null")
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
                    fn: y, color: 'blue'
                }]
            }
        }
        else if(!x1 == '' || !x2 == ''){
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
                    fn: y, color: 'blue',
                    range: [x1, x2],
                    closed: true
                }]
            }
        }


        functionPlot(options);
    }
};