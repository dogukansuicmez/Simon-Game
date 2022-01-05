var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;






$(document).keypress(function() {
  if (!started===true) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



$(".btn").click(function() {


  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1)
});







function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length===gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      },1000)
    }
  }else {
    var audio = new Audio("sounds/" + "wrong" + ".mp3");
    audio.play();
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200)
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver()
  }
}


function nextSequence() {
  userClickedPattern = [];/*bu fonksiyon her çalıştığında bu liste 0 lansın diye buraya ekledik yoksa bu sadece en yukardaydı*/
  level++;
  $("#level-title").text("level: "+level);
  var randomNumber = Math.round(Math.random()*3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();


  playSound(randomChosenColour);

}


/*bu alttaki fonksiyon ise basıldığında ses verdirtio bunu ana fonksiyona koyduk ki onu call ettiğimizde bu fonk'ta çalışsın click üzerine*/
function playSound(name) {
  $("#"+name).click(function() {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  })

}


/*Animasyon fonksiyonu*/
function animatePress(currentColour) {
  $("#"+currentColour).click(function() {
    $(this).addClass("pressed");
    setTimeout(function() {
      document.querySelector("#"+currentColour).classList.remove("pressed")/*Bunu jQuery le değil DOM ile yaptım*/
    },100)

  })

}



function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
