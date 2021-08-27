import {tile2alphabet} from "./Utilities_function.js"

const Board=document.createElement("div");
Board.setAttribute("class", "board");

Board.style.display="grid";
Board.style.gridTemplateColumns= "repeat(15,1fr)";
Board.style.gridTemplateRows="repeat(15,1fr)";
Board.style.border="1px solid black"

const dw_block=document.createElement("div");
dw_block.innerHTML="Double word Score";
dw_block.setAttribute("class", "bl dw");

const tw_block=document.createElement("div");
tw_block.innerHTML="Triple word Score";
tw_block.setAttribute("class", "bl tw");

const dl_block=document.createElement("div");
dl_block.innerHTML="Double letter Score";
dl_block.setAttribute("class", "bl dl");

const tl_block=document.createElement("div");
tl_block.innerHTML="Triple letter Score";
tl_block.setAttribute("class", "bl tl");

const st_block=document.createElement("div");
st_block.setAttribute("class", "bl dw st");

const default_block=document.createElement("div");
default_block.setAttribute("class", "bl default");


const tw_coordinate=['14,14','7,14','0,14','14,7','0,7','14,0','7,0','0,0']
const dw_coordinate=[,'13,13','1,13','12,12','2,12','11,11','3,11','10,10',
                    '4,10','10,4','4,4','11,3','3,3','12,2','2,2','13,1','1,1']

const dl_coordinate=['11,14', '3,14', '8,12', '6,12', '14,11', '7,11', '0,11', 
                    '12,8', '8,8', '6,8', '2,8', '11,7', '3,7', '12,6', '8,6', '6,6', 
                    '2,6', '14,3', '7,3', '0,3', '8,2', '6,2', '11,0', '3,0']


const tl_coordinate=['9,13', '5,13', '13,9', '9,9', '5,9', '1,9', '13,5', '9,5',
                     '5,5', '1,5', '9,1', '5,1']

const st_coordinate=['7,7']

let row_length = 15;
let column_length = 15;


for (let y=0 ; y<column_length ; ++y){  

    for (let x=0 ; x<column_length ; ++x){
        
        let temp_coord=x.toString() + "," + y.toString();
      

       
        switch(temp_coord){
            case tw_coordinate[tw_coordinate.length-1]:
                Board.append(tw_block.cloneNode(true));
                tw_coordinate.pop();
                break;
            case dw_coordinate[dw_coordinate.length-1]:
                Board.append(dw_block.cloneNode(true));
                dw_coordinate.pop();
                break;
            case dl_coordinate[dl_coordinate.length-1]:
                Board.append(dl_block.cloneNode(true));
                dl_coordinate.pop();
                break;
            case tl_coordinate[tl_coordinate.length-1]:
                Board.append(tl_block.cloneNode(true));
                tl_coordinate.pop();
                break;
            case st_coordinate[st_coordinate.length-1]:
                Board.append(st_block.cloneNode(true));
                st_coordinate.pop();
                break;
            default:
                Board.append(default_block.cloneNode(true));
                break;
        }  
    }
}

const Board_holder=document.createElement("div");
Board_holder.setAttribute("class", "board_holder");

Board_holder.append(Board.cloneNode(true))


document.querySelector(".main_game").append(Board_holder);

let blocks=document.querySelectorAll(".bl");
        blocks.forEach(block=>{
           
            block.addEventListener('dragover', function bl_drag_over(e){
                e.preventDefault();
                e.stopImmediatePropagation();         
                this.addEventListener('drop',function bl_drag_drop(){
                if (!this.querySelector(".tile")){ 
                    
                    const draggable = document.querySelector(".draggable");
                    if (tile2alphabet(draggable)==" "){

                        let wrong_input=true;
                        while(wrong_input){
                        let alphabet=window.prompt("Please enter your desired alphabet");
                        if (alphabet.length == 1 && alphabet.toLowerCase() != alphabet.toUpperCase()){
                            alphabet = alphabet.toUpperCase();
                            draggable.querySelectorAll("p")[0].innerHTML=alphabet
                            wrong_input = false;
                        }
                        }
                    }
                    this.append(draggable);
                    this.querySelector("div").classList.add("placed");
                    this.querySelector("div").classList.add("just_added")
                    document.querySelector(".draw_button").disabled = true;

            }})
                
            })
        }
        );

