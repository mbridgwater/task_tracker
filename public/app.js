import Card from "./card.js";
import Mover from "./mover.js";

// const NO_DESCRIPTION_TEXT = "(No description)"; // ??? should i have this here as well as in card.js?

export default class App {
  constructor() {
    console.log("enter App constructor")

    this.mover = new Mover();
    
    const addCardEvent = (event) => {   // ??? is this needed or could it just have been a call to addCard (ie could i get rid of addCardEvent?)
      console.log("--entering event handler--")
      console.log("MY INPUTS: ");
      const titleInput = document.getElementById("cardTitle");
      const colorInput = document.getElementById("cardColor");
      console.log(titleInput.value);
      console.log(colorInput.value);
      // const titVal = titleInput.value;
      // const colVal = colorInput.value;
      this.addCard("todo", titleInput.value, colorInput.value); // defaulted to add to "todo" section
      document.getElementById("addCard").reset();
      event.preventDefault();
    }

    //document.getElementById("addButton").addEventListener("click", addCardEvent.bind(this));  // bind this to make addCard is accessible
    //document.getElementById("addButton").addEventListener("click", addCardEvent);  // make anonymous fxn so that this is binded to class and not fxn
    document.getElementById("addCard").addEventListener("submit", addCardEvent);  // handle it as a form submit, not a button click for validation reasons
    // console.log("LOOK HERE!!!!!!!");
    // console.log(this);
  }

  addCard(col, title, color) {
    console.log("--entering addCard--");
    // (1) duplicate template card defined at end of HTML --> done in card

    // (2) Set the card's title and color as passed in. Title will never be empty. Must use a HTML5 color picker.
    const card = new Card(title, color);
    // this.mover.m_card = card;    
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
