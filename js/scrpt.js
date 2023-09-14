// Collections of all questions 
const Questions = [{
    q: "A Function Associated With An object is Called:",
    a: [{ text: "Function", isCorrect: false },
        { text: "Method", isCorrect: true },
        { text: "Link", isCorrect: false },
        { text: "None", isCorrect: false }
    ]

},

{
    q: "When a user views a page containing a JavaScript program, which machine actually executes the script?",
    a: [{ text: "The User's machine running a Web browser", isCorrect: true },
        { text: "The Web server", isCorrect: false },
        { text: "A central machine deep within Netscape's corporate offices", isCorrect: false },
        { text: "None of the above", isCorrect: false }
    ]

},

{
    q: "__________ JavaScript is also called server-side JavaScript",
    a: [{ text: "Microsoft", isCorrect: false },
        { text: "Navigator", isCorrect: false },
        { text: "LiveWire", isCorrect: true },
        { text: "Native", isCorrect: false }
    ]

},

{
    q: "If Button is clicked _________ Event Handler is invoked.",
    a: [{ text: "OnSubmit()", isCorrect: false },
        { text: "OnLoad()", isCorrect: false },
        { text: "IsPostBack()", isCorrect: false },
        { text: "Onclick()", isCorrect: true }
    ]

},

{
    q: "What are variables used for in JavaScript Programs?",
    a: [{ text: "Storing numbers, dates, or other values", isCorrect: true },
        { text: "Varying randomly", isCorrect: false },
        { text: "Causing high-school algebra flashbacks", isCorrect: false },
        { text: "None of the above", isCorrect: false }
    ]

},

{
    q: "Which of the following can't be done with client-side JavaScript?",
    a: [{ text: "Validating a form", isCorrect: false },
        { text: "Sending a form's contents by email", isCorrect: false },
        { text: "Storing the form's contents to a database file on the server", isCorrect: true },
        { text: "None of the above", isCorrect: false }
    ]

}

]

//HTML Querying Elements
var timerElement = document.getElementById("timer-count");
var finalScore = document.getElementById("final-score");
var leaderBoardScore = document.getElementById("lbscore");
var userInitials = document.getElementById ("initials");

var resultsEl =document.getElementById("rcontainer");
var questionsEl = document.getElementById("qcontainer");
var leaderBoardEl = document.getElementById ("scontainer");
var preQuizEl = document.getElementById ("pqcontainer");
var leaderDisplay = document.getElementById("leader-board");

var startButton = document.getElementById("startQuizButton");
var goBackButton = document.getElementById ("goBackButton");
var submitButton = document.getElementById("submit");
var clearButton = document.getElementById ("clear-button");
var viewResultsEl = document.getElementById("vwresults");
var showRight = document.getElementById ("accuracy");
var partition = document. getElementById ("partition");
var timeTakenEl = document.getElementById ("timeTaken");

//Initialing global variables
let id = 0;
let score = 0;
let timerCount = 0;
let timer;
let timeTaken;
let lastQuestion = false;
let result;

// Init function that loads the first page
function init () {
    timerElement.textContent = 0;
    preQuizEl.style.display = 'block';
    questionsEl.style.display = 'none';
    resultsEl.style.display = 'none';
    leaderBoardEl.style.display = 'none';
}

//Function to start the quiz
function startQuiz() {
    console.log('started');
        timerCount = 120;
        id = 0;
        score = 0;
        lastQuestion = false;
        startTimer();
        renderQuestions(0);
}

// Function that starts start timer 
function startTimer() {
    timer = setInterval(function() {
        // console.log ('timer count in start timer' + timerCount);
        if (timerCount <= 0) {
           clearInterval(timer);
           timer = null;
           displayResults();
        } else { 
            timerElement.textContent = timerCount;
        }
        timerCount--;
    
    },1000);
    }


//declaring and defining the function to loop through questions

function renderQuestions(increment){
  
    // Setting the index to retrieve the next question
    id = id + increment;
    console.log('index:' + id);
    if (id == Questions.length - 1) {
       lastQuestion = true;
    }

    preQuizEl.style.display = "none";
    questionsEl.style.display = 'block';
    resultsEl.style.display = 'none';
    leaderBoardEl.style.display = 'none';

    //populating the question in the quiz
    const question = document.getElementById('question');
    question.textContent = Questions[id].q;

    //population the options in the quiz
    const op1 = document.getElementById('op1');
    op1.textContent = Questions[id].a[0].text;

    const op2 = document.getElementById("op2");
    op2.innerText = Questions[id].a[1].text;

    const op3 = document.getElementById("op3");
    op3.innerText = Questions[id].a[2].text;

    const op4 = document.getElementById("op4");
    op4.innerText = Questions[id].a[3].text;

    partition.innerText = ''
    showRight.innerText = '';

}

// Validate if the answer is correct 
function evaluateAnswer(event){
    event.stopPropagation();
    event.preventDefault();
    let selected = event.target.id;
    let isSelectedCorrect;

    //console.log ("selected: " + selected);
    if (selected == "op1") {
        isSelectedCorrect = Questions[id].a[0].isCorrect;
       // console.log (' Option 1');
    } else if (selected == "op2") {
        isSelectedCorrect = Questions[id].a[1].isCorrect;
    } else if (selected == "op3") {
        isSelectedCorrect = Questions[id].a[2].isCorrect;
    } else {
        isSelectedCorrect = Questions[id].a[3].isCorrect;
    };

    if (isSelectedCorrect) {
        score += 1;
        result = "Correct";
    } else {
        // reduce time by 2 seconds when answer is incorrect
        result = "Wrong!!!";
        if (timerCount > 1) {
            timerCount -= 2;
        } else {
            displayResults();
        }
    }

    isAnswerCorrect();
}


// Show the questions plus if the selected answer is correct
function isAnswerCorrect() {
    const question = document.getElementById('question');
    question.textContent = Questions[id].q;

    const op1 = document.getElementById('op1');
    op1.textContent = Questions[id].a[0].text;

    const op2 = document.getElementById("op2");
    op2.innerText = Questions[id].a[1].text;

    const op3 = document.getElementById("op3");
    op3.innerText = Questions[id].a[2].text;

    const op4 = document.getElementById("op4");
    op4.innerText = Questions[id].a[3].text;

    partition.innerText = '----------------------------------------';
    showRight.innerText = result;
    showRight.style.fontStyle = "italic";


    setTimeout(nextQuestion,500);
}

//function to call next question
function nextQuestion() {

    if (id <= Questions.length - 1 && !lastQuestion)  {
     renderQuestions(1);
    } else {
            displayResults();
    }
}