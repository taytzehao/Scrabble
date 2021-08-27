//{} from "./Initialize.js"
function tile2alphabet(tile){
    return tile.querySelectorAll("p")[0].innerHTML
}

function tile2score(tile){
    return tile.querySelectorAll("p")[1].innerHTML
}

function setAttributes(el, attrs) {
    for(let key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

 function tile_coordinate (tile,colCount,block_array){
    
    
    let holder_div=tile.parentElement;
    
    let index = block_array.indexOf(holder_div);
    let row = Math.floor(index / colCount)
    
    let column = index % colCount
    
    return [row,column]
}
function tile_index(tile,block_array){
    
    let holder_div=tile.parentElement;
    let index = block_array.indexOf(holder_div);
    
    return index
}

function check_board(coordinate,attached_old,colCount,block_array){
    
    if (coordinate[0]<0 || coordinate[0]>=colCount || coordinate[1]<0 || coordinate[1]>=colCount){
        return false
    }

    let index=coordinate[0]*colCount+coordinate[1];
    let board=block_array;
    if (attached_old==true){
        if (board[index].querySelector("div")){
            if (board[index].querySelector("div").classList.contains("placed") && !board[index].querySelector("div").classList.contains("just_added")){
            return true
            }
        }
    } else if(board[index].querySelector("div")){
        if (board[index].querySelector("div").classList.contains("placed")){
        
        return true
    }
}
    return false
}

export {tile_coordinate,tile_index,check_board,setAttributes,tile2alphabet,tile2score}






