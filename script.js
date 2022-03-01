// Variables related to HTML elements
var scoreElement = document.getElementById("score");
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startBtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
// var buttonA = document.getElementById("a");
// var buttonB = document.getElementById("b");
// var buttonC = document.getElementById("c");
// var buttonD = document.getElementById("d");
var choiceElement = document.getElementById("choices")

// Object for Quiz questions
var quizQuestions = [{
    question: "What does HTML stand for?",
    choice: ["How to make labels", "Hypertext Markup Language", "Hefty Technological Material Language", "Hardware that makes Language"],
    correctAnswer: "Hypertext Markup Language"},
  {
    question: "What does DOM stand for?",
    choice: ["Document Object Model", "Display Object Management", "Digital Ordinance Model", "Desktop Oriented Mode"],
    correctAnswer: "Document Object Model"},
    {
    question: "What does CSS stand for?",
    choice: ["Cascading Style Sheets", "Collection of Styling Sheets", "Console Style Sheet", "Cute Style Sheet"],
    correctAnswer: "Cascading Style Sheets"},
    {
    question: "When was Javascript invented?",
    choice: ["1987", "2004", "1995", "2013"],
    correctAnswer: "1995"},
    {
    question: "When is localStorage data cleared?",
    choice: ["No expiration time", "On page reload", "On browser close", "On computer restart"],
    correctAnswer: "No expiration time"},  
    {
    question: "What does WWW stand for?",
    choice: ["Web World Withholds", "World Wide Web", "Wisdom, Withstand, Warrior", "Windy Weather Warning"],
    correctAnswer: "World Wide Web"},
    {
    question: "What HTML attribute references an external JavaScript file?",
    choice: ["href", "src", "class", "index"],
    correctAnswer: "src"},
        
    
    ];
// global variables
var finalQuestionsIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var score = 0;
var correct;

//function that generates quiz questions & answers
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionsIndex){
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    choiceElement.innerHTML = ""
    currentQuestion.choice.forEach(function(letter, i){
        var choiceArr = document.createElement("button")
        choiceArr.setAttribute("class", "choice")
        choiceArr.setAttribute("value", letter)
        choiceArr.textContent = letter
        choiceArr.onclick = checkAnswer 
        choiceElement.appendChild(choiceArr)
        //dynamic button for each. set attribute for each of these so that the value of each choice is read. Then, onclick event comparing value and correct answer-will trigger points add or time subtracted, also allows to jump to next question by increasing current index to 1.
    })
    scoreElement.textContent = "score:" + score
};

//function that starts the quiz, time ranges and hides the start button. Also this will trigger the first quiz question to display on screen.
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Set up of Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if(timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}

//This function = end page screen which displays the score receieved after finishing all questions or if the timer expires.
function showScore() {
    quizBody.style.display = "none";
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}
//high scores saved to local storage
submitScoreBtn.addEventListener("click", function highscore(){
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    } 
});
//function to clear current list of highoscores and generate a new one.
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name + "_________________________________" + highscores[i].score;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        // highscoreDisplayScore.appendChild(newScoreSpan);
    }
}
//displays highscore page while minimizing the other pages
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}
//this function clears high scores form local storage & clears text from highscore board.
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

//sets all variables back to original value and allows for replaying of quiz
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

//answer checker
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;
    if (this.value === correct && currentQuestionIndex !== finalQuestionsIndex){
        score++;
        alert("Correct Answer! :)");
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (this.value !== correct && currentQuestionIndex !==finalQuestionsIndex){
        alert("Sorry :( Wrong Answer!")
        timeLeft -=15
        currentQuestionIndex++;
        generateQuizQuestion();
    }else{
        showScore();
    }
}

//Button that starts the quiz!
startQuizButton.addEventListener("click",startQuiz);