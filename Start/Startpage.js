const Selection_button = document.querySelectorAll(".player");
Selection_button.forEach((button)=>

    button.addEventListener("click",
        function player_num() {

            let player_number = this.innerHTML;
            player_number = parseInt(player_number.replace("players",""));
            localStorage.setItem("Number_of_players",player_number);
                                }
                            )
                        )