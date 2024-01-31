//Step 1    
/* 
    Key-press  ------>Game start   
*/

// Step 2
/*
    Btnflash and show level 
*/

//Step 3
/* 
    Btn press sequence is similar to game sequence
*/

let gameSeq=[];
let userSeq=[];
let highestScore=0;
let btns=["red","light-blue","orange","blue"];
let started=false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
    console.log("Game is started!");
    started=true;

    levelUp();
    }
})
function gameFlash(btn){
    btn.classList.add("gameFlash");
    setTimeout(function (){
        btn.classList.remove("gameFlash");
    },150);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function (){
        btn.classList.remove("userFlash");
    },150);
}


function levelUp(){
    level++;
    h2.innerText=`Level ${level}`;
    userSeq=[];

    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randbtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
}

function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }

    } else{
        if(level>=highestScore){
            highestScore=level;
        }
        h2.innerHTML=`Game Over!  Your score was <b>${level}</b> Highest score = ${highestScore} <br>Press any key to start again`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="transparent";
        },100)
        setTimeout(reset(),10000);
    }
}

function btnPress(){
    let btn=this;
    userFlash(this);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    
    checkAns(userSeq.length-1);
}
let allBtns=document.querySelectorAll(".box");

for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    level=0;
    userSeq=[];
    gameSeq=[];
}

