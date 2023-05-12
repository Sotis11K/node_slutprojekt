import functionPlot from 'function-plot'
import { create, all } from 'mathjs'
import mathjsSimpleIntegral from 'mathjs-simple-integral';

const config = { }
const math = create(all, config)



var y = 'x^2'

var x1i = ''
var x1s = ''
var x2i = ''
var x2s = ''



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



/*window.onload = (event) => {
  var submit = document.querySelector(".submit")
  submit.addEventListener("click", inputReader)
  functionPlot(options)
};*/

window.onload = (event) => {
        [document.querySelector(".submit"), document.querySelector("#tangent-activate"), document.querySelector("#updateVec"), document.querySelectorAll(".xVal-update")[0], document.querySelectorAll(".xVal-update")[1], document.querySelector(".deriv-update")].forEach(element=>{
            element.addEventListener("click", inputReader)
        })
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
                var y = document.querySelector('#graphFunction').value;
                var xVal = document.querySelector('.x-value').value;


                var fx = (math.simplify(y).evaluate({x:xVal})).toString()

                if(document.querySelector('.x-value').value === ''){
                    console.log("har inte sträng")
                    var p = document.createElement("p")
                    p.innerHTML = "f(x) = "+y
                    document.querySelector(".xVal-output").append(p)
                }


                else if(document.querySelector('.x-value').value != ''){
                    console.log("har sträng")
                    var p = document.createElement('p')
                    p.innerHTML = "f("+xVal+") = "+fx
                    document.querySelector(".xVal-output").append(p)
                }


                var simplyText = document.querySelector(".simplify-string")


                if(simplyText.value != ""){
                    var p = document.createElement("p")
                    p.innerHTML = math.simplify(simplyText.value).toString()
                    document.querySelector(".simplify-container").append(p)
                }

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
                var x1t = document.querySelector('.x1t').value;
                var x2t = document.querySelector('.x2t').value;

                if(x1t == '' || x2t == '' || x1t>x2t || x1t==x2t){
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
                    else if(x1t != '' || x2t != ''){
                       
                        console.log("Hej")
                        console.log(math.integral('x^2', 'x')); // 'x ^ 3 / 3'
                        console.log(math.integral('x^2', 'x').toString()); // 'x ^ 3 / 3'








































                        
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
                                    range: [x1t, x2t],
                                    closed: true
                                }]
                            }
                        }
                    
            }
      
    


        else if(mathOption == "tangent"){
            console.log(mathOption)
                var y = document.querySelector('#graphFunction').value;
                var deriv = math.derivative(y, 'x').toString()

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
                            derivative:{

                                fn: deriv, color: 'blue',
                                updateOnMouseMove: true
                            }
                        }]
                    }
        }


        else if(mathOption == "secant"){
            console.log(mathOption)
            var y = document.querySelector('#graphFunction').value;
            var x1s = document.querySelector('.x1s').value;
            var x2s = document.querySelector('.x2s').value;

            var x1sNum = parseInt(x1s)
            var x2sNum = parseInt(x2s)

            console.log(x1sNum)
            console.log(x2sNum)



            if(x1s == '' || x2s == '' || x1s>x2s || x1s==x2s){
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
                else if(!x1s == '' || !x2s == ''){
                    console.log("funkar")
                    options={
                        target: '#root',
                        title: 'Graf',
                        width: 700,
                        height: 500,
                        xAxis: { domain: [-5, 5] },
                        yAxis: { domain: [-5, 5] },
                        grid: true,
                        data: [{
                            fn: y, color: 'blue',
                            secants: [{
                                x0: x2sNum, color: 'blue',
                                updateOnMouseMove: true
                            }, {
                                x0: x1sNum, color: 'blue',
                                updateOnMouseMove: true
                            }]
                        }]
                    }
                }
            }

            else if(mathOption == "derivative"){
                console.log(mathOption)
                    var y = document.querySelector('#graphFunction').value;
                    var deriv = math.derivative(y, 'x').toString()
                    var xDerValue = document.querySelector(".x-deriv").value

                    var p1 = document.createElement("p")
                    p1.innerHTML = deriv
                    document.querySelector(".deriv-output").append(p1)

                   

                    if(xDerValue != null || xDerValue != ""){
                        var p3 = document.createElement("p")
                        p3.innerHTML = (math.derivative(y, 'x').evaluate({x:xDerValue})).toString()
                        document.querySelector(".deriv-output").append(p3)
                    }
                    
    
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
                                derivative:{
    
                                    fn: deriv, color: 'blue',
                                    updateOnMouseMove: true
                                }
                            }]
                        }
            }


            else if(mathOption == "vector"){
                console.log(mathOption)
                var y = document.querySelector('#graphFunction').value;
                var x1v = document.querySelector('.x1v').value;
                var x2v = document.querySelector('.x2v').value;
                var y1v = document.querySelector('.y1v').value;
                var y2v = document.querySelector('.y2v').value;


                var x1vNum = parseInt(x1v)
                var y1vNum = parseInt(y1v)
                var x2vNum = parseInt(x2v)
                var y2vNum = parseInt(y2v)
    
                if(x1v == '' || x2v == '' || y1v == '' || y2v == ''){
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
                    else if(!x1v == '' || !x2v == '' || !y2v == '' || !y2v == ''){
                        options={
                            target: '#root',
                            title: 'Graf',
                            width: 700,
                            height: 500,
                            xAxis: { domain: [-5, 5] },
                            yAxis: { domain: [-5, 5] },
                            grid: true,
                            data: [{
                                vector: [x2vNum, y2vNum],
                                offset: [x1vNum, y1vNum],
                                graphType: 'polyline',
                                fnType: "vector"
                              }]
                        }
                    }
            }


            else if(mathOption == "annotations"){
                console.log(mathOption)
                var y = document.querySelector('#graphFunction').value;
                var xa = document.querySelector('.xa').value;
                var ya = document.querySelector('.ya').value;
                
                    options={
                        target: '#root',
                        title: 'Graf',
                        width: 700,
                        height: 500,
                        xAxis: { domain: [-5, 5] },
                        yAxis: { domain: [-5, 5] },
                        grid: true,
                        data: [{
                            fn: y, color:'blue'
                          }],
                          annotations: [{
                            x: xa
                          }, {
                            y: ya
                          }]
            }
        





    }
                
        functionPlot(options);
    }


};


[document.querySelector("#tangent-deactivate")].forEach(element=>{
    element.addEventListener('click', cancelMath)
})

function cancelMath(){
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
    functionPlot(options)
}


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



