import {tile_coordinate,tile_index,check_board} from "./Utilities_function.js"
import {Player_list} from "../Player.js";
import {global_vars} from "./Initialize.js";

function new_tile_score(new_tile){
    let new_tile_s=0
    let double_word=0;
    let triple_word=0;
    if (new_tile.previousSibling){
    console.log(new_tile.previousSibling)
    if (new_tile.parentElement.classList.contains("dw")){
        new_tile_s += parseInt(new_tile.querySelectorAll("p")[1].innerHTML);
        double_word += 1;
    } else if (new_tile.parentElement.classList.contains("tw")){
        new_tile_s += parseInt(new_tile.querySelectorAll("p")[1].innerHTML);
        triple_word += 1;
    } else if (new_tile.parentElement.classList.contains("dl")){
        new_tile_s += parseInt(new_tile.querySelectorAll("p")[1].innerHTML)*2
    } else if (new_tile.parentElement.classList.contains("tl")){
        new_tile_s += parseInt(new_tile.querySelectorAll("p")[1].innerHTML)*3
        } 
    }else {
        new_tile_s += parseInt(new_tile.querySelectorAll("p")[1].innerHTML)
    }
    return [new_tile_s,double_word,triple_word]
}
function old_tile_score(placed_tile){  
    let old_tile_s=0;
    old_tile_s += parseInt(placed_tile.querySelectorAll("p")[1].innerHTML)
    return old_tile_s

}

function word_score(word_tiles,turn_num){

    let individual_word_score=0;
    var double_word;
    if (turn_num==0){
        double_word=1;
    }else{
        double_word=0;
    }
    
    var triple_word=0;

    for (let z=0; z<word_tiles.length; z++){

        if (word_tiles[z].classList.contains("just_added")){
            let scores=new_tile_score(word_tiles[z])
            individual_word_score+=scores[0];
            double_word+=scores[1];
            triple_word+=scores[2]
        } else{
            individual_word_score+=old_tile_score(word_tiles[z]);
        }}
    
    if (double_word!=0){
        individual_word_score = individual_word_score * 2 * double_word;
    }

    if (triple_word!=0){
        individual_word_score = individual_word_score * 3 * triple_word;
    }

    
    return individual_word_score 
}
function vertical_words(new_tile,up,down){

    let vertical_word_tile=[];
    let prepend_up=false;

    if (check_board(up,false,global_vars.colCount,global_vars.block_array)){
        prepend_up=true
        vertical_word_tile.push([new_tile])
            while(check_board(up,false,global_vars.colCount,global_vars.block_array)){
                vertical_word_tile[vertical_word_tile.length-1].unshift(global_vars.block_array[up[0]*global_vars.colCount+up[1]].querySelector("div"))
                up[0]=up[0]-1;
        }
        
    } 
    if (check_board(down,false,global_vars.colCount,global_vars.block_array)){
        if (prepend_up==false){
            vertical_word_tile.push([new_tile])}

        while(check_board(down,false,global_vars.colCount,global_vars.block_array)){
            vertical_word_tile[vertical_word_tile.length-1].push(global_vars.block_array[down[0]*global_vars.colCount+down[1]].querySelector("div"))
            down[0]=down[0]+1;
        }
    }
    return vertical_word_tile
}
function horizontal_words(new_tile,left,right){

    let horizontal_word_tile=[];
    let prepend_left=false;
    
    if (check_board(left,false,global_vars.colCount,global_vars.block_array)) {
        prepend_left=true
        horizontal_word_tile.push([new_tile])
        while(check_board(left,false,global_vars.colCount,global_vars.block_array)){
            horizontal_word_tile[horizontal_word_tile.length-1].unshift(global_vars.block_array[left[0]*global_vars.colCount+left[1]].querySelector("div"))
            left[1]=left[1]-1;
            }
        }
        
    if (check_board(right,false,global_vars.colCount,global_vars.block_array)){

        if (prepend_left==false){
        horizontal_word_tile.push([new_tile])}

        while(check_board(right,false,global_vars.colCount,global_vars.block_array)){
            horizontal_word_tile[horizontal_word_tile.length-1].push(global_vars.block_array[right[0]*global_vars.colCount+right[1]].querySelector("div"))
            right[1]=right[1]+1;
            }
        }
    return horizontal_word_tile
        
    }

function words_tile(new_tiles){
    let words=[];

    let coor=tile_coordinate(new_tiles[0],global_vars.colCount,global_vars.block_array)
    let up,down,left,right
    up=coor.slice(0);
    down=coor.slice(0);
    left=coor.slice(0);
    right=coor.slice(0);

    up[0]=up[0]-1;
    down[0]=down[0]+1;
    left[1]=left[1]-1;
    right[1]=right[1]+1;
    
    if(new_tiles.length==1){      

        horizontal_words(new_tiles[0],left,right).forEach(horizontal_word=>words.push(horizontal_word));
        vertical_words(new_tiles[0],up,down).forEach(vertical_word=>words.push(vertical_word));
        
    }else{
     
        if (tile_coordinate(new_tiles[0],global_vars.colCount,global_vars.block_array)[0]==tile_coordinate(new_tiles[1],global_vars.colCount,global_vars.block_array)[0]){
            //horizontal
            horizontal_words(new_tiles[0],left,right).forEach(horizontal_word=>words.push(horizontal_word));
            for (let i =0 ; i<new_tiles.length;i++){
                
                vertical_words(new_tiles[i],up,down).forEach(vertical_word=>words.push(vertical_word));
        
            }
        }else{
            //vertical
            vertical_words(new_tiles[0],up,down).forEach(vertical_word=>words.push(vertical_word));
            for (let i =0 ; i<new_tiles.length;i++){
                horizontal_words(new_tiles[i],left,right).forEach(horizontal_word=>words.push(horizontal_word));       
            }
        } 
        }

    return words
}

function score(words,turn_num,new_tiles){
  
    let extra_score=0; 
    
    for (let y=0;y<words.length;y++){
        extra_score+=word_score(words[y],turn_num)
    }

    if (new_tiles.length==7){
        extra_score+=50;
    }  


    new_tiles.forEach((new_tile)=>{
        new_tile.setAttribute("draggable","false");
    })
    return extra_score
}

export {words_tile,score};
