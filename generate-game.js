let countCorrect = 0;
const section = document.getElementById("game");
const getImages = () => [
  { src: "./images/Fish.jpg", name: "Fish" },
  { src: "./images/Draw.jpg", name: "Draw" },
  { src: "./images/Crowd.jpg", name: "Crowd" },
  { src: "./images/Cat.jpg", name: "Cat" },
  { src: "./images/Moon.jpg", name: "Moon" },
  { src: "./images/Light.jpg", name: "Light" },
  { src: "./images/IronMan.jpg", name: "IronMan" },
  { src: "./images/Flowers.jpg", name: "Flowers" },
  { src: "./images/Tokyo.jpg", name: "Tokyo" },
  { src: "./images/Puppy.jpg", name: "Puppy" },
  { src: "./images/Rain.jpg", name: "Rain" },
  { src: "./images/Stars.jpg", name: "Stars" },
];

let lightOn = new Audio("./Audio/LightOn.mp3");
let lightOff = new Audio("./Audio/LightOff.mp3");

// pick only 6 images randomly
const picks6 = () => {
  const cardSrc = getImages();
  const newArr = [];
  for (let i = 0; i < 6; i++) {
    const chosenIndex = Math.floor(Math.random() * cardSrc.length);
    newArr.push(cardSrc[chosenIndex]);
    cardSrc.splice(chosenIndex, 1);
  }
  return newArr;
};
// shufffling
const shuffle = (array) => {
  const cardSrc = [...array];
  for (let i = cardSrc.length - 1; i > 0; i--) {
    const chosenIndex = Math.floor(Math.random() * (i + 1));
    const original = cardSrc[i];
    cardSrc[i] = cardSrc[chosenIndex];
    cardSrc[chosenIndex] = original;
  }
  return cardSrc;
};
// generate our cards and start game
const startGame = (array) => {
  const cardSrc = [...array];
  cardSrc.forEach((item) => {
    const card = document.createElement("div");
    const front = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    front.classList = "front";
    back.classList = "back";
    front.src = item.src;
    card.setAttribute("name", item.name);
    card.setAttribute("alt", item.name);
    section.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
    // add click listener to each card
    card.addEventListener("click", (event) => {
      // make only unflipped cards clickable ( user cant flippe the card back)
      if (!card.classList.contains("flipped")) {
        card.style.cursor = "default";
        card.classList.toggle("toggle");
        chickForMatch(event);
      }
    });
  });
};
// check if the 2 cards are matches
const chickForMatch = (event) => {
  const clickedCard = event.target;
  clickedCard.classList.add("flipped");
  const allFlippedCards = document.querySelectorAll(".flipped");
  console.log(allFlippedCards);
  if (allFlippedCards.length === 2) {
    if (
      allFlippedCards[0].getAttribute("name") ===
      allFlippedCards[1].getAttribute("name")
    ) {
      allFlippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
        countCorrect++;
      });
    } else {
      allFlippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggle"), 1200);
        card.style.cursor = "pointer";
      });
    }
  }
};
// restart btn will generate everything back (pick random imges and shuffle them again)
const restart = () => {
  if (countCorrect > 0) {
    pickRandom = picks6();
    pickedCards = [...pickRandom, ...pickRandom];
    shuffledCards = shuffle(pickedCards);
    let fronts = document.querySelectorAll(".front");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    shuffledCards.forEach((item, index) => {
      cards[index].classList.remove("toggle");
      setTimeout(() => {
        cards[index].style.pointerEvents = "all";
        fronts[index].src = item.src;
        cards[index].setAttribute("name", item.name);
        section.style.pointerEvents = "all";
      }, 1000);
    });
    countCorrect = 0;
  }
};
// all functions to change color theme based on the switch btn (light mode or dark mode)
const switchBtn = () => {
  // get all elements we need to change
  const switchBtn = document.getElementById("switch");
  const card = document.getElementsByClassName("back");
  const container = document.getElementById("container");
  const game = document.getElementById("game");
  const restartBtn = document.getElementById("restart");
  // add Listener for switch btn
  switchBtn.addEventListener("click", (event) => {
    if (!switchBtn.classList.contains("switch-On-Toggle")) {
      darkMode(switchBtn, card, container, game, restartBtn);
    } else {
      lightMode(switchBtn, card, container, game, restartBtn);
    }
  });
};
// make everything dark
const darkMode = (switchBtn, card, container, game, restartBtn) => {
  lightOn.play();
  switchBtn.classList.remove("switch-Off");
  switchBtn.classList.toggle("switch-On-Toggle");
  for (let i = 0; i < card.length; i++) {
    card[i].classList.toggle("dark-Card");
  }
  container.classList.toggle("dark-Container");
  game.classList.toggle("light-game");
  restartBtn.classList.toggle("restart-light");
};
// light everything up
const lightMode = (switchBtn, card, container, game, restartBtn) => {
  lightOff.play();
  switchBtn.classList.add("switch-Off");
  switchBtn.classList.remove("switch-On-Toggle");
  for (let i = 0; i < card.length; i++) {
    card[i].classList.remove("dark-Card");
  }
  container.classList.remove("dark-Container");
  game.classList.remove("light-game");
  restartBtn.classList.remove("restart-light");
};
// invoke functions
let pickRandom = picks6();
let pickedCards = [...pickRandom, ...pickRandom];
let shuffledCards = shuffle(pickedCards);
startGame(shuffledCards);
switchBtn();
