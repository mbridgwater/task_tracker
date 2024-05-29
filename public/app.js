import Card from "./card.js";
import Mover from "./mover.js";
import ImportTextFile from "./drop_file.js"
import LightDarkMode from "./light_dark_mode.js"

export default class App {
  constructor() {
    console.log("----entering App Constructor----");
    let cards = JSON.parse(localStorage.getItem('cards')) || [];
    window.localStorage.setItem('cards', JSON.stringify(cards));
    console.log("cards immediately is: ", cards);

    this.mover = new Mover();
    this.lightDarkMode = new LightDarkMode();
    
    const addCardEvent = (event) => {   // ??? is this needed or could it just have been a call to addCard (ie could i get rid of addCardEvent?)
      console.log("----entering addCardEvent----");
      const titleInput = document.getElementById("cardTitle");
      const colorInput = document.getElementById("cardColor");
      event.preventDefault(); // ??? HERE OR AT END???
      
      this.addCard("todo", titleInput.value, colorInput.value); // defaulted to add to "todo" section
      document.getElementById("addCard").reset();    // !!! ??? wb warning: The specified value "" does not conform to the required format.  The format is "#rrggbb" where rr, gg, bb are two-digit hexadecimal numbers
      event.preventDefault();
    }

    document.getElementById("addCard").addEventListener("submit", addCardEvent);  // handle it as a form submit, not a button click for validation reasons

    // const card1Content = localStorage.setItem('itemName','stringContent');
    console.log("this IS: ");
    console.log(this);
    // window.localStorage.removeItem("cards");   // TO REMOVE CARDS
    // let cards = JSON.parse(localStorage.getItem('cards')) || [];
    // window.localStorage.setItem('cards', JSON.stringify(cards));
    this.displayCards(cards);
    
  }

  /* addCard adds a new card to the task board by creating the card object and then calling card member functions */
  addCard(col, title, color) {
    console.log("----entering addCard(col, title, color)----");
    this.mover.stopMoving();
    const cardPosition = document.querySelector('#todo').querySelectorAll('.card').length;  // starting with index zero, this sets the position for the next card based on how many cards currently in "todo" column 
    const card = new Card(title, color, col, "", `card${Date.now()}`, cardPosition);
    
    // card.setDescription(""); // ??? should we call this here or in the card constructor
    
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

  // !!! NEED TO MAKE IT WORK FOR WHEN WE DELETE CARDS

  saveCardToLocal(card) {
    console.log("----entering saveCardToLocal(card)----")
    let cards = JSON.parse(window.localStorage.getItem('cards')) || [];  /* get cards that are already stored */
    const existingCardIndex = cards.findIndex(c => c.id === card.id); /* see if the card alr exists */
    // console.log("card", card);
    if (existingCardIndex !== -1) {
      cards[existingCardIndex] = card;
    } 
    else {
      cards.push(card);
    }
    // console.log("cards[existingCardIndex]", cards[existingCardIndex]);
    console.log("cards", cards);
    window.localStorage.setItem('cards', JSON.stringify(cards)); 
    /*
    function(key, value) {
    if (typeof value === "object" && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  }
    
    */
  }

  displayCards(cards) {
    console.log("----entering displayCards(card)----");
    // let cols2 = [[], [], []]
    let cols = {};
    // cols dict of the form: {col1: [card1i, ...], col2: [card1j, ...], col3: [card1k, ...]} with at most all three columns (todo, doing, done)
    // console.log("cols2");
    // console.log(cols);
    // console.log(cols2);
    console.log("ON RELOAD, cards is: ", cards);
/*    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      // console.log("card.col");
      // console.log(card.col);
      if (card.col === "todo") {
        // cols2[0].splice(card.position, 0, card);
        cols2[0].push(card);

      }
      else if (card.col === "doing") {
        cols2[1].splice(card.position, 0, card);
      }
      else if (card.col === "done") {
        cols2[2].splice(card.position, 0, card);
      }
      console.log("cols2");
      console.log(cols2);
      // console.log("card: ", card)
      // if (!cols[card.col]) {  // if the curr cards column does not already exist in the cols map 
      //   cols[card.col] = [];
      // }
      // cols[card.col].push(card); // insert the card are the index corresponding to position
      // console.log("AFTER: cols[card.col]");
      // console.log(cols[card.col]);
      // console.log("cols in for loop: ");
      // console.log(cols);
    } */
    
    cards.forEach(card => {
      // console.log("card.col");
      // console.log(card.col);
      console.log("card is ", card);
      console.log("cols is ", cols);
      // console.log("BEFORE: cols[card.col]");
      // console.log(cols[card.col]);
      // console.log("!cols[card.col]");
      // console.log(!cols[card.col]);
      if (!cols[card.col]) {  // if the curr cards column does not already exist in the cols map 
        cols[card.col] = [];
      }
      cols[card.col].push(card);  // push the card to the corresponding column 
      // cols[card.col].splice(card.position, 0, card); // insert the card are the index corresponding to position
      // console.log("AFTER: cols[card.col]");
      // console.log(cols[card.col]);
      console.log("AFTER: cols: ", cols)
    })
    // console.log("cols: ", cols)
    // console.log("cols2: ", cols2);

    // !!! MAY NEED TO DO SORTING 
    for (const currCol in cols) {
      cols[currCol].sort((a, b) => a.position - b.position);
    }

    /* Append cards to correct columns  */
    for(const column in cols) {
      // const colNames = ["todo", "doing", "done"];
      const colElem = document.getElementById(column);
      const cardsInColArr = cols[column];
      for (let i = 0; i < cardsInColArr.length; i++) {
        // console.log("cardsInColArr[i]", cardsInColArr[i]);
        // console.log("cardsInColArr[i].htmlClone", cardsInColArr[i].htmlClone);
        // const template_obj = document.getElementsByClassName("template card");
        const new_card = new Card(cardsInColArr[i].title, cardsInColArr[i].color, cardsInColArr[i].col, cardsInColArr[i].description, cardsInColArr[i].id);  // make sure its fine that they get a new id
        // new_card.setDescription("");
        new_card.addToCol(colElem, this.mover); // For now, you can ignore the mover argument (pass null when calling it)


        // colElem.appendChild(cardsInColArr[i].htmlClone);
      }
    }

  }
}
