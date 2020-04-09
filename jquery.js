var playing = false;
var score;
var trialsleft;
var action;
var step;
var fruits = ['apple','banana','cherries','grapes','mango','orange','peach','pear','watermelon'];
$(function(){
    $("#startreset").click(function(){
        if(playing == true){
            location.reload();
        }
        else{
            playing = true;
            score = 0;
            $("#startreset").html("Reset Game");
            $("#scorevalue").html(score);
            $("#trialremaining").show();
            $("#gameover").hide();
            trialsleft = 3;
            addHeart();
            startAction();
        }
    });
    $("#ok").click(function(){
        location.reload();
    });
    $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").html(score);
        $("#sliceSound")[0].play();
        clearInterval(action);
        $("#fruit1").hide("explode",500);
        setTimeout(startAction,500);
    });
    //functions
    function addHeart(){
        $("#trialremaining").empty();
        for(i=0; i<trialsleft; i++){
            $("#trialremaining").append('<img src="img/heart.png" alt="life" class="heart">');
        }
    }
    function startAction(){
        generateFruit();
        action = setInterval(function(){
            $("#fruit1").css('top',$("#fruit1").position().top + step);
            if($("#fruit1").position().top > $("#fruitsConatiner").height()){
                if(trialsleft > 1){
                    trialsleft--;
                    generateFruit();
                    addHeart();
                }
                else{
                    playing = false;
                    $("#startreset").html("Start Game");
                    $("#trialremaining").hide();
                    $("#gameover").show();
                    $("#ok").show();
                    $("#gameover").html('<p>Game Over!</p><p>Your Score is: '+score+'</p>');
                    stopAction();
                }
            }
        },10);
    }
    function chooseFruit(){
        $("#fruit1").attr('src','img/'+fruits[Math.round(Math.random()*8)]+'.png');
    }
    function generateFruit(){
        $("#fruit1").show();
        chooseFruit();
        $("#fruit1").css({'top' : -50, 'left': Math.round(Math.random()*550)});
        step = 1 + Math.round(Math.random()*5);
    }
    function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
    }
});