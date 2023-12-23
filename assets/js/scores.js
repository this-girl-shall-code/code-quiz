let highscores = document.getElementById('highscores');
let clearHightscores = document.getElementById('clear');

let storedHighscore = JSON.parse(localStorage.getItem('highscore'));

function renderHighscores(){
    if(!storedHighscore){
        return;
    }else{
        for(let i = 0; i < storedHighscore.length; i++){
            let storedHighscores = storedHighscore[i];

            let li = document.createElement('li');
            li.textContent = storedHighscores;
            highscores.appendChild(li);
        }
    };
};

renderHighscores();

clearHightscores.addEventListener('click', () => {
    highscores.remove();
    localStorage.clear();
});

