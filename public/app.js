import Card from "./card.js";
import Mover from "./mover.js";

// const NO_DESCRIPTION_TEXT = "(No description)"; // ??? should i have this here as well as in card.js?

export default class App {
  constructor() {
    console.log("enter App constructor")
    
    const addCardEvent = (event) => {
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

    // const submitForm = (event) => { event.preventDefault(); }
    
    //document.getElementById("addButton").addEventListener("click", addCardEvent.bind(this));  // bind this to make addCard is accessible
    //document.getElementById("addButton").addEventListener("click", addCardEvent);  // make anonymous fxn so that this is binded to class and not fxn
    document.getElementById("addCard").addEventListener("submit", addCardEvent);  // handle it as a form submit, not a button click for validation reasons
    
  }

  addCard(col, title, color) {
    //TODO
    console.log("--entering addCard--");
    // (1) duplicate template card defined at end of HTML --> done in card

    // (2) Set the card's title and color as passed in. Title will never be empty. Must use a HTML5 color picker.
    const newCard = new Card(title, color);
    
    // (3) The empty description in the card should by default say "(No description)".
    newCard.setDescription(""); // ??? should we call this here or in the card constructor
    
    // (4) The card is added to the bottom of the column --> call addToCol(colElem, mover)
    const colElem = document.getElementById(col);
    newCard.addToCol(colElem, null); // For now, you can ignore the mover argument (pass null when calling it)
    
    console.log("newCard is ")
    console.log(newCard)
    return newCard;
  }

  //TODO
  
}
