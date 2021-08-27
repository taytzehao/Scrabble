import {Player_list} from "../Player.js";
import {words_tile} from "./Score.js"
import { tiles2word,challenge } from "./Challenge.js";
import {setAttributes} from "./Utilities_function.js";
import {global_vars} from "./Initialize.js"


function tile_container(i){
    let two_player_pos = [[2,1], [2,3]]
    let other_pos=[[2,1,"horizontal"],[1,2,"vertical"],[2,3,"horizontal"],[3,2,"vertical"]];

    let flex_element=document.createElement("div");
    flex_element.setAttribute("class","tile_container"+" "+Player_list[i].name);

    if (Player_list.length==2){

        flex_element.style.gridRow = two_player_pos[i][1];
        flex_element.style.gridColumn = two_player_pos[i][0];
        flex_element.classList.add("horizontal");

    } else{
        flex_element.style.gridRow = other_pos[i][1]
        flex_element.style.gridColumn = other_pos[i][0];
        flex_element.classList.add(other_pos[i][2])
    }

    return flex_element

}
function container_content(container,i){      
    
    let Player_display=Player_list[i].display();

    let challenge_button=document.createElement("input")
    setAttributes(challenge_button,{"type":"button","class":"challenge_button "+Player_list[i].name,"value":"challenge"})
    
    let name_paragraph=document.createElement("div");
    name_paragraph.setAttribute("class","name_display")
    name_paragraph.innerHTML=Player_list[i].name

    let score_paragraph=document.createElement("div");
    score_paragraph.setAttribute("class","score_display "+Player_list[i].name)
    score_paragraph.innerHTML="Score: "+Player_list[i].score


    
    if (container.clientHeight>container.clientWidth){
        Player_display.style.flexDirection="column";
    }else{
        Player_display.style.flexDirection="row";
    }

    container.append(name_paragraph);
    container.append(score_paragraph);
    container.append(Player_display);  

    let delete_tile=document.createElement("img");
    setAttributes(delete_tile,{"src":"../delete_logo.png","alt":"delete_logo"})

    if (document.querySelector(".tile_holder." + Player_list[i].name).style.flexDirection=="row"){
        
        delete_tile.setAttribute("class", "delete_img horizontal "+Player_list[i].name)
        delete_tile.style.gridColumn=4
        delete_tile.style.gridRow="1/2"
        

    } else{
        delete_tile.setAttribute("class", "delete_img vertical"+Player_list[i].name)
        delete_tile.style.gridRow=5

    }
    
     

    
    container.append(challenge_button); 
    
    document.querySelector(".challenge_button."+Player_list[i].name).addEventListener("click", function lo (){
        challenge(turn_num,this.classList[1],tiles2word(words_tile(document.querySelectorAll(".challenge"))))

    })

    container.append(delete_tile)

    document.querySelector(".delete_img."+Player_list[i].name).addEventListener('dragover', e =>{
        e.preventDefault()
        
        delete_tile.addEventListener('drop',e=>{
                    //e.preventDefault()
                    const draggable = document.querySelector(".draggable");
                    e.stopImmediatePropagation()
                    global_vars.delete_list.push(draggable)
                    draggable.remove()
                    document.querySelector(".score_button").disabled = true;
                    
                }
            )
    
        }
    )
    

}


export {tile_container,container_content}