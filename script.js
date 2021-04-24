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
                question :"What does CSS stand for",
                imgSrc : "img/andybelievesinyou.png",
                choiceA : "Correct",
                choiceB : "Wrong",
                choiceC : "Wrong",
                choiceD : "Wrong",
                correct : "A" 
            },{
                question :"What does CSS stand for",
                imgSrc : "img/andybelievesinyou.png",
                choiceA : "Wrong",
                choiceB : "Wrong",
                choiceC : "Wrong",
                choiceD : "Correct",
                correct : "D" 
            },{
                question :"What does CSS stand for",
                imgSrc : "img/andybelievesinyou.png",
                choiceA : "Wrong",
                choiceB : "Correct",
                choiceC : "Wrong",
                choiceD : "Wrong",
                correct : "B" 
            
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

    let img= ( scorePerCent >= 80 ) ? "img/1-Emoji-Party.jpg":
             ( scorePerCent >= 60 ) ? "img/1-Emoji-Excitement.jpg":
             ( scorePerCent >= 40 ) ? "img/1-Emoji-Why-No.jpg":
             ( scorePerCent >= 20 ) ? "img/sad-face-emoji.png": "img/eaec38b87381bdc0a39f43d76f1fbe14.jpg";
    
    scoreDiv.innerHTML = "<img src=" + img +">";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";   
}