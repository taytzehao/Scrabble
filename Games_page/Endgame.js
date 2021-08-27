import {Player_list} from "../Player.js";

function endgame(){
    let score_list = []
    Player_list.forEach(player=>score_list.push(player.score))

    let max_score = Math.max(...score_list);
    maxes = score_list.reduce((p,c,i,a) => c ==  max_score ? p.concat(i) : p,[])

    if (maxes.length>1){
        Player_list.forEach((player)=>{
            for (let i=0 ; i<player.tiles.length;i++){
                player.score += player.tiles[i].querySelectorAll("p")[1].innerHTML
            }
        })
        let score_list = []
        Player_list.forEach(player=>score_list.push(player.score))

        let max_score = Math.max(...score_list);
        maxes = score_list.reduce((p,c,i,a) => c ==  max_score ? p.concat(i) : p,[])

        let names="";
        for (let player of maxes){
            names += Player_list[player].names + " "
        }
        alert(names + " has won.")
        location.href="../Startpage.html"
    }else{
        alert(Player_list[maxes[0]].name + " has won.")
        location.href="../Startpage.html"
    }
}

export {endgame}