// Variables related to HTML elements
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
var endGameBtns = document.getElementById("engGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Object for Quiz questions
var quizQuestions = [{
    question: "What does HTML stand for?",
    choiceA: "How to make labels",
    choiceB: "Hypertext Markup Language",
    choiceC: "Hefty Technological Material Language",
    choiceD: "Hardware that makes Language",
    correctAnswer: "b"},
  {
    question: "What does DOM stand for?",
    choiceA: "Document Object Model",
    choiceB: "Display Object Management",
    choiceC: "Digital Ordinance Model",
    choiceD: "Desktop Oriented Mode",
    correctAnswer: "a"},
   {
    question: "What does CSS stand for?",
    choiceA: "Cascading Style Sheets",
    choiceB: "Collection of Styling Sheets",
    choiceC: "Console Style Sheet",
    choiceD: "Cute Style Sheet",
    correctAnswer: "a"},
    {
    question: "When was Javascript invented?",
    choiceA: "1987",
    choiceB: "2004",
    choiceC: "1995",
    choiceD: "2013",
    correctAnswer: "c"},
    {
    question: "When is localStorage data cleared?",
    choiceA: "No expiration time",
    choiceB: "On page reload",
    choiceC: "On browser close",
    choiceD: "On computer restart",
    correctAnswer: "a"},  
    {
    question: "What does WWW stand for?",
    choiceA: "Web World Withholds",
    choiceB: "World Wide Web",
    choiceC: "Wisdom, Withstand, Warrior",
    choiceD: "Windy Weather Warning",
    correctAnswer: "b"},
    {
    question: "What HTML attribute references an external JavaScript file?",
    choiceA: "href",
    choiceB: "src",
    choiceC: "class",
    choiceD: "index",
    correctAnswer: "b"},
        
    
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
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
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
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoresDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
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

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("Correct Answer! :)");
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !==finalQuestionsIndex){
        alert("Sorry :( Wrong Answer!")
        currentQuestionIndex++;
        generateQuizQuestion();
    }else{
        showScore();
    }
}

//Button that starts the quiz!
startQuizButton.addEventListener("click",startQuiz);