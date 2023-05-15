import functionPlot from 'function-plot'
import { create, all } from 'mathjs'
import mathjsSimpleIntegral from 'mathjs-simple-integral';

const config = { }
const math = create(all, config)

var graphWidth = 700;
var graphHeight = 500;


if (window.matchMedia("(min-width: 801px)").matches) {
    graphWidth = 700;
    graphHeight = 500;
} else {
    graphWidth = 390;
    graphHeight = 370;
}

window.addEventListener("resize", function() {
    if (window.matchMedia("(min-width: 801px)").matches) {
        graphWidth = 700;
        graphHeight = 500;
        var options = {
            target: '#root',
            title: 'Graf',
            width: graphWidth,
            height: graphHeight,
            xAxis: { domain: [-5, 5] },
            yAxis: { domain: [-5, 5] },
            grid: true,
            data: [
                {
                    fn: y,
                    color: graphColor
                }
            ]
        }
        functionPlot(options)
    } else {
        graphWidth = 390;
        graphHeight = 370;
        var options = {
            target: '#root',
            title: 'Graf',
            width: graphWidth,
            height: graphHeight,
            xAxis: { domain: [-5, 5] },
            yAxis: { domain: [-5, 5] },
            grid: true,
            data: [
                {
                    fn: y,
                    color: graphColor
                }
            ]
        }
        functionPlot(options)
    }
});

var y = 'x^2';
var graphColor = "#0000ff";

var x1i = '';
var x1s = '';
var x2i = '';
var x2s = '';

var options = {
    target: '#root',
    title: 'Graf',
    width: graphWidth,
    height: graphHeight,
    xAxis: { domain: [-5, 5] },
    yAxis: { domain: [-5, 5] },
    grid: true,
    data: [
        {
            fn: y,
            color: graphColor
        }
    ]
};



window.onload = (event) => {
        [document.querySelector(".submit"), document.querySelector("#tangent-activate"), document.querySelector("#updateVec"), document.querySelectorAll(".xVal-update")[0], document.querySelectorAll(".xVal-update")[1], document.querySelector(".deriv-update"), document.getElementById("graph-color-button")].forEach(element=>{
            element.addEventListener("click", inputReader)
        })
        functionPlot(options)
};



