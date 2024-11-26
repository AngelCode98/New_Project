
// Variables globales
let board = document.getElementById("memory-board");
let attemptsDisplay = document.querySelector(".attempts");
let timerDisplay = document.querySelector(".timer");
let resultMessage = document.getElementById("result-message");
let retryBtn = document.getElementById("retry-btn");

let cards = [];
let flippedCards = [];
let attempts = 0;
let timer = 60;
let gameInterval;
let flipInterval;

const cardImages = [
    './img/realismo_1.png', "./img/anime_2.png", "./img/anime_3.png", "./img/anime_4.png", "./img/famosos_1.png", "./img/famosos_2.png", "./img/famosos_3.png", "./img/cultura_4.png"
];

function shuffleCards() {
    let allCards = [...cardImages, ...cardImages]; // Duplica esta mondá de imágenes
    allCards.sort(() => Math.random() - 0.5); // Barajando random ando
    return allCards;
}

function createBoard() {
    let shuffledCards = shuffleCards();
    shuffledCards.forEach(image => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.image = image;
        card.style.backgroundImage = "url('./img/card_back.png')";
        card.addEventListener("click", flipCard);
        board.appendChild(card);
        cards.push(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.style.backgroundImage = `url('./img/${this.dataset.image}')`; // El pinche misterio
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            attempts++;
            attemptsDisplay.textContent = `Intentos: ${attempts}`;

            if (flippedCards[0].dataset.image === flippedCards[1].dataset.image) {
                flippedCards = [];
                checkWin();
            } else {
                flipInterval = setTimeout(() => {
                    flippedCards.forEach(card => card.style.backgroundImage = "url('./img/card_back.png')");
                    flippedCards.forEach(card => card.classList.remove("flipped"));
                    flippedCards = [];
                }, 1000);
            }
        }
    }
}

function checkWin() {
    if (cards.every(card => card.classList.contains("flipped"))) {
        clearInterval(gameInterval);
        resultMessage.textContent = `¡Felicidades! Has ganado en ${attempts} intentos.`;
        resultMessage.classList.remove("hidden");
        retryBtn.classList.remove("hidden");
    }
}

function startTimer() {
    gameInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
            timerDisplay.textContent = `Tiempo: ${timer}`;
        } else {
            clearInterval(gameInterval);
            resultMessage.textContent = "Tiempo agotado. ¡Intenta de nuevo!";
            resultMessage.classList.remove("hidden");
            retryBtn.classList.remove("hidden");
        }
    }, 1000);
}

function resetGame() {
    board.innerHTML = "";
    cards = [];
    flippedCards = [];
    attempts = 0;
    timer = 60;
    attemptsDisplay.textContent = `Intentos: ${attempts}`;
    timerDisplay.textContent = `Tiempo: ${timer}`;
    resultMessage.classList.add("hidden");
    retryBtn.classList.add("hidden");
    createBoard();
    startTimer();
}

// La del ingeniero "Reinicie"
retryBtn.addEventListener("click", resetGame);

// y aquí vamos de nuevo
resetGame();
