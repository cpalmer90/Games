
function confirm(){
    prompt ("Are you ready for some fun!");
    if("yes"){
alert("Great lets go!!!")
}
    
 }
    confirm();




    let currentPlayer= "O";
    let won = false;
    function place(box){
        if(box.innerText !="" || won) return;
        box.innerText = currentPlayer;
        currentPlayer == "O" ? currentPlayer = "X" : currentPlayer = "O";
        checkGameBoard();
        }


    function checkGameBoard() {
    for(let i = 0; i <= 2; i++){
            let first = document.getElementById("0_"+ i).innerText;
            let second = document.getElementById("1_"+ i).innerText;
            let third = document.getElementById("2_"+ i).innerText;
            if(first == "") continue;
                if(first == second && first == third){
                    alert ("Winner!!!!");
                    won = true
            }
        }
    
            for(let i = 0; i <= 2; i++) {
                let first = document.getElementById(i + "_0").innerText;
            let second = document.getElementById(i + "_1").innerText;
            let third = document.getElementById(i + "_2").innerText;
            if(first =="") continue;
                if(first == second && first == third) {
                alert ("Winner!!!!");
                won = true
            }
        }

            let firstD1 = document.getElementById("0_0").innerText;
            let secondD1 = document.getElementById("1_1").innerText;
            let thirdD1 = document.getElementById("2_2").innerText;
            if(firstD1 != "" && firstD1 == secondD1 && firstD1 == thirdD1) {
                alert ("WINNER!!!!");
                won = true
            }

            let firstD2 = document.getElementById("0_2").innerText;
            let secondD2 = document.getElementById("1_1").innerText;
            let thirdD2 = document.getElementById("2_0").innerText;
            if(firstD2 != "" && firstD2 == secondD2 && firstD2 == thirdD2){
                alert ("WINNER!!!!");
                won = true
            }


}

        