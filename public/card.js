/* The text to use when description is empty */
const NO_DESCRIPTION_TEXT = "(No description)";

// ! ??? Should every function have a return in JS?

export default class Card {
  constructor(title, color) {
    const template_obj = document.getElementsByClassName("template card");
    let clone = template_obj[0].cloneNode(true); // If true, then the node and its whole subtree, including text that may be in child Text nodes, is also copied.

    clone.className = "card"; // ! need to fix this for the className
    clone.style.backgroundColor = color;
    clone.getElementsByClassName("title")[0].innerText = title; // ??? should this go here or somehwere else? better way to do this?
    this.title = title;
    this.color = color;
    this.htmlClone = clone;

    // get card buttons
    const editButton = this.htmlClone.getElementsByClassName("edit")[0];
    const startMoveButton = this.htmlClone.getElementsByClassName("startMove")[0];
    const deleteButton = this.htmlClone.getElementsByClassName("delete")[0];
    

    const deleteCard = (event) => {   // ?? is there a way to make this a member function that would be better? Are all event listeners & handlers supposed to be in constructor (seems cluttered)? 
      this.mover.stopMoving();  // when delete a card, don't want to be moving
      this.htmlClone.remove();
      delete this;
    }

    let textArea = this.htmlClone.getElementsByTagName("textarea")[0];

    const fillDescription = (event) => {
      this.setDescription(textArea.value);
      textArea.className = "editDescription hidden";
      this.htmlClone.getElementsByClassName("description hidden")[0].className = "description";
    }

    // const dragCard = (event) => {
    //   console.log("DRAGGING");
    // }

    editButton.addEventListener("click", (event) => { this.editCard(textArea); }); // this a good way to set this up?
    textArea.addEventListener("blur", fillDescription);
    deleteButton.addEventListener("click", deleteCard); // ??? what is the benefit to having this as a member fxn like above or not like here
    startMoveButton.addEventListener("click", (event) => { this.mover.startMoving(this); });  // ??? why does it strike thru event when i start writing it? is this method deprecated?
    
    // this.htmlClone.addEventListener("dragstart", dragCard);
  }

  addToCol(colElem, mover) {
    colElem.appendChild(this.htmlClone);
    this.mover = mover;   // ! storing for later use
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
  }
}
