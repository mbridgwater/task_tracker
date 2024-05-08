/* The text to use when description is empty */
const NO_DESCRIPTION_TEXT = "(No description)";

// ! ??? Should every function have a return in JS?

export default class Card {
  constructor(title, color) {
    console.log("Entering Card Constructor")
    const template_obj = document.getElementsByClassName("template card");  // ??? const or let best here? // document.querySelector(".template card") ??
    let clone = template_obj[0].cloneNode(true); // If true, then the node and its whole subtree, including text that may be in child Text nodes, is also copied.

    clone.className = "card"; // ! need to fix this for the className
    clone.style.backgroundColor = color;  // ! this allowed? bc above wouldnt work right
    clone.childNodes[1].innerText = title; // ??? should this go here or somehwere else? better way to do this?
    this.title = title;
    this.color = color;
    this.htmlClone = clone;
    //this.prevCard = undefined;

    // get card buttons
    const editButton = this.htmlClone.childNodes[7].childNodes[1];  // ! ??? is it bad that im using the child nodes much for accessing the template components
    const startMoveButton = this.htmlClone.childNodes[7].childNodes[3];
    const deleteButton = this.htmlClone.childNodes[7].childNodes[5];
    

    const deleteCard = (event) => {   // ?? is there a way to make this a member function that would be better? Are all event listeners & handlers supposed to be in constructor (seems cluttered)? 
      this.mover.stopMoving();  // when delete a card, don't want to be moving
      console.log("--entering deleteCard--");
      this.htmlClone.remove();
      delete this;
    }

    let textArea = this.htmlClone.childNodes[5];

    const fillDescription = (event) => {
      this.setDescription(textArea.value);
      textArea.className = "editDescription hidden";
      this.htmlClone.childNodes[3].className = "description";
    }

    const dragCard = (event) => {
      // if (this.prevCard !== this) {
      //   this.prevCard = this;
      //   console.log("SWITCH!!!!!!!!");
      //   console.log(this.prevCard);
      // }
      console.log("DRAGGING");

    }

    // ??? does spacing (2 spaces v 4 spaces) matter for tabs?
    
    
    editButton.addEventListener("click", (event) => { this.editCard(textArea); }); // this a good way to set this up?
    textArea.addEventListener("blur", fillDescription);
    // textArea.addEventListener("click", fillDescription); // !!! REPLACE W ABOVE AFTER CSS
    deleteButton.addEventListener("click", deleteCard); // ??? what is the benefit to having this as a member fxn like above or not like here
    startMoveButton.addEventListener("click", (event) => { this.mover.startMoving(this); });  // ??? why does it strike thru event when i start writing it? is this method deprecated?
    console.log("LOOK HERE !!!!! this.htmlClone");
    console.log(this.htmlClone);
    
    this.htmlClone.addEventListener("dragstart", dragCard);

  }

  addToCol(colElem, mover) {
    console.log("entering addToCol");
    colElem.appendChild(this.htmlClone);
    this.mover = mover;   // ! storing for later use

  }

  editCard(textArea) {
    console.log("--entering editCard()--");
    // hide current discription
    this.htmlClone.childNodes[3].className = "description hidden";  // ??? best to put both classes here?
    // show <textarea> to let user enter a new description and focus is, // this.htmlClone.childNodes[5] is text area
    // const textArea = this.htmlClone.childNodes[5];
    textArea.className = "editDescription";
    textArea.focus();
    textArea.select();

    // ??? when user clicks (anywhere?) or tabs away from text box -- ASSUMPTION MADE: when user clicks textArea

    
    
  }

  setDescription(text) {
    // DONE? --> set a card's description. If card ever empty, should say "(No description)" 
    // ??? not sure if accessing right here - is this best to use? is childNodes[3] always gonna work?
    console.log("entering setDescription");

    if (text === "") {
      this.htmlClone.childNodes[3].innerText = NO_DESCRIPTION_TEXT;
      this.htmlClone.childNodes[5].innerText = ""; // set default for edit text box to current description
    }
    else {
      this.htmlClone.childNodes[3].innerText = text;
      this.htmlClone.childNodes[5].innerText = text; // set default for edit text box to current description
    }
    // console.log(this.htmlClone);
  }

  //TODO
}
