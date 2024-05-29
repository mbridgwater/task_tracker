import Card from "./card.js";
import Mover from "./mover.js";
import ImportTextFile from "./drop_file.js"
import LightDarkMode from "./light_dark_mode.js"
// import socketUpdater from "./updater.js";

export default class App {
  constructor() {
    let cards = JSON.parse(localStorage.getItem('cards')) || [];
    window.localStorage.setItem('cards', JSON.stringify(cards));

    this.mover = new Mover();
    this.lightDarkMode = new LightDarkMode();
    
    const addCardEvent = (event) => {
      const titleInput = document.getElementById("cardTitle");
      const colorInput = document.getElementById("cardColor");
      event.preventDefault();
      
      this.addCard("todo", titleInput.value, colorInput.value); // defaulted to add to "todo" section
      document.getElementById("addCard").reset();
      event.preventDefault();
    }

    document.getElementById("addCard").addEventListener("submit", addCardEvent);  // handle it as a form submit, not a button click for validation reasons
    // window.localStorage.removeItem("cards");   // TO REMOVE CARDS
    this.displayCards(cards);
    
  }

  /* addCard adds a new card to the task board by creating the card object and then calling card member functions */
  addCard(col, title, color) {
    this.mover.stopMoving();
    const cardPosition = document.querySelector('#todo').querySelectorAll('.card').length;  // starting with index zero, this sets the position for the next card based on how many cards currently in "todo" column 
    const card = new Card(title, color, col, "", `card${Date.now()}`, cardPosition);
    
    
    // (4) The card is added to the bottom of the todo column 
    const colElem = document.getElementById(col);
    card.addToCol(colElem, this.mover); // For now, you can ignore the mover argument (pass null when calling it)
    
    new ImportTextFile(card);

    this.saveCardToLocal(card);
    return card;
  }

  saveCardToLocal(card) {
    let cards = JSON.parse(window.localStorage.getItem('cards')) || [];  /* get cards that are already stored */
    const existingCardIndex = cards.findIndex(c => c.id === card.id); /* see if the card alr exists */
    if (existingCardIndex !== -1) {
      cards[existingCardIndex] = card;
    } 
    else {
      cards.push(card);
    }
    window.localStorage.setItem('cards', JSON.stringify(cards)); 
  }

  displayCards(cards) {
    let cols = {};
    
    cards.forEach(card => {
      if (!cols[card.col]) {  // if the curr cards column does not already exist in the cols map 
        cols[card.col] = [];
      }
      cols[card.col].push(card);  // push the card to the corresponding column
    })
    /* ??? cols has weird functionality - why is this? */

    for (const currCol in cols) {
      cols[currCol].sort((a, b) => a.position - b.position);
    }

    /* Append cards to correct columns  */
    for(const column in cols) {
      const colElem = document.getElementById(column);
      const cardsInColArr = cols[column];
      for (let i = 0; i < cardsInColArr.length; i++) {
        const new_card = new Card(cardsInColArr[i].title, cardsInColArr[i].color, cardsInColArr[i].col, cardsInColArr[i].description, cardsInColArr[i].id);  // make sure its fine that they get a new id
        new_card.addToCol(colElem, this.mover); // For now, you can ignore the mover argument (pass null when calling it)
      }
    }

  }
}
