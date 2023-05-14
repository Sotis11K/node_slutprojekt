


var counter = 0;

function settings(){

    counter++;
    

    if(counter%2 == 0 )
    {
        document.querySelector(".settings-container").style="width:0%;border-left: solild 2px white;transition-delay: 0.4s;";
        document.querySelector(".settings-block").style="visibility:hidden;transition-duration: 0.4s;width:0%;"
        let elements = document.querySelectorAll('.selection-container');
        for (const element of elements) {
            element.style="margin: 0;";
        }
        iconRemover()

        document.querySelector("#root").style="filter: none"
        document.querySelector(".graph-input").style="filter: none"
        document.querySelector(".category-container").style="filter: none;"
        document.querySelector(".user-coloumn h1").style="filter: none"
        
    }
    else if(counter%2 == 1)
    {
        
        document.querySelector("#root").style="filter: blur(2px)"
        document.querySelector(".graph-input").style="filter: blur(2px)"
        document.querySelector(".category-container").style="filter: blur(2px);"
        document.querySelector(".user-coloumn h1").style="filter: blur(2px)"
        
        document.querySelector(".settings-block").style="visibility:visible;transition-duration: 0.4s;width:100%;"
        document.querySelector(".settings-container").style="width:12%;border:none;"





        iconShower()
    }
    
    
    
}





function calcOption(option){
    var elements = document.querySelectorAll(".math-calc")
    for (const element of elements){
        element.style.display="none"
    }
    document.getElementsByClassName('calculate-selection')[0].dataset.calc = option;
    
    const chosenCalc = document.querySelector("." + option + "-container").style.display="block"
    document.querySelector("calculate-selection").style="display:grid;place-items:center;"
}


function profileUnreveal(){
    document.querySelector(".profile-card").style="display:none;"
    document.querySelector(".container").style="filter:blur(0px);"
    settings()
}

function settingsUnreveal(){
    document.querySelector(".settings-card").style="display:none;"
    document.querySelector(".container").style="filter:blur(0px);"
    settings()
}

function settingsReveal(){
    document.querySelector(".settings-card").style="display:block;"
    document.querySelector(".container").style="filter:blur(2px);"
}

function pageTheme(){
    var colorTheme = document.getElementById("page-color").value
    document.querySelector("body").style.backgroundColor = colorTheme
}

function calculateReveal(){
    document.querySelector(".history-container").style="display: none;"
    document.querySelector(".calculate-container").style="display: flex;"
}


function historyReveal(){
    document.querySelector(".history-container").style="display: flex;"
    document.querySelector(".calculate-container").style="display: none;"
}




function logoutReveal(){
    fetch('/logout')
    .then(() => {
        window.location.replace("/login")
    })
    .catch(error => {
      console.error(error);
    });
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

function logout(req, res) {
    req.session.destroy(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  }
  



        











function load_data(query = '')
{
    fetch('/get_data?search_query='+query+'').then(function(response){

        return response.json();

    }).then(function(responseData){

        var html = '<ul class="list-group">';

        if(responseData.length > 0)
        {
            for(var count = 0; count < responseData.length; count++)
            {
                var regular_expression = new RegExp('('+query+')', 'gi');

                html += '<a href="#'+responseData[count].username+'" class="list-group-item" onclick="get_text(this)">'+responseData[count].username.replace(regular_expression, '<span style="700;color:#2BB2F5;">$1</span>')+'</a>';
            }
        }
        else
        {
            html += '<a href="#" class="list-group-item list-group-item-action disabled">No Data Found</a>';
        }

        html += '</ul>';

        document.getElementById('search_result').innerHTML = html;

    });
}

var search_element = document.getElementById("autocomplete_search");

search_element.onkeyup = function(){

    var query = search_element.value;

    load_data(query);

};

search_element.onfocus = function(){

    var query = search_element.value;

    load_data(query);

};



function get_text(event)
{
    var username = event.textContent;
    document.getElementById('autocomplete_search').value = username;
    document.getElementById('search_result').innerHTML = '';
    document.querySelector('.profile-card').style="display:block"
    document.querySelector('.container').style="filter: blur(2px);"

    fetch('/data')
    .then(response => response.json())
    .then(data => {


        var searchField = "username";
        var searchVal = username;
        
        console.log(username)
        var x = false
        var i = 0;

        while(!x){
            console.log((data[i]));
            if (data[i][searchField] == searchVal) {
                console.log((data[i]));
                var x = true
            }
            i++;
        }
        i--;



        if(data[i].username != ""){
            document.getElementById("usernameDisplay").innerHTML = "Username: " + data[i].username
        }

        if(data[i].country != ""){
            document.getElementById("countryDisplay").innerHTML = "Country: " + data[i].country
        }

        if(data[i].img != ""){
            console.log(data[i].img)
            document.getElementById("profile-card-img").src = data[i].img
        }

        if(data[i].date_added != ""){
            const isoDateString = data[i].date_added;
            const date = new Date(isoDateString);
            const formattedDate = date.toLocaleString(); 
            document.getElementById("membersinceDisplay").innerHTML = "Member since: " + formattedDate
        }





    })
    .catch(error => {
        console.error(error);
    });

    
    
        
}































