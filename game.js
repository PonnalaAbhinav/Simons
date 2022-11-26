var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
$(".btn").on("click",function(){
    var userChoosenColor=$(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    console.log(userClickedPattern);
    animatePress(userChoosenColor); 
    playSound(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
})
$(document).on("keydown",function(){
   if(started==false)
   {
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
   }
})
function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randonChoosenColor=buttonColours[randomNumber];
    gamePattern.push(randonChoosenColor);
    $("#"+randonChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randonChoosenColor);
}
function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function()
    {
        $("#"+currentColor).removeClass("pressed");
    },100);
}
function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over,Press any key to restart");
        startOver();
    }
}
function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}