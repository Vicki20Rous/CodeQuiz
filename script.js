//Declare the UI elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [
            {
                question :"Which franchise moved to Kansas City and establish the Chiefs franchise?",
                imgSrc : "img/andybelievesinyou.png",
                choiceA : "Dallas Texans",
                choiceB : "Boston Patriots",
                choiceC : "St. Louis Cardinals",
                choiceD : "Baltimore Colts",
                correct : "A" 
            },{
                question :"Who is the Chiefs Top Receiver on the 1969 Roster?",
                imgSrc : "img/andybelievesinyou.png",
                choiceA : "Larry Smith",
                choiceB : "Frank Pitts",
                choiceC : "Homer Jones",
                choiceD : "Otis Taylor",
                correct : "D" 
            },{
                question :"What is the name of the Chiefs Home Stadium?",
                imgSrc : "img/andybelievesinyou.png",
                choiceA : "Hard Rock Stadium",
                choiceB : "Arrowhead Stadium",
                choiceC : "Lambeau Field",
                choiceD : "Gillette Stadium",
                correct : "B" 
            },{
                question :"Who is the Chiefs starting Quarterback?",
                imgSrc : "img/andybelievesinyou.png",
                choiceA : "Aaron Rodgers",
                choiceB : "Lamar Jackson",
                choiceC : "Patrick MaHomes",
                choiceD : "Deshaun Watson",
                correct : "C" 

            },{
                question :"When was the last Super Bowl Championship did the Chiefs won?",
                imgSrc : "img/andybelievesinyou.png",
                choiceA : "Super Bowl 25",
                choiceB : "Super Bowl 33",
                choiceC : "Super Bowl 41",
                choiceD : "Super Bowl 54",
                correct : "D" 
            
            }                                   
        ];
       
    const lastQuestion = questions.length - 1;
    let runningQuestion = 0;
    let count = 0;
    const questionTime = 10;
    const gaugeWidth = 150;
    const gaugeUnit = gaugeWidth / questionTime;
    let TIMER;
    let score = 0;

        
    function renderQuestion(){
        let q = questions[runningQuestion];
            
            question.innerHTML = "<p>" + q.question +"</p>";
            qImg.innerHTML = "<img src="+ q.imgSrc +">";
            choiceA.innerHTML = q.choiceA;
            choiceB.innerHTML = q.choiceB;
            choiceC.innerHTML = q.choiceC;
            choiceD.innerHTML = q.choiceD;
        }

    start.addEventListener("click", startQuiz);

    function startQuiz(){
        start.style.display = "none";
        renderQuestion();
        quiz.style.display = "block";
        renderProgress();
        renderCounter();
        TIMER = setInterval(renderCounter, 1000);
    }

    function renderProgress(){
        for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
            progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
        }
    }

    
    function renderCounter(){
        if(count <= questionTime){
            counter.innerHTML = count;
            timeGauge.style.width = count * gaugeUnit + "px";
            count++
        }else{
            count = 0;
            answerIsWrong();
        if( runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{ 
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();

    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "green";
}

function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "red";
}

function scoreRender(){
    scoreDiv.style.display = "block";

    const scorePerCent = Math.round(100 * score / questions.length);

    let img= ( scorePerCent >= 80 ) ? "img/chiefgiphy.gif":
             ( scorePerCent >= 60 ) ? "img/chiefs-logo.jpg":
             ( scorePerCent >= 40 ) ? "img/1-Emoji-Why-No.jpg":
             ( scorePerCent >= 20 ) ? "img/sad-face-emoji.png": "img/giphy.gif";
    
    scoreDiv.innerHTML = "<img src=" + img +">";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";   
}