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
      this.addCard("todo", titleInput.value, colorInput.value); // defaulted to add to "todo" section
      document.getElementById("addCard").reset();
      event.preventDefault();
    }

    document.getElementById("addCard").addEventListener("submit", addCardEvent);  // handle it as a form submit, not a button click for validation reasons

    // const card1Content = localStorage.setItem('itemName','stringContent');
    console.log("this IS: ");
    console.log(this);

  }

  /* addCard adds a new card to the task board by creating the card object and then calling card member functions */
  addCard(col, title, color) {
    this.mover.stopMoving();

    const card = new Card(title, color);
    
    card.setDescription(""); // ??? should we call this here or in the card constructor
    
    // (4) The card is added to the bottom of the todo column 
    const colElem = document.getElementById(col);
    card.addToCol(colElem, this.mover); // For now, you can ignore the mover argument (pass null when calling it)
    
    new ImportTextFile(card);

    return card;
  }

  
}
