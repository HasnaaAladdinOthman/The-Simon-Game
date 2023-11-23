const buttonColours= ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern= [];
var started= false;
var level=0;


$(document).on("keydown", function(){
    if(!started){
        started=true;
        $("h1").text("Level "+ level);
        nextSequence();}
    });

$(".btn").click(function(){
    userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern=[];
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level "+ level);
}

function checkAnswer(currentLevel){
    console.log("userClickedPattern is "+ userClickedPattern[currentLevel]);
    console.log("game pattern is "+ gamePattern[currentLevel]);
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        var wrong= new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function playSound(name){
    var audio= new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    }, 100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}