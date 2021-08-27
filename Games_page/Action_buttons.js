import {global_vars,turn} from "./Initialize.js"
import {check_validity} from "./Check_validity.js"
import {words_tile,score} from "./Score.js"
import {Player_list} from "../Player.js";
import {sachet} from '/Games_page/Tiles.js';
import {endgame} from "./Endgame.js";
import {remainder_div} from "./Word_analytics.js"
import {tile2alphabet,tile2score} from "./Utilities_function.js"
import {drag_start,drag_end,drag_over,drag_drop} from "./Tiles.js"


function draw(discarded_tiles){

    let player_num=global_vars.turn_num%Player_list.length
    let discarded_num=discarded_tiles.length

    Player_list[player_num].remove(discarded_tiles);
    Player_list[player_num].draw();

    (Player_list[player_num].tiles.length==0)? endgame() : 0
    
    for (let i=0;i<discarded_num;i++){

        let temp_tile=Player_list[player_num].tiles[Player_list[player_num].tiles.length-discarded_num+i]
        temp_tile.classList.add(Player_list[player_num].name)
        document.querySelector(".tile_holder." + Player_list[player_num].name).append(temp_tile)
    }
}


function next_turn(){

    let player_num=global_vars.turn_num%Player_list.length
    
    document.querySelectorAll(".tile."+Player_list[player_num].name).forEach(play_tile=>{
        play_tile.setAttribute("draggable",false)
        play_tile.removeEventListener('dragstart', drag_start)
        play_tile.removeEventListener('dragend', drag_end)        
        play_tile.removeEventListener('dragover', drag_over)
        play_tile.removeEventListener('drop',drag_drop)
    });
    (document.querySelector(".challenge")) ? document.querySelectorAll(".challenge").forEach(challenged_tile=>{challenged_tile.classList.remove("challenge")}) : 0
    document.querySelector(".draw_button,.score_button").disabled = false;
    document.querySelector(".tile_container."+Player_list[player_num].name).querySelectorAll(".delete_img,.challenge_button,.tile_holder "+"p").forEach(element=>{element.style.visibility="hidden"})
    
    if (document.querySelector(".just_added")){
        remainder_div.update()
        document.querySelectorAll(".just_added").forEach(added_tile=>{
            added_tile.classList.add("challenge")
            added_tile.classList.remove("just_added")
    });}
    
    global_vars.turn_num+=1
    return turn(global_vars.turn_num) 

}

let score_button=document.querySelector(".score_button")
score_button.addEventListener("click",function player_score(){

    let player_num=global_vars.turn_num%Player_list.length

    if(check_validity(global_vars.turn_num)){
        let words=words_tile(document.querySelectorAll(".just_added"))
        Player_list[player_num].score+=score(words,global_vars.turn_num,document.querySelectorAll(".just_added"));
        document.querySelector(".score_display."+Player_list[player_num].name).innerHTML="Score: "+Player_list[player_num].score
        let new_tiles=Array.from(document.querySelectorAll(".just_added"));
        
        draw(new_tiles)
        next_turn();
          
};

});

let draw_button=document.querySelector(".draw_button");
        draw_button.addEventListener("click",function draw_tiles(){
            let player_num=global_vars.turn_num%Player_list.length

            if(global_vars.delete_list.length==0){
                alert("Please discard your unwanted tiles first")
                return;
            }; 
           
            global_vars.delete_list.forEach(delete_tile=>{
                (tile2score(delete_tile)==0)?sachet.push(" "):sachet.push(tile2alphabet(delete_tile))
            })           
            
        draw(global_vars.delete_list)
        next_turn();
            
        });