/* Text to add to the move here button */
const MOVE_HERE_TEXT = "— Move here —";

export default class Mover {
  constructor() {
    // ??? confused what is supposed to go in here/what this class rly represents ()
    // maybe one thing i could do is in card.js rather than calling this.mover.startMoving(this), i should 
    // do new Mover(card); and then move most of the stuff from startMoving into the constructor
    // in that case --> what would startMoving have?`
  }

  /* startMoving(card) makes the -move here- button pop up and preps a card to be moved */
  startMoving(card) {
    this.stopMoving();
    card.htmlClone.className = "moving";  // give the card the CSS class moving
    const moveButton = document.createElement("button");
    moveButton.textContent = MOVE_HERE_TEXT;
    moveButton.className = "moveHere";
    
    const colTitles = document.getElementsByClassName("columnTitle");
    const cards = document.getElementsByTagName("article");
    this.card = card;

    for(let col = 0; col < colTitles.length; col++) {
        let clone = moveButton.cloneNode(true);
        clone.addEventListener("click", (event) => { this.stopMoving(event); });
        colTitles[col].after(clone);
        // ??? what is the benefit to having this as a member fxn like above or not like here
    }
    for(let i = 0; i < cards.length - 1; i++) { // -1 bc this includes the template 
      let clone = moveButton.cloneNode(true);
      clone.addEventListener("click", (event) => { this.stopMoving(event); });  // ??? .bind(this) maybe so that this refers to mover obj??? also it says to bind in constructor but i didnt do that...
      cards[i].after(clone);
      // ??? what is the benefit to having this as a member fxn like above or not like here
    }
  }

  /* stopMoving alters the DOM and moves the selected card to the right stop or just cancels the move altogther */
  stopMoving(event) {
    if (this.card !== undefined) {
      this.card.htmlClone.className = "card";
    }
    if (event !== undefined) {
      event.currentTarget.after(this.card.htmlClone); 
    }
    const moveHereButtons = document.getElementsByClassName("moveHere");
    const len = moveHereButtons.length;
    for(let i = 0; i < len; i++) { 
      moveHereButtons[0].remove();
    }
  }
}