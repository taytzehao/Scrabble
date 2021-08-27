import {Player_list } from '../Player.js';

function tiles2word(words){
    const word_list=[];
    for (let i=0; i<words.length;i++){
        word_list.push("")
        for (let j=0 ; j<words[i].length; j++){
            word_list[i]+=words[i][j].querySelectorAll("p")[0].innerHTML
        }
    }
    return word_list
}
function get_valid(word){
    const xmr = new XMLHttpRequest();
    xmr.open("GET",'http://localhost:3000/check_word');
    return xmr.send(word);  
}


function challenge(turn_num,player_num,words){
    
    

    for(let i =0; i<words.length;i++){
        if (!get_valid(words[i])){
            Player_list[(turn_num-1)%Player_list.length].allow_turn=false
            alert(Player_list[(turn_num-1)%Player_list.length].name + " has placed the word " + words[i] + " which is invalid.")
            return
        }
    }
    alert ("The challenger, " + Player_list[parseInt(current_name)].name + " has challenged wrongly.")
    if (turn_num%Player_list.length==player_num){

        document.querySelectorAll(".challenge").forEach(challenged_tile=>{challenged_tile.classList.remove("challenge")})
        document.querySelectorAll(".challenge_button").forEach(ch_button=>ch_button.style.visibility="hidden")
        
        return turn(turn_num+1)
    }
    Player_list[players_num].allow_turn=false
    
}

export {tiles2word,challenge}