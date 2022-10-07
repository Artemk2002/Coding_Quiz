//all of the variables are created
var start_btn = document.querySelector(".start_btn");
var info_box = document.querySelector(".info_box");
var exit_btn = info_box.querySelector(".buttons .quit");
var add_btn = document.querySelector(".buttons .add");
var save_btn = document.querySelector(".buttons .save");
var continue_btn = info_box.querySelector(" .buttons .restart");
var quiz_box = document.querySelector(".quiz_box");
var addScore_box = document.querySelector(".addScore_box");
var result_box = document.querySelector(".result_box");
var option_list = document.querySelector(".option_list");
var time_line = document.querySelector("header .time_line");
var timeText = document.querySelector(".timer .time_left_txt");
var timeCount = document.querySelector(".timer .timer_sec");
var highscore_btn = document.querySelector(".highscore_btn");
var highscore_box = document.querySelector(".highscore_box");
var close_btn = document.querySelector(".close");
var home_btn = document.querySelector(".home");
var timeValue =  30;
var que_count = 0;
var que_numb = 1;
var userScore = 0;
var counter;
var restart_quiz = result_box.querySelector(".buttons .restart");
var quit_quiz = result_box.querySelector(".buttons .quit");
var next_btn = document.querySelector("footer .next_btn");
var bottom_ques_counter = document.querySelector("footer .total_que");
var tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
var crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//All of the button actions
//Start Button
start_btn.addEventListener("click",function(){
    info_box.classList.add("activeInfo"); 
})
//Saved Score button
highscore_btn.addEventListener("click",function(){
    highscore_box.classList.add("active");
    console.log("hello")
    getHighScore()
    
})
//Exit button
exit_btn.addEventListener("click",function(){
    info_box.classList.remove("activeInfo"); 
})
//Continue Button
continue_btn.addEventListener("click",function(){
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz"); 
    showQuetions(0); 
    queCounter(1); 
    startTimer(29); 
    
})
//Close button
close_btn.addEventListener("click",function(){
    highscore_box.classList.remove("active"); 
})
//restart button
restart_quiz.addEventListener("click",function(){
    quiz_box.classList.add("activeQuiz"); 
    result_box.classList.remove("activeResult"); 
    timeValue = 29; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    showQuetions(que_count);
    queCounter(que_numb); 
    clearInterval(counter); 
    startTimer(timeValue); 
    
    timeText.textContent = "Time Left"; 
    next_btn.classList.remove("show"); 
})
//Quit button
quit_quiz.addEventListener("click",function(){
    window.location.reload(); 
})
//save user name button
add_btn.addEventListener("click",function(){
    result_box.classList.remove("activeResult");
    addScore_box.classList.add("addHighscore");
})
//return to first page button
home_btn.addEventListener("click",function(){
    addScore_box.classList.remove("addHighscore");
    location.reload();
return false;
})
//Save user name button
save_btn.addEventListener("click",function(){
    handleFormSubmit()
return false;
})
//next question button
next_btn.addEventListener("click",function(){
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuetions(que_count); 
        queCounter(que_numb); 
        timeText.textContent = "Time Left"; 
        next_btn.classList.remove("show");
    }else{ 
        showResult(); 
    }
})

//All of the functions
//Get and display question function
function showQuetions(index){
    var que_text = document.querySelector(".que_text");

    var que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    var option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag; 
    
    var option = option_list.querySelectorAll(".option");
  
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer){
    let userAns = answer.textContent;
    let correcAns = questions[que_count].answer;
    const allOptions = option_list.children.length;
    
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("Wrong Answer");
        penelty();
        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ 
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show"); 
}
//Show results at the end function
function showResult(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult"); 
    var scoreText = result_box.querySelector(".score_text");
    var scoreSeconds = result_box.querySelector(".scoreSec");
    score= timeValue;
    clearInterval(counter); 
    if(score < 0){
        score = 0;
      }
    var scoreTag = '<span>You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p>';
    scoreText.innerHTML = scoreTag;  
    
    var scoreTime = '<span>You had<p>'+ score +'</p> seconds left<p>'+'</p></span>';
    scoreSeconds.innerHTML = scoreTime;
    timeCount.textContent = "30"
} 
//Get users saved score
function getHighScore(){


    var retrievedData = JSON.parse(localStorage.getItem('UserSavedHighscore'));
    console.log(retrievedData);

    var scoreHistory = '<span>'+retrievedData.userName+ "<p>:  </p>"+ retrievedData.userScore +'</p> points out of 5, with <p>'+ retrievedData.timeleft +'</p> seconds left.</p></span>';
    document.getElementById("User123").innerHTML= scoreHistory;
    

}
//Save user name with their score
function handleFormSubmit(){
  
 var userItem = document.getElementById("user_input").value;
 console.log(userItem)
  if (!userItem) {
    alert('No Name was typed in the form!')
    console.log('No Name was typed in the form!');
    return;
  }
  
  document.getElementById("user_list").innerHTML=userItem;
  var saveScore=userScore.toString();
  var saveTime=score.toString();
    var userScoreSave = {
    userName: userItem.trim(),
    userScore: saveScore.trim(),
    timeleft: saveTime.trim(),
  };
  localStorage.setItem("UserSavedHighscore", JSON.stringify(userScoreSave));
  location.reload();
}
//5 sec penalty funciton
function penelty(){
    clearInterval(counter);
    timeValue=timeValue-4;
    startTimer(timeValue);
}
//Start time funciton
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--; 
        timeValue=time;
        if(time < 9){ 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){ 
            clearInterval(counter);
            showResult();
        }
    }
}
//question counter
function queCounter(index){
    
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
}