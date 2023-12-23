let question = document.getElementById('question-title');
let choicesDiv = document.getElementById('choices');
let feedback = document.getElementById('feedback');
let correctSound = new Audio('./assets/sfx/correct.wav');
let incorrectSound = new Audio('./assets/sfx/incorrect.wav');

let currentQuestionIndex = 0 // every time the user answers a Q -> increment currentQuestionIndex to render next Q

//an array of objects to hold each question, multiple choice options & the correct answer
const questionsArray = [
    {
        title: `Commonly used data types DO NOT include:`,
        choice: ['1. Strings', '2. Booleans', '3. Alerts', '4. Numbers'],
        correctAnswer: {choiceindex: '2'} //this tells you that the correct answer is at index 2 of the choice array - so that is '3. Alerts'
    },

    {
        title: `The condition in an if/else statement is enclosed with...`,
        choice: ['1. Quotes', '2. Parenthesis', '3. Curly Brackets', '4. Square Brackets'],
        correctAnswer: {choiceindex: '1'} //this tells you that the correct answer is at index 1 of the choice array - so that is '2. Parenthesis'
    },

    {
        title: `String values must be enclosed within what, when being assigned to variables`,
        choice: ['1. Quotes', '2. Curly Brackets', '3. Square Brackets', '4. Nothing'],
        correctAnswer: {choiceindex: '0'} //this tells you that the correct answer is at index 0 of the choice array - so that is 'Quotes'
    },

    {
        title: `A useful tool used during development and debugging to print content to the debugger is:`,
        choice: ['1. function', '2. Terminal', '3. if/else statement', '4. console.log()'],
        correctAnswer: {choiceindex: '3'} //this tells you that the correct answer is at index 3 of the choice array - so that is '4. console.log()' 
    },

    {
        title: `What does the following line of code return: let sum = "1" + "2";`,
        choice: ['1. 3', '2. "12"', '3. 12', '4. 1 + 2'],
        correctAnswer: {choiceindex: '1'} //this tells you that the correct answer is at index 1 of the choice array - so that is '2. "12"' 
    },
];

function renderQuestion(){
    //clear any previous elements
    choicesDiv.innerHTML = '';
    // render question
    question.textContent = `${currentQuestionIndex + 1}. ${questionsArray[currentQuestionIndex].title}`;
    //loop over the choices for that question and render a button for each choice
    for(let i = 0; i < questionsArray[currentQuestionIndex].choice.length; i++){
        let btn = document.createElement('button');
        btn.setAttribute('data-choiceindex', i);
        btn.textContent = questionsArray[currentQuestionIndex].choice[i];
        choicesDiv.appendChild(btn);
    }
};

choicesDiv.addEventListener('click', (event) => {
    if(event.target.matches('button')){

        //Turn the DOM dataset and correctAnswer objects into strings so they can be compared to see if they match/correct answer clicked
        let eventTargetDataset = JSON.stringify(event.target.dataset);
        let AnswerNeeded = JSON.stringify(questionsArray[currentQuestionIndex].correctAnswer);
        
        if(eventTargetDataset === AnswerNeeded){
            console.log('correct answer clicked');
            //plays correct noise
            correctSound.currentTime= 0; //stops sound and rewinds back to beginning so if you click quickly on 2 consecutive correct answers, you hear the sound twice
            correctSound.play();
            // if user clicks the correct answer - change feedback text to 'Correct' 
            feedback.textContent = 'Correct';
            
        }else{
            console.log('incorrect answer clicked, 10secs deducted');
            //plays incorrect noise
            incorrectSound.currentTime= 0; //stops sound and rewinds back to beginning so if you click quickly on 2 consecutive wrong answers, you hear the sound twice
            incorrectSound.play();
            // if user clicks wrong answer - change feedback text to 'Wrong' 
            feedback.textContent = 'Wrong';
            //and remove 10secs from timer
            startingTime = startingTime - 10;
        }

        //removes the 'hide' class from feedback so it's visable
        feedback.setAttribute('class', 'feedback');

        //after 3 secs - adds the 'hide' class to feedback so it disappears 
        let removeFeedback = setTimeout(() => {
            feedback.setAttribute('class', 'feedback hide');
        }, 3000);
        
        //currentQuestionIndex++ updates the question and button content to the next one in the questionsArray
        currentQuestionIndex++;
 
        if(currentQuestionIndex === questionsArray.length){
            return;
        }else{
            //renderQuestion() renders the next question & answers from the questionsArray because currentQuestionIndex has increased
            renderQuestion();
            
        }
    }
});