function inputReader(){
    if(document.querySelector('#graphFunction').value == ""){
        var graphColor = document.getElementById("graph-color").value
        alert("No input detected in graph input")
        options={
            target: '#root',
            title: 'Graf',
            width: graphWidth,
            height: 500,
            xAxis: { domain: [-5, 5] },
            yAxis: { domain: [-5, 5] },
            grid: true,
            data: [
                {
                    fn: 'x^3', color: graphColor
                }]
        }
    }
    else{
        var mathOption = document.querySelector('.calculate-selection').dataset.calc;
        if(mathOption == undefined || mathOption == null || mathOption == ""){
            var y = document.querySelector('#graphFunction').value;
            var graphColor = document.getElementById("graph-color").value
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
                        fn: y, color: graphColor
                    }]
            }
        }

            else if(mathOption == "y"){
                var y = document.querySelector('#graphFunction').value;
                var graphColor = document.getElementById("graph-color").value
                var xVal = document.querySelector('.x-value').value;


                var fx = (math.simplify(y).evaluate({x:xVal})).toString()

                if(document.querySelector('.x-value').value === ''){
                    var p = document.createElement("p")
                    p.innerHTML = "f(x) = "+y
                    document.querySelector(".xVal-output").append(p)
                }


                else if(document.querySelector('.x-value').value != ''){
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
                            fn: y, color: graphColor
                        }]
                }
               


            }

            else if(mathOption == "integral"){

                console.log(mathOption)
        

                var y = document.querySelector('#graphFunction').value;
                var graphColor = document.getElementById("graph-color").value
                var x1t = document.querySelector('.x1t').value;
                var x2t = document.querySelector('.x2t').value;

                if(x1t == '' || x2t == '' || x1t>x2t || x1t==x2t){
                    alert("No input in integrals detected")
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
                                fn: y, color: graphColor
                            }]
                    }
                }
                    else if(x1t != '' || x2t != ''){
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
                                    fn: y, color: graphColor,
                                    range: [x1t, x2t],
                                    closed: true
                                }]
                            }
                        }
            }
      
    


        else if(mathOption == "tangent"){
            console.log(mathOption)
                var y = document.querySelector('#graphFunction').value;
                var graphColor = document.getElementById("graph-color").value
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
                                fn: deriv, color: graphColor,
                                updateOnMouseMove: true
                            }
                        }]
                    }
        }


        else if(mathOption == "secant"){
            console.log(mathOption)
            var y = document.querySelector('#graphFunction').value;
            var graphColor = document.getElementById("graph-color").value
            var x1s = document.querySelector('.x1s').value;
            var x2s = document.querySelector('.x2s').value;


            var x1sNum = parseInt(x1s)
            var x2sNum = parseInt(x2s)

            console.log(x1sNum)
            console.log(x2sNum)

            if(x1s == '' || x2s == '' || x1s>x2s){
                alert("No input detected in secants")
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
                            fn: y, color: graphColor
                        }]
                }
            }
            else if(x1sNum>x2sNum){
                alert("x1 can not be larger than x2")
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
                            fn: y, color: graphColor
                        }]
                }
            }
                else if(!x1s == '' || !x2s == ''){
                    options={
                        target: '#root',
                        title: 'Graf',
                        width: 700,
                        height: 500,
                        xAxis: { domain: [-5, 5] },
                        yAxis: { domain: [-5, 5] },
                        grid: true,
                        data: [{
                            fn: y, color: graphColor,
                            secants: [{
                                x0: x1sNum, color: graphColor,
                                updateOnMouseMove: true
                            }, {
                                x0: x2sNum, color: graphColor,
                                updateOnMouseMove: true
                            }]
                        }]
                    }
                }
            }

            else if(mathOption == "derivative"){
                console.log(mathOption)
                    var y = document.querySelector('#graphFunction').value;
                    var graphColor = document.getElementById("graph-color").value
                    var deriv = math.derivative(y, 'x').toString()
                    var xDerValue = document.querySelector(".x-deriv").value

                    var p1 = document.createElement("p")
                    p1.innerHTML = deriv
                    document.querySelector(".deriv-output").append(p1)

                    if(xDerValue != ""){
                        var p3 = document.createElement("p")
                        p3.innerHTML = "f '("+xDerValue+") = "+(math.derivative(y, 'x').evaluate({x:xDerValue})).toString()
                        document.querySelector(".derivX-output").append(p3)
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
                                fn: y, color: graphColor,
                                derivative:{
    
                                    fn: deriv, color: graphColor,
                                    updateOnMouseMove: true
                                }
                            }]
                        }
            }


            else if(mathOption == "vector"){
                console.log(mathOption)
                var y = document.querySelector('#graphFunction').value;
                var graphColor = document.getElementById("graph-color").value
                var x1v = document.querySelector('.x1v').value;
                var x2v = document.querySelector('.x2v').value;
                var y1v = document.querySelector('.y1v').value;
                var y2v = document.querySelector('.y2v').value;


                var x1vNum = parseInt(x1v)
                var y1vNum = parseInt(y1v)
                var x2vNum = parseInt(x2v)
                var y2vNum = parseInt(y2v)
    
                if(x1v == '' || x2v == '' || y1v == '' || y2v == ''){
                    alert("No input detected in vector from either x1, x2, x3 or x4")
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
                                fn: y, color: graphColor
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
                var graphColor = document.getElementById("graph-color").value
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
                            fn: y, color: graphColor
                          }],
                          annotations: [{
                            x: xa
                          }, {
                            y: ya
                          }]
            }
        }
        
        var p = document.createElement("p")
        p.innerHTML = "f(x) = " + y
        document.querySelector(".history").append(p)
        functionPlot(options);
    }

};

[document.querySelector("#tangent-deactivate")].forEach(element=>{
    element.addEventListener('click', cancelMath)
})

function cancelMath(){
    var y = document.querySelector('#graphFunction').value;
    var graphColor = document.getElementById("graph-color").value
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
                fn: y, color: graphColor
            }]
    }
    functionPlot(options)
}