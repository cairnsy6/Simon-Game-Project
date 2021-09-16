var buttonColors = ["red","blue","green","yellow"]
var gamePattern = []
var userClickedPattern = []
var level = 0;
var started = false;

$(document).keydown(function(){
    if (!started){
    $("h1").text("Level "+ level);
    nextSequence();
    started = true;
    }
})

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length-1);
    
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
    
    if (userClickedPattern.length===gamePattern.length){
        setTimeout(function () {
            nextSequence();
          }, 1000);
    }
}else{
        playSound("wrong");
        $("body").addClass("game-over");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
       
        $("#level-title").text("Game over, Press any key to restart");
        startOver();
}}

function nextSequence(){
    userClickedPattern =[]
    level ++;
    $("#level-title").text("Level "+ level);
    var randomNumber = Math.floor(Math.random()*4)
    var buttonColor = buttonColors[randomNumber];
    gamePattern.push(buttonColor);
    $("#"+buttonColor).fadeOut(100).fadeIn(100);
    playSound(buttonColor)
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();   
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}



function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}