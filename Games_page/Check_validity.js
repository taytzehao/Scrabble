import {tile_coordinate,tile_index,check_board} from "./Utilities_function.js"
import {Player_list} from "../Player.js";
import {global_vars} from "./Initialize.js";

function fail_return(tiles,turn_num){

    let tile_holder=document.querySelector(".tile_holder."+Player_list[turn_num%Player_list.length].name)

    for (let i = 0; i< tiles.length;i++){
        
        tiles[i].classList.remove("just_added");
        tiles[i].classList.remove("placed"); 

        tiles[i].remove();
        tile_holder.append(tiles[i])
        
    }  
}

function check_validity(turn_num){

    let new_tiles=document.querySelectorAll(".just_added");
    if (turn_num ==0){
        //check 0 turn
        let start_block=document.querySelector(".st");

        if (!start_block.querySelector(".just_added")){
            alert("Please place the tile on the start block.")
            fail_return(new_tiles,turn_num)
            return false;
        }
        
    } else{

        let attached = false;
        for (let i =0 ; i<new_tiles.length;i++){
            let coor=tile_coordinate(new_tiles[i],global_vars.colCount,global_vars.block_array)
            let up,down,left,right;
            up=down=left=right=coor;

            up[0]=up[0]-1;
            down[0]=down[0]+1;
            left[1]=left[1]-1;
            right[1]=right[1]+1;

            if (check_board(up,false,global_vars.colCount,global_vars.block_array)||check_board(down,false,global_vars.colCount,global_vars.block_array)||check_board(left,false,global_vars.colCount,global_vars.block_array)||check_board(right,false,global_vars.colCount,global_vars.block_array)){
                attached=true;
                break;
            }                                
            
        }
        if (attached==false){
            alert ("Please place your tiles adjacent to an existing tile.")
            fail_return(new_tiles,turn_num%Player_list.length)
            return false;
        }
    }

    if (new_tiles.length>1){

        let first_coordinate=tile_coordinate(new_tiles[0],global_vars.colCount,global_vars.block_array);
        let second_coordinate=tile_coordinate(new_tiles[1],global_vars.colCount,global_vars.block_array);

        if (first_coordinate[0]==second_coordinate[0] ){
            var direction ="horizontal";
        } else if (first_coordinate[1]==second_coordinate[1]){
            var direction ="vertical";
        } else {
            alert ("Your sequence of tiles must either be in horizontal or vertical form, adjacent to each other.")
            fail_return(new_tiles,turn_num)
            return false;
        }
        
        for (let i =1 ; i<new_tiles.length;i++){
            if (direction=="horizontal"){
                 if ((first_coordinate[1]+1)!=second_coordinate[1] && first_coordinate[0]==second_coordinate[0]){
                    
                    let temp_second_coord=first_coordinate;
                    temp_second_coord[1]=temp_second_coord[1]+1;
                    while(temp_second_coord[1]<=second_coordinate[1]){
                        if (!check_board(temp_second_coord,false,global_vars.colCount,global_vars.block_array)){
                            alert("Please do not skip");
                            fail_return(new_tiles,turn_num)
                            return false;
                            }
                        temp_second_coord[1]=temp_second_coord[1]+1;
                        }
                        
                    }

                 else if(first_coordinate[0]!=second_coordinate[0]){
                    alert("Please place all in horizontal")
                    fail_return(new_tiles,turn_num);
                    return false;
                } 
            } else if (direction=="vertical"){
                if((first_coordinate[0]+1)!=second_coordinate[0] && first_coordinate[1]==second_coordinate[1]){
                    
                    let temp_second_coord=first_coordinate;
                    temp_second_coord[0]=temp_second_coord[0]+1;
                    while(temp_second_coord[0]<=second_coordinate[0]){
                        if (!check_board(temp_second_coord,false,global_vars.colCount,global_vars.block_array)){
                            alert("Please do not skip");
                            fail_return(new_tiles,turn_num)
                            return false;
                            }
                        temp_second_coord[0]=temp_second_coord[0]+1;
                        }
                        
                    }
                } else if ((first_coordinate[1])!=second_coordinate[1]){
                    alert("Please place all in vertical")
                    fail_return(new_tiles,turn_num)
                    return false;
                }
            
            
            first_coordinate=second_coordinate;
            if ((i+1)!=new_tiles.length){
                second_coordinate=tile_coordinate(new_tiles[i+1],global_vars.colCount,global_vars.block_array)
                }
            }
        }
        
    
    return true;

}

export {check_validity}