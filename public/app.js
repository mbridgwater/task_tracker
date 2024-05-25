import Card from "./card.js";
import Mover from "./mover.js";
import ImportTextFile from "./drop_file.js"
import LightDarkMode from "./light_dark_mode.js"

export default class App {
  constructor() {

    this.mover = new Mover();
    this.lightDarkMode = new LightDarkMode();
    
    const addCardEvent = (event) => {   // ??? is this needed or could it just have been a call to addCard (ie could i get rid of addCardEvent?)
      const titleInput = document.getElementById("cardTitle");
      const colorInput = document.getElementById("cardColor");
      // event.preventDefault(); // ??? HERE OR AT END???
      
      this.addCard("todo", titleInput.value, colorInput.value); // defaulted to add to "todo" section
      document.getElementById("addCard").reset();
      event.preventDefault();
    }

    document.getElementById("addCard").addEventListener("submit", addCardEvent);  // handle it as a form submit, not a button click for validation reasons

    // const card1Content = localStorage.setItem('itemName','stringContent');
    console.log("this IS: ");
    console.log(this);
    // window.localStorage.removeItem("cards");   // TO REMOVE CARDS
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    this.displayCards(cards);
  }

  /* addCard adds a new card to the task board by creating the card object and then calling card member functions */
  addCard(col, title, color) {
    console.log("ENTERING");
    this.mover.stopMoving();

    const card = new Card(title, color, col);
    
    card.setDescription(""); // ??? should we call this here or in the card constructor
    
    // (4) The card is added to the bottom of the todo column 
    const colElem = document.getElementById(col);
    card.addToCol(colElem, this.mover); // For now, you can ignore the mover argument (pass null when calling it)
    
    new ImportTextFile(card);

    console.log("--in addCard, at end, card is: --")
    console.log(card);
    console.log("LOCALLY STORED: ");
    this.saveCardToLocal(card);
    console.log(window.localStorage.getItem('cards'));
    // window.localStorage.setItem('card', JSON.stringify(card));
    // console.log(window.localStorage.getItem('card'));
    // this.displayCards(cards);
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
    console.log("cols");
    console.log(cols);

    cards.forEach(card => {
      // console.log("card.col");
      // console.log(card.col);
      // console.log("BEFORE: cols[card.col]");
      // console.log(cols[card.col]);
      // console.log("!cols[card.col]");
      // console.log(!cols[card.col]);
      if (!cols[card.col]) {
        cols[card.col] = [];
      }
      cols[card.col].push(card);
      console.log("AFTER: cols[card.col]");
      console.log(cols[card.col]);
    })

  }
}
