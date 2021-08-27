import {Alphabet_scores,tiles,sachet} from "./Tiles.js"

class Alphabet_remainder{
    constructor(letter,score){
        
        this.remainder = sachet.reduce((acc, curr) => (acc[curr] = (acc[curr] || 0) + 1, acc), {});
        
      
        }
    
    display(){
        let analytics_div=document.createElement("div");
        analytics_div.setAttribute("class", "remainder_container")
        analytics_div.style.display="grid";
        analytics_div.style.gridTemplateColumns="repeat(2,1fr)";
        analytics_div.style.gridTemplateRows="repeat("+Object.keys(this.remainder).length/2+",1fr)";
        analytics_div.style.gridColumn="1"
        analytics_div.style.gridRow="1"

        for(const key of Object.keys(this.remainder)){
            let analytics_holder=document.createElement("div");
            analytics_holder.setAttribute("class", "remainder_holder")
            
            analytics_holder.innerHTML=key +" - "+ this.remainder[key]

            analytics_div.append(analytics_holder)

        }
        document.querySelector(".main_divider").append(analytics_div)

    }
    update(){
        let added_tiles=document.querySelectorAll(".just_added")
        let remainder_holders=document.querySelectorAll(".remainder_holder")
        for (const add_tile of added_tiles){
                let alphabet;
            if (add_tile.querySelectorAll("p")[1].innerHTML==0){
                alphabet=" "
            }else{
                alphabet=add_tile.querySelectorAll("p")[0].innerHTML;
            }
            
            for (let i = 0 ; i <remainder_holders.length;i++){
                if(remainder_holders[i].innerHTML[0]==alphabet){
                    if (this.remainder[alphabet]==1){
                        delete this.remainder[alphabet]
                        remainder_holders[i].remove()
                    }else{
                        
                        this.remainder[alphabet]-=1;
                        remainder_holders[i].innerHTML=alphabet +" - "+ this.remainder[alphabet]
                    }
                   
                    break
                }
            }

        }
    }
}
const remainder_div=new Alphabet_remainder();
remainder_div.display()
export {remainder_div}