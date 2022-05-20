const GAME_TIME = 10;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let wordList = [];
let randomIndex;

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const timeDisplay = document.querySelector('.time')
const scoreDisplay = document.querySelector('.score');
const button = document.querySelector('.button ');

//단어 API 호출
function getWords() {
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
        .then(function (response) {
            response.data.forEach((word) => {
                if(word.length < 10) {
                    wordList.push(word);
                }
            })
            buttonChange('게임시작');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}

//게임 실행
function gamePlay() {
    if(isPlaying) return;
    isPlaying = true;
    randomIndex = Math.floor(Math.random() * wordList.length);
    wordDisplay.innerText = wordList[randomIndex];
    timeDisplay.innerText = GAME_TIME;
    time = GAME_TIME;
    score = 0;
    scoreDisplay.innerText = 0;
    wordInput.value = "";
    timeInterval = setInterval(countDown, 1000);
    buttonChange('게임중');
    wordInput.focus();
    checkInterval = setInterval(checkStatus, 50);

}

//카운트 다운
function countDown() {
    time > 0 ? time-- : isPlaying = false;
    timeDisplay.innerText = time;
    if(!isPlaying) {
        clearInterval(timeInterval);
    }
}

//게임 진행 상태 확인_게임이 종료되면
function checkStatus() {
    if(!isPlaying && time === 0) {
        alert('게임이 종료되었습니다.')
        buttonChange('게임시작');
        clearInterval(checkInterval);
        isPlaying = false;
    }
}

// 단어 일치여부 체크 후 점수 등록
function checkMatch() {
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        randomIndex = Math.floor(Math.random() * wordList.length);
        wordInput.value = "";
        if(!isPlaying) return;
        score++;
        scoreDisplay.innerText = score;
        wordDisplay.innerText = wordList[randomIndex];
    }
}

function buttonChange(text) {
    button.innerText = text;
    text === '게임시작' ?  button.classList.remove('loading') : button.classList.add('loading');
}

wordInput.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        checkMatch();
    }
})

function init() {
    getWords();
    buttonChange('게임시작');
}
init();
