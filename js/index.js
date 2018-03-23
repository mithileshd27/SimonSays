var redSound = document.getElementById("red"); 
var greenSound = document.getElementById("green"); 
var yellowSound = document.getElementById("yellow"); 
var blueSound = document.getElementById("blue"); 
var warningSound = document.getElementById("warning");
var winSound = document.getElementById("win");
var count=0;
var computerSequence = [];
var humanSequence = [];
var strict = false;
var seqKey = 0;
var winLength = 20;

var sequenceObj = {
  1 : function(){
    $(".topL").addClass("dark");
    redSound.play();
    var x = setTimeout( function(){
      $(".topL").removeClass("dark");
    }, 200);
  },
  2 : function(){
    $(".topR").addClass("dark");
    greenSound.play();
    var x = setTimeout( function(){
      $(".topR").removeClass("dark");
    }, 200);
  },
  3 : function(){
    $(".bottomL").addClass("dark");
    blueSound.play();
    var x = setTimeout( function(){
      $(".bottomL").removeClass("dark");
    }, 200);
  },
  4 : function(){
    $(".bottomR").addClass("dark");
    yellowSound.play();
    var x = setTimeout( function(){
      $(".bottomR").removeClass("dark");
    }, 200);
  }
}

function verifyHumanSequence(arr){
  var isCorrect = 1;
  if ( arr.length != computerSequence.length ){
    window.alert("Something Went wrong. Reset Game");
    //Reset Game here
  } else {
    for( var i = 0; i < arr.length; i++ ){
      if( arr[i] != computerSequence[i] ) {
        isCorrect=0;
        $("#beingcounted").html("!!");
        warningSound.play();
        var x = setTimeout( function(){
          if( strict ){
            computerSequence = [];
            computerSequence.push(Math.ceil(Math.random() * 4));
            count = 0;
          } else {
            count--; 
          }
          playgame(false);
        }, 2500);
      }
    }
    if(isCorrect){
      playgame(true);
    } else {
      //Say you lost and put reset game here.
    }
  }
}

function takeHumanSequence(){
  humanSequence = [];
  $(".topL").off('click').click(function(){
    redSound.play();
    humanSequence.push($(this).attr('id'));
    if(humanSequence.length == count){
      verifyHumanSequence(humanSequence);
    }
  });
  $(".topR").off('click').click(function(){
    greenSound.play();
    humanSequence.push($(this).attr('id'));
    if(humanSequence.length == count){
      verifyHumanSequence(humanSequence);
    }
  });
  $(".bottomL").off('click').click(function(){
    blueSound.play();
    humanSequence.push($(this).attr('id'));
    if(humanSequence.length == count){
      verifyHumanSequence(humanSequence);
    }
  });
  $(".bottomR").off('click').click(function(){
    yellowSound.play();
    humanSequence.push($(this).attr('id'));
    if(humanSequence.length == count){
      verifyHumanSequence(humanSequence);
    }
  });
}

function playComputerSequence(arr){
  seqKey = 0;
  var a = setInterval( function(){
    sequenceObj[arr[seqKey].toString()]();
    seqKey++;
    if( seqKey == arr.length ){
      clearInterval(a);
      takeHumanSequence();
    }
  },1000);
}

function winGame(){
  winSound.play();
  $(".gameWin").show();
}

function playgame(myBool){
  count++;
  if ( count > winLength ){
    winGame();
    return;
  }
  $("#beingcounted").html(count);  
  if( myBool === true ){
    computerSequence.push(Math.ceil(Math.random() * 4)); 
  }
  playComputerSequence(computerSequence);
}

$(document).ready(function(){
  $(".gameWin").hide();
  $("#startbtn").on("click", function(){
    $(".btns").removeClass("noClick").addClass("yesClick");
    $(this).addClass("noClick");
    $("#start").addClass("highlight");
    $(".reset").on("click", function(){
      $("#startbtn").removeClass("noClick").addClass("yesClick");
      $("#stricttbtn").removeClass("noClick").addClass("yesClick");
      $("#strict").removeClass("highlight");
      $("#start").removeClass("highlight");
      count=0;
      computerSequence = [];
      humanSequence = [];
      strict = false;
      seqKey = 0;
      $("#beingcounted").html("--");
      $(".gameWin").hide();
    });
    playgame(true);
  });
  $("#strictbtn").on("click", function(){
    $(this).addClass("noClick");
    $("#strict").addClass("highlight");
    strict = true;
  });
  $(".btn-danger").on("click", function(){
    $("#instructions").fadeOut(300);
  });
  $("#instrbtn").on("click", function(){
    $("#instructions").fadeIn(300);
  });
});