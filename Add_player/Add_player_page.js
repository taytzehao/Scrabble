import {Player,Player_list} from "../Player.js";

const add_player = (default_name)=>{
    let newinput = document.createElement("input");
    newinput.setAttribute("type","text");
    newinput.setAttribute("placeholder",default_name);
    newinput.setAttribute("class", "input_name");
    newinput.style.display="block";
    newinput.style.margin="2em 0";
    return newinput
}

let Player_num=localStorage.getItem("Number_of_players");
//localStorage.removeItem("Number_of_players");

const createNames = (player_num) => {
    let name_form=document.createElement("form");
    name_form.setAttribute("class", "name_form")
    for (let i = 1; i <= player_num; i++){
        let default_name = "Player " + i;
        name_form.append(add_player(default_name));
    }

    let submit_button = document.createElement("input");
    submit_button.setAttribute("type","submit");
    submit_button.setAttribute("class","submit_button");
    
    name_form.append(submit_button)

    return name_form;
}

document.querySelector("div").append(createNames(Player_num));

function player_constructor(forms){
    for (let i = 0; i < forms.length; ++i) {
        if(forms[i].value == ""){
            alert("Please input all names"); 
            return;
        };
      }
    for (let i = 0; i < forms.length; ++i) {
        Player_list.push( new Player(forms[i].value))
        console.log(Player_list[i].name)
        };
    
    location.replace("../Games_page/Games_page.html")
}

var Text_forms = document.querySelectorAll(".input_name");
var name_form = document.querySelector(".name_form");

name_form.addEventListener('submit', (e) => {
    e.preventDefault();
    player_constructor(Text_forms)
})

