import countries from "./countries.js";

// DOM Elements
const flag = document.querySelector("#flag");
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const timer = document.querySelector(".timer");
const barHolder = document.querySelector(".progress");
const progessBar = document.querySelector(".bar");
const message = document.querySelector(".message");
const again = document.querySelector("#again");
const main = document.querySelector(".game-main");
const end = document.querySelector(".end");
const hardBtn = document.querySelector(".hard");
const easyBtn = document.querySelector(".easy");
const body = document.querySelector("#content")

// DRY functions

function country() {
    const countriesList = countries.getCountries();
    return countriesList[Math.floor(Math.random()*countriesList.length)];
};
function hide(element) {
    element.classList.add("hide");
};
function show(element) {
    element.classList.remove("hide") ;
}
let increment = 20;
let reduction = 5;
let progess = 10;
let time = 60;

// Difficulty
hardBtn.addEventListener("click", function(){
    increment = 7;
    reduction = 5;
    main.classList.add("hard-game");
    progess = 0;
    time = 50;
    outputs()   
});
easyBtn.addEventListener("click", function(){
    increment = 20;
    reduction = 5;
    main.classList.remove("hard-game");
    outputs()   
});

// Init Variables
let correctCountry;
let wrongCountry;
let paused = false;



// Do Outputs
function outputs() {
    // Resets
    timer.style.color = "rgb(13, 156, 13)"
    show(flag);
    show(option1);
    show(option2);
    show(timer);
    show(progessBar);
    show(barHolder);
    hide(message);
    hide(again);
    hide(end);
    main.classList.remove("incomplete")
    main.classList.remove("complete");


    // AWAIT
    correctCountry = country();
    flag.setAttribute("src", `images/${correctCountry[1]}.png`);
    wrongCountry = country();
      if(wrongCountry == correctCountry){
        wrongCountry = country();
      } ;


    // Random options functionality 
    const domOptions = [option1, option2];
    const ranOp1 = domOptions[Math.trunc(Math.random()*domOptions.length)];

    const ranOp2 = () => ranOp1 == option1 ? option2 : option1;
      
    ranOp1.textContent = correctCountry[0];
    ranOp2().textContent = wrongCountry[0];

}


// GAME DIRECTOR
async function game(){
    // Init variable(s)
    progessBar.style.width = `${progess}%`;

    // TIME INTERVALS
    const timerFunction = setInterval(function(){
        if(!paused){
        time--
        timer.textContent = `${time}`
        if(time <= 0 ){
            endGame(false)
        }else if(time <= 20){
            timer.style.color = "rgb(172, 0, 0)";
        }
    };
    },1000)
    outputs()
        
    // END GAME
    const endGame = (complete=true) => {
        paused = true
        hide(flag);
        hide(option1);
        hide(option2);
        hide(timer);
        hide(progessBar);
        hide(barHolder);
        progess = 10;
        show(again);
        if(complete){
        show(message);
        main.classList.add("complete");
        }else{
            show(end);
            main.classList.add("incomplete")
        };
        
    };

    // OPTION VALIDATION
    const validateOption = (option) => {
        option.addEventListener("click", function(){
            if(option.textContent == correctCountry[0]){
                progess += increment;
            }else{
                progess -= reduction;
            }
            outputs();
            if(progess >= 100){
                endGame()
            }else if(progess < 0){
                progess = 0
            }
            progessBar.style.width = `${progess}%`
        });
    }

    validateOption(option1);
    validateOption(option2);

        
    // Retart
    again.addEventListener("click", function(){
        outputs();
        time = 60;
        paused = false;
    });
    };

game();