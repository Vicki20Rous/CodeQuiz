//Declare the UI elements
var ul = document.getElementById('ul')
var nextButton = document.getElementById('btnNext');
var quizbox = document.getElementById('questionBox')
var opt1 = document.getElementById('opt1')
var opt2 = document.getElementById('opt2')
var opt3 = document.getElementById('opt3')
var opt4 = document.getElementById('opt4')

var app={
        questions:[
            {
                q:'What does CSS stand for',
                options: ['Computer Science Skill', 'Cascading Style Sheets', 'Crucial Service Squad', 'Creative Styles Sheet'],
                answer:2
            },
            {
                q:'Which HTML attribute is used to define inline styles',
                options: ['font', 'style', 'class', 'styles'],
                answer:4
            },
            {
                q:'What CSS property controls text size',
                options: ['text-size', 'font-style', 'font-size', 'text-style'],
                answer:3
            }, 
            {
                q:'Where in an HTML document is the correct place to refer to an external style sheet',
                options: ['In the head section', 'At the end of the document', 'In the body section', 'At the top of the document'],
                answer:1
            }                                   
        ],
        index:0,
        
        load:function(){
            if(this.index<=this.questions.length-1){
                quizbox.innerHTML=this.index+1 + ". " +this.questions[this.index].q;
                opt1.innerHTML=this.questions[this.index].options[0];
                opt2.innerHTML=this.questions[this.index].options[1];
                opt3.innerHTML=this.questions[this.index].options[2];
                opt4.innerHTML=this.questions[this.index].options[3];
            }
            else {
                quizbox.innerHTML="Quiz Completed!";
                ul.style.display="none";
                nextButton.style.display="none";
            }
        },

        next: function(){
            this.index++;
            this.load();
        },

        check: function(ele){
            var id=ele.id.split('');
            if(id[id.length-1]==this.questions[this.index].answer){
                this.score++;
                ele.className="correct";
                this.scoreCard();
            }
            else{
                ele.className="wrong";
            }
        },
        preventClick:function(){
            for(let i=0; i<ul.children.length; i++){
                ul.children[i].style.pointerEvents="none";
            }
        },
        allowClick:function(){
            for(let i=0; i<ul.children.length; i++){
                ul.children[i].style.pointerEvents="auto";
                ul.children[i].className=''
            }
        },
        score:0,
        scoreCard:function(){
            scoreCard.innerHTML=this.score + "/" + this.questions.length;
        }
}

window.load=app.load();

function button(ele){
    app.check(ele);
    app.preventClick();
}

function next(){
    app.next();
    app.allowClick();
}