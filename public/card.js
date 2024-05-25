/* The text to use when description is empty */
const NO_DESCRIPTION_TEXT = "(No description)";
import colorNameToHex from "./getColorHex.js"

export default class Card {
  constructor(title, color, col) {
    const template_obj = document.getElementsByClassName("template card");
    let clone = template_obj[0].cloneNode(true); // If true, then the node and its whole subtree, including text that may be in child Text nodes, is also copied.

    clone.className = "card";
    clone.style.backgroundColor = color;
    const hexColor = colorNameToHex(color); // takes a hex color or predefined css color and converts to hex
    /* detect how dark the color is */
    const r = parseInt(hexColor.substr(1,2), 16);
    const g = parseInt(hexColor.substr(3,2), 16);
    const b = parseInt(hexColor.substr(5,2), 16);
    // console.log(`r=${r}. g=${g}, b=${b}`);

    if ((r*0.299 + g*0.587 + b*0.114) <= 128) {   // source: https://en.wikipedia.org/wiki/Relative_luminance
      // clone.className = "card white-color";  // don't do this way bc makes things difficult/buggy later when resetting class names
      clone.style.color = "white";
      const imgList = clone.getElementsByTagName("img");
      // console.log("imgList is ", imgList)
      for (let i = 0; i < imgList.length; i++) {
        clone.getElementsByTagName("img")[i].className = "white-filter";
      }
    }
    clone.getElementsByClassName("title")[0].innerText = title; // ??? should this go here or somehwere else? better way to do this?
    this.title = title;
    this.color = hexColor;
    this.htmlClone = clone;
    this.id = `card${Date.now()}`;  // Unique ID
    this.col = col;

    // get card buttons
    const editButton = this.htmlClone.getElementsByClassName("edit")[0];
    const startMoveButton = this.htmlClone.getElementsByClassName("startMove")[0];
    const deleteButton = this.htmlClone.getElementsByClassName("delete")[0];
    

    const deleteCard = () => {   // ?? is there a way to make this a member function that would be better? Are all event listeners & handlers supposed to be in constructor (seems cluttered)? 
            /* ! ??? do i need to specify event here even if im not using it? linter yelled at me when i had it */
      this.mover.stopMoving();  // when delete a card, don't want to be moving
      this.htmlClone.remove();
      delete this;
    }

    let textArea = this.htmlClone.getElementsByTagName("textarea")[0];

    const fillDescription = () => { /* ! ??? do i need to specify event here even if im not using it? linter yelled at me when i had it */
      this.setDescription(textArea.value);
      textArea.className = "editDescription hidden";
      this.htmlClone.getElementsByClassName("description hidden")[0].className = "description";
    }

    // const dragCard = (event) => {
    //   console.log("DRAGGING");
    // }

    editButton.addEventListener("click", () => { this.editCard(textArea); }); // this a good way to set this up? /* ! ??? do i need to specify event here even if im not using it? linter yelled at me when i had it */
    textArea.addEventListener("blur", fillDescription);
    deleteButton.addEventListener("click", deleteCard); // ??? what is the benefit to having this as a member fxn like above or not like here
    startMoveButton.addEventListener("click", () => { this.mover.startMoving(this); });  // ??? why does it strike thru event when i start writing it? is this method deprecated?
    /* ! ??? do i need to specify event here even if im not using it? linter yelled at me when i had it ^^ */
    // this.htmlClone.addEventListener("dragstart", dragCard);
    // console.log(this);
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
}


