import {Alphabet_scores,tiles,sachet} from "/Games_page/Tiles.js"


export class Player {
    constructor(name){
        this.name=name;
        this.score=0;
        this.tiles=[]
        this.allow_turn=true
        this.draw();
    }

    draw(){
        while(this.tiles.length<7 && !sachet.length==0){

            let index=sachet.length*Math.random()<<0
            let chosen_tile=sachet[index]
            sachet.splice(index,1)
            this.tiles.push(new tiles(chosen_tile,Alphabet_scores.get(chosen_tile)).display());
            
            
        }
    }
    remove(tile){
        if (Array.isArray(tile)){

            for (let i = 0; i< tile.length; i++){
                let index = this.tiles.indexOf(tile[i]);
                this.tiles.splice(index, 1)
            }

        }else{

        for (let i = 0; i< this.tiles.length; i++){
            if (tile.querySelectorAll("p")[0].innerHTML==this.tiles[i].querySelectorAll("p")[0].innerHTML){
                this.tiles.splice(i, 1)
                return
                }
            }
            throw "this tile is not in this list"
        }
        
        
    }
    display(){
        let holder=document.createElement("div");
        holder.setAttribute("class","tile_holder "+this.name);
        for (let i =0 ; i<this.tiles.length; i++){
            let player_tile=this.tiles[i];
            player_tile.classList.add(this.name)
            holder.append(player_tile)
        }
          
        return holder
    }

};

export const Player_list=[new Player("koko"),new Player("lolo")];
