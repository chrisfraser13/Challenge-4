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
