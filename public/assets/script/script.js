
var y = 'x^2'


test("test");


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


var counter = 0;
function settings(){
    counter++;
    if(counter%2 == 0 )
    {
        document.querySelector(".settings-block").style="visibility:hidden;transition-duration: 0.4s;width:0%;"
        document.querySelector(".settings-container").style="border-left: solild 2px white;transition-delay: 0.4s;";
        let elements = document.querySelectorAll('.selection-container');
        for (const element of elements) {
            element.style="margin: 0;";
        }
        iconRemover()
        document.querySelector(".horizontal").style="display: none;"  
    }
    else if(counter%2 == 1)
    {
        document.querySelector(".settings-block").style="visibility:visible;transition-duration: 0.4s;width:60%;"
        document.querySelector(".settings-container").style="border:none;"
        iconShower()
    }
}


counter = 0;
function searchUsers(){
    document.querySelector(".settings-container").style="width:30%;transition-duration:0.6s"
    document.querySelector(".settings-block").style="visibility:visible;transition-duration: 0.4s;width:60%;align-items:normal;"
    let elements = document.querySelectorAll('.selection-container');
    for (const element of elements) {
        element.style="margin-left: 2rem";
    }
    
    if(counter < 2){
        
        
        var input = document.createElement("input")
        document.querySelector(".horizontal").append(input);
        document.querySelector(".remove").style="visibility:hidden;";
        input.style="transition-duration:0.6s;display:block;border:none;outline:none;height:2.5rem;border-radius:0.25rem;box-shadow: 0 0 3px 2px #2BB2F5;text-indent:10px;background-color:black;color:white;"
        
        var button = document.createElement("button")
        button.innerText = "Search"
        document.querySelector(".horizontal").append(button)
        input.addEventListener("focus", function(){
            input.style="border:none;outline:none;height:2.5rem;border-radius:0.25rem;text-indent:10px;background-color:black;color:white;box-shadow: 0 0 6px 4px #2BB2F5"
        });
        
        
        
    }
    counter++;
    console.log(counter)


    
}



function settingsReveal(){}
function functionsReveal(){}
function calculateReveal(){}
function historyReveal(){
    document.querySelector(".history").style="visibility: visible;"
    iconRemover()
    settings()
}


function iconRemover(){
    let elements = document.querySelectorAll('.selection-container');
    for (const element of elements) {
        element.style.opacity="0"
    }
}

function iconShower(){
    let elements = document.querySelectorAll('.selection-container');
    for (const element of elements) {
        element.style.opacity="1"
    }
}





        