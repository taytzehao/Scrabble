class tiles{
    constructor(letter,score){
        this.letter=letter;
        this.score=score;
    }

    display(){
        let tile=document.createElement("div");
        tile.setAttribute("class","tile");

        let alphabet=document.createElement("p");
        alphabet.innerHTML=this.letter;

        let scor=document.createElement("p");
        scor.innerHTML=this.score;

        tile.append(alphabet);
        tile.append(scor);


        return tile
    }
}





const alphabets=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," "]
const score=[1,3,3,2,1,4,2,4,1,8,5,1,3,1,1,3,10,1,1,1,1,4,4,8,4,10,0]
const tile_num=[9,2,2,4,12,2,3,2,9,1,1,4,2,6,8,2,1,6,4,6,4,2,2,1,2,1,2]
const Alphabet_scores=new Hashtable();
var sachet= [];

for (let i = 0; i < alphabets.length; i++){
    Alphabet_scores.put(alphabets[i],score[i]);
    
    sachet=sachet.concat(Array(tile_num[i]).fill(alphabets[i]))
}

function drag_start(e){
    this.classList.add("draggable")
}
function drag_end(e){
    this.classList.remove("draggable")
    if (!document.querySelector(".just_added")){
        document.querySelector(".draw_button").disabled = false 
    }
}
function drag_drop(e){
    if (!this.classList.contains("placed") && this.getAttribute("draggable")=="true"){
        const bounds=this.getBoundingClientRect();
        const dragging_tile= document.querySelector(".draggable")
        
        let live_coordinate;
        let ref_coordinate;

        e.stopImmediatePropagation();

        if (this.parentElement.style.flexDirection=="row"){
            live_coordinate=e.clientX;
            ref_coordinate=bounds.left+bounds.width/2;
        } else{
            live_coordinate=e.clientY;
            ref_coordinate=bounds.top-bounds.height/2;
        }
        if (dragging_tile.classList.contains("just_added")){
            dragging_tile.classList.remove("just_added")
        }
        if (dragging_tile.classList.contains("placed")){
            dragging_tile.classList.remove("placed")
        }
        if (dragging_tile.querySelectorAll("p")[1].innerHTML=="0"){
        
            dragging_tile.querySelectorAll("p")[0].innerHTML=" ";
        }
        if (live_coordinate<ref_coordinate){
            this.parentNode.insertBefore(dragging_tile,this)
            return
        }

        this.parentNode.insertBefore(dragging_tile,this.nextSibling)              

}}

function drag_over(e){
    e.preventDefault();                            
    this.addEventListener('drop',drag_drop)
}


export {Alphabet_scores,tiles,sachet,drag_start,drag_end,drag_over,drag_drop}

