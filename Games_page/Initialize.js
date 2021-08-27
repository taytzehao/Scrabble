import {Player_list} from "../Player.js";
import {tile_container,container_content} from "./Tile_container.js"
import {drag_start,drag_end,drag_over,drag_drop} from "./Tiles.js"

var colCount=document.querySelector(".board").style.gridTemplateColumns;
colCount=colCount.replace('repeat(','');
colCount =parseInt(colCount.split(",")[0]);


var global_vars={
    turn_num:0,
    block_array:Array.from(document.querySelectorAll(".bl")),
    colCount:colCount,
    delete_list:[]
}


for (let i = 0 ; i < Player_list.length; i++){

    document.querySelector(".main_game").append(tile_container(i));
    container_content(document.querySelector(".tile_container."+Player_list[i].name),i)

}

function turn(){

    let player_num=global_vars.turn_num%Player_list.length
    if (Player_list[player_num].allow_turn){
        document.querySelector(".tile_container."+Player_list[player_num].name).
        querySelectorAll(".tile p,.delete_img,.challenge_button").forEach(element=>{element.style.visibility="visible"});
        
        let play_tiles=document.querySelectorAll(".tile_holder." + Player_list[player_num].name+" .tile");
        play_tiles.forEach(function drag_feature(play_tile){
            play_tile.setAttribute("draggable","true"); 

            play_tile.addEventListener('dragstart', drag_start)
    
            play_tile.addEventListener('dragend', drag_end)
    
            play_tile.addEventListener('dragover', drag_drop)       
        })

        global_vars.delete_list=[]   
        
    }else{

        Player_list[player_num].allow_turn=true;
        global_vars.turn_num+=1
        return turn(turn_num)
    }
}

function start_game(){
    
    document.querySelectorAll(".delete_img,.challenge_button,.tile p").forEach((elements)=>(elements.style.visibility="hidden"))   
    turn(global_vars.turn_num)   
        
}

export {global_vars,turn}

start_game();

