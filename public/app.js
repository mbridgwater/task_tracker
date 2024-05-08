import Card from "./card.js";
import Mover from "./mover.js";

// const NO_DESCRIPTION_TEXT = "(No description)"; // ??? should i have this here as well as in card.js?

export default class App {
  constructor() {
    console.log("enter App constructor")

    this.mover = new Mover();
    
    const addCardEvent = (event) => {   // ??? is this needed or could it just have been a call to addCard (ie could i get rid of addCardEvent?)
      console.log("--entering event handler--")

      const titleInput = document.getElementById("cardTitle");
      const colorInput = document.getElementById("cardColor");

      this.addCard("todo", titleInput.value, colorInput.value); // defaulted to add to "todo" section
      document.getElementById("addCard").reset();
      event.preventDefault();
    }

    document.getElementById("addCard").addEventListener("submit", addCardEvent);  // handle it as a form submit, not a button click for validation reasons

  }

  addCard(col, title, color) {
    console.log("--entering addCard--");
    this.mover.stopMoving();

    // (2) Set the card's title and color as passed in. Title will never be empty. Must use a HTML5 color picker.
    const card = new Card(title, color);

    // (3) The empty description in the card should by default say "(No description)".
    card.setDescription(""); // ??? should we call this here or in the card constructor
    
    // (4) The card is added to the bottom of the column --> call addToCol(colElem, mover)
    const colElem = document.getElementById(col);
    card.addToCol(colElem, this.mover); // For now, you can ignore the mover argument (pass null when calling it)
    
    console.log("card is ")
    console.log(card)
    return card;
  }

  //TODO
  
}
