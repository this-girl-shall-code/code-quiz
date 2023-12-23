let startBtn = document.getElementById('start'); 
let questionScreen = document.getElementById('questions');
let startScreen = document.getElementById('start-screen');
let time = document.getElementById('time');
let endScreen = document.getElementById('end-screen');
let finalScore = document.getElementById('final-score');


let startingTime = 50; 

function finishQuiz(){
    time.textContent = '';
    endScreen.setAttribute('class', '');
    questionScreen.setAttribute('class', 'hide');
    finalScore.textContent = startingTime;
    console.log('Quiz finished');
};

startBtn.addEventListener('click', () => {
    //hide start screen and renders the question screen when startBtn is clicked 
    startScreen.setAttribute('class', 'hide');
    questionScreen.setAttribute('class', '');
    time.textContent = startingTime;
    renderQuestion();
    
    //timer is started when startBtn is clicked - setInterval runs every 1sec and decreases startingTime by 1 each time to create the timer
    let timer = setInterval(() => {
        time.textContent = startingTime;
               
    //Once startingTime reaches zero or less it cancels the setInterval with clearInterval(timer) and then renders the end-screen.
        if(startingTime <= 0){
            clearInterval(timer); 
            startingTime = 0; //set startingTimer to 0 beacuse if incorrect answers given - it might take it to a minus number
            finishQuiz();
        }else if(currentQuestionIndex === questionsArray.length){ //if all questions are answered - finish quiz
            clearInterval(timer);
            finishQuiz();
        }
        startingTime--;
    }, 1000); // 1sec (1000ms) interval
});


/*********************** end-screen => adding initials & score to local storage *****************************************/

let submitBtn = document.getElementById('submit');
let initialsInput = document.getElementById('initials');

let highscore = [];

submitBtn.addEventListener('click', () => {
    if(initialsInput.value === ''){ //don't allow an empty initals entry
        feedback.textContent = 'Please add your initials';
        feedback.setAttribute('class', 'feedback');
        return;
    }else{
        let newScore = `${initialsInput.value.toLocaleUpperCase()}: ${finalScore.textContent}`;
        //retrive any scores already in local storage
        highscore = (JSON.parse(localStorage.getItem('highscore')) || []);
        // add further score to that array
        highscore.push(newScore);
        //add scores to local storage
        localStorage.setItem('highscore', JSON.stringify(highscore));
    
        //provide user with msg so that they know their score has been added to the score board
        feedback.textContent = 'Score added to Highscores';
        feedback.setAttribute('class', 'feedback');

        //after submit button is pressed - disable button so you don't add the same initals & score for that round multiple times
        submitBtn.disabled = true;
        submitBtn.style.backgroundColor = '#8570a5';
        submitBtn.style.cursor = 'not-allowed';
    };
});

/**************** TODOS ************************/
// Arrange highscores by highest score

