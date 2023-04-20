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
        fn: y, color: 'blue'
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
        var mathOption = document.querySelector('.calculate-selection').dataset.calc;
        if(mathOption == undefined || mathOption == null || mathOption == ""){
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
                        fn: y, color: 'blue'
                    }]
            }
        }

            else if(mathOption == "y"){
                console.log(mathOption)
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
                            fn: y, color: 'blue'
                        }]
                }
            }
                        


            else if(mathOption == "integral"){

                console.log(mathOption)

                var y = document.querySelector('#graphFunction').value;
                var x1 = document.querySelector('#x1').value;
                var x2 = document.querySelector('#x2').value;

                if(x1 == '' || x2 == '' || x1>x2 || x1==x2){
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
            }
      
    


        else if(mathOption == "tangent"){
            console.log(mathOption)
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
                            fn: "x^2", color: 'blue',
                            derivative:{
                                fn: "2x",
                                updateOnMouseMove: true
                            }
                        }]
                    }
        }


        else if(mathOption == "secant"){
            console.log(mathOption)
                var y = document.querySelector('#graphFunction').value;
                options={
                    target: '#root',
                    title: 'Graf',
                    width: 700,
                    height: 500,
                    xAxis: { domain: [-5, 5] },
                    yAxis: { domain: [-5, 5] },
                    grid: true,
                    data: [{
                        fn: 'x^2',
                        secants: [{
                          x0: 2,
                          updateOnMouseMove: true
                        }, {
                          x0: -2,
                          updateOnMouseMove: true
                        }]
                      }]
                    }
        }
                
        functionPlot(options);
    }


};


/*
if(tangent == 2){
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
                fn: 'x^2', color: 'blue',
                derivative: {
                    fn: '2 * x',
                    updateOnMouseMove: true
                }
            }]
        }
        tangent--;
}
else if(tangent == 1){
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
        tangent++;
}*/

