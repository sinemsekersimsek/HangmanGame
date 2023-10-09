const wordEl = document.getElementById('word');
const popup = document.getElementById('popup-container')
const messageEL = document.getElementById('success-message')
const wrongLettersEl = document.getElementById('wrong-letters')
const items = document.querySelectorAll('.item')
const warningEl = document.getElementById('message')
const playagainBtn=document.getElementById('play-again')

const correctLetters = [];
const wrongLetters = [];

const getRandomWord = () => {
const words = ["norway", "france", "turkey", "sweden"];
    return words[Math.floor(Math.random() * words.length)];
}
let selectedWord = getRandomWord()

const displayWord = () => {


    wordEl.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </div>`
    ).join('')}
       
    `;

    const w = wordEl.innerText.replace(/\n/g, '')

    if (w === selectedWord) {
        popup.style.display = 'flex';
        messageEL.innerHTML = 'Congratulations You Won';
    }
}


const updateWrongLetters = () => {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<h3>Wrong Letters</h3>' : ''}
    ${wrongLetters.map(letter => `<span class='wrongletter'>${letter}</span>`)}
    `
    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;
        if (index < errorCount) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    if(wrongLetters.length === items.length){
        popup.style.display = 'flex';
        messageEL.innerHTML = 'Sorry You Lost';
    }
}

function displayMessage(){
    warningEl.classList.add('show');

    setTimeout(function(){
        warningEl.classList.remove('show')
    },2000);
}

playagainBtn.addEventListener('click',function(){

    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popup.style.display = "none";

})

window.addEventListener('keydown', (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key.toLowerCase();
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord()
            } else {
                displayMessage()
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                displayWord()
                updateWrongLetters()
            } else {
                updateWrongLetters()
                displayMessage()
            }
        }
    }

})


displayWord()