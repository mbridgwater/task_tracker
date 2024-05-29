/* The text to use when description is empty */
const NO_DESCRIPTION_TEXT = "(No description)";
import colorNameToHex from "./getColorHex.js"

export default class Card {
  constructor(title, color, col, description, id, position) {
    const template_obj = document.getElementsByClassName("template card");
    let clone = template_obj[0].cloneNode(true); // If true, then the node and its whole subtree, including text that may be in child Text nodes, is also copied.

    clone.className = "card";
    clone.style.backgroundColor = color;
    const hexColor = colorNameToHex(color); // takes a hex color or predefined css color and converts to hex
    /* detect how dark the color is */
    const r = parseInt(hexColor.substr(1,2), 16);
    const g = parseInt(hexColor.substr(3,2), 16);
    const b = parseInt(hexColor.substr(5,2), 16);

    if ((r*0.299 + g*0.587 + b*0.114) <= 128) {   // source: https://en.wikipedia.org/wiki/Relative_luminance
      clone.style.color = "white";
      const imgList = clone.getElementsByTagName("img");
      for (let i = 0; i < imgList.length; i++) {
        clone.getElementsByTagName("img")[i].className = "white-filter";
      }
    }
    clone.getElementsByClassName("title")[0].innerText = title; // ??? should this go here or somehwere else? better way to do this?
    clone.setAttribute("id", id);
    this.title = title;
    this.color = hexColor;
    this.htmlClone = clone;
    this.id = id;  // Unique ID
    this.col = col;
    this.description = description;
    this.position = position;
    this.setDescription(description);
    

    // get card buttons
    const editButton = this.htmlClone.getElementsByClassName("edit")[0];
    const startMoveButton = this.htmlClone.getElementsByClassName("startMove")[0];
    
    let textArea = this.htmlClone.getElementsByTagName("textarea")[0];

    const fillDescription = () => { /* ! ??? do i need to specify event here even if im not using it? linter yelled at me when i had it */
      this.setDescription(textArea.value);
      this.updateLocalStorageDescription(this);  // If we update description, need this to update in local storage
      textArea.className = "editDescription hidden";
      this.htmlClone.getElementsByClassName("description hidden")[0].className = "description";
    }


    editButton.addEventListener("click", () => { this.editCard(textArea); }); // this a good way to set this up? /* ! ??? do i need to specify event here even if im not using it? linter yelled at me when i had it */
    textArea.addEventListener("blur", fillDescription);
    // deleteButton.addEventListener("click", deleteCard); // ??? what is the benefit to having this as a member fxn like above or not like here
    startMoveButton.addEventListener("click", () => { this.mover.startMoving(this); });  // ??? why does it strike thru event when i start writing it? is this method deprecated?
    // ! REMOVE ALL this.mover instances
  }

  addToCol(colElem, mover) {
    colElem.appendChild(this.htmlClone);
    this.mover = mover;


    const deleteButton = this.htmlClone.getElementsByClassName("delete")[0];
    const deleteCard = () => {   // ?? is there a way to make this a member function that would be better? Are all event listeners & handlers supposed to be in constructor (seems cluttered)? 
      mover.stopMoving();  // when delete a card, don't want to be moving
      this.htmlClone.remove();
      let cards = JSON.parse(window.localStorage.getItem('cards')) || [];
      const existingCardIndex = cards.findIndex(c => c.id === this.id); /* see if the card alr exists */
      const ogCardPosition = cards[existingCardIndex].position;
      const ogCardCol = cards[existingCardIndex].col;
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].col === ogCardCol) {
          if (cards[i].position > ogCardPosition) {
            cards[i].position--;
          }
        }
      }
      cards.splice(existingCardIndex, 1);  // to remove card from cards
      window.localStorage.setItem('cards', JSON.stringify(cards));

      delete this;
    }
    deleteButton.addEventListener("click", deleteCard); // ??? what is the benefit to having this as a member fxn like above or not like here
    

  }

  editCard(textArea) {
    // hide current discription
    this.htmlClone.getElementsByClassName("description")[0].className = "description hidden";  // ??? best to put both classes here?
    // show <textarea> to let user enter a new description and focus is, 
    textArea.className = "editDescription";
    textArea.focus();
    textArea.select();
  }

  setDescription(text) {
    let descriptionBox = this.htmlClone.getElementsByClassName("description")[0];
    let editDescriptionBox = this.htmlClone.getElementsByClassName("editDescription")[0];
    
    if (text === "") {
      descriptionBox.innerText = NO_DESCRIPTION_TEXT;
      editDescriptionBox.innerText = ""; // set default for edit text box to current description
    }
    else {
      descriptionBox.innerText = text;
      editDescriptionBox.innerText = text; // set default for edit text box to current description
    }
    this.description = text;
  }

  getHexColor(rgb_color) {
    if (rgb_color.substr(0, 1) === '#') {
        return rgb_color;
    }
    const digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(rgb_color);
    
    const red = parseInt(digits[2]);
    const green = parseInt(digits[3]);
    const blue = parseInt(digits[4]);
    
    const rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16).padStart(6, '0');
  }

  updateLocalStorageDescription(card) {
    /* THIS IS ONLY FOR UPDATING THE CARD DESCRIPTION */
    let cards = JSON.parse(window.localStorage.getItem('cards')) || [];  /* get cards that are already stored, shouldn't need || [] bc for stopMoving to be called, some cards must exist, but can add it as safegaurd */
    const existingCardIndex = cards.findIndex(c => c.id === card.id); /* see if the card alr exists */

    if (existingCardIndex !== -1) { 
      cards[existingCardIndex].description = card.description;  // so that this makes the update for the description
    } 
    else {
      // WE SHOULD NEVER GO INTO THIS
      // console.log("HERE? THIS IS A PROBLEM, YOU SHOULD NOT BE ENTERING THIS!!!!!!")
    }
    window.localStorage.setItem('cards', JSON.stringify(cards));
  }
}


