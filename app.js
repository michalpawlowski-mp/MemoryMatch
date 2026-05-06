const TECHS = [
  {
    name: "HTML",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "React",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "TypeScript",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Vite",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
  },
  {
    name: "Git",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Tailwind",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let isGameOver = false;

const grid = document.getElementById("grid");
const movesElement = document.getElementById("moves");
const winMessage = document.getElementById("winMessage");
const finalMoves = document.getElementById("finalMoves");

function createCards() {
  cards = [...TECHS, ...TECHS];

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

function createCardElement(tech, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">❓</div>
                    <div class="card-back">
                        <img src="${tech.img}" alt="${tech.name}">
                    </div>
                </div>
            `;

  card.addEventListener("click", () => flipCard(card));
  return card;
}

function flipCard(card) {
  if (
    isGameOver ||
    flippedCards.length === 2 ||
    card.classList.contains("flipped") ||
    card.classList.contains("matched")
  ) {
    return;
  }

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesElement.textContent = moves;
    checkForMatch();
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;
  const img1 = card1.querySelector("img").src;
  const img2 = card2.querySelector("img").src;

  if (img1 === img2) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedPairs++;

    flippedCards = [];

    if (matchedPairs === TECHS.length) {
      setTimeout(endGame, 600);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 1100);
  }
}

function endGame() {
  isGameOver = true;
  finalMoves.textContent = moves;
  winMessage.style.display = "flex";
}

function resetGame() {
  grid.innerHTML = "";
  flippedCards = [];
  matchedPairs = 0;
  moves = 0;
  isGameOver = false;

  movesElement.textContent = "0";
  winMessage.style.display = "none";

  createCards();

  cards.forEach((tech, index) => {
    const cardElement = createCardElement(tech, index);
    grid.appendChild(cardElement);
  });
}

resetGame();
