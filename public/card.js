/* The text to use when description is empty */
const NO_DESCRIPTION_TEXT = "(No description)";

// ! ??? Should every function have a return in JS?

export default class Card {
  constructor(title, color) {
    console.log("Entering Card Constructor")
    const template_obj = document.getElementsByClassName("template card");  // ??? const or let best here? // document.querySelector(".template card") ??
    let clone = template_obj[0].cloneNode(true); // If true, then the node and its whole subtree, including text that may be in child Text nodes, is also copied.
    // clone.className = "cl";
    // console.log("------clone.className-----")
    // console.log(clone.className)
    clone.className = "card"; // ! need to fix this for the background colors
    clone.style.backgroundColor = color;  // ! this allowed? bc above wouldnt work right
    clone.childNodes[1].innerText = title; // ??? should this go here or somehwere else? better way to do this?
    this.title = title;
    this.color = color;
    this.htmlClone = clone;

    console.log(`this.title = ${this.title}`);
    console.log(`this.color = ${this.color}`);
//    console.log(`this.htmlClone = ${this.htmlClone}`);
    console.log("this.htmlClone = ");
    console.log(this.htmlClone)
    console.log("this.htmlClone.childNodes = ");
    console.log(this.htmlClone.childNodes)
    console.log(`template_obj = `);
    console.log(template_obj)
    console.log("this.htmlClone.childNodes[3] = ")
    console.log(this.htmlClone.childNodes[3])

  }

  addToCol(colElem, mover) {
    //TODO
    console.log("entering addToCol");
    // console.log("colElem = ");
    // console.log(colElem);
    // console.log(colElem.childNodes);
    colElem.appendChild(this.htmlClone);
    // console.log("colElem = ");
    // console.log(colElem);
    // console.log(colElem.childNodes);

  }

  setDescription(text) {
    // DONE? --> set a card's description. If card ever empty, should say "(No description)" 
    // ??? not sure if accessing right here - is this best to use? is childNodes[3] always gonna work?
    console.log("entering setDescription");

    if (text === "") {
      this.htmlClone.childNodes[3].innerText = NO_DESCRIPTION_TEXT;
    }
    else {
      this.htmlClone.childNodes[3].innerText = text;
    }
    console.log(this.htmlClone)
  }

  //TODO
}
