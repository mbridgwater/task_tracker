/* Text to add to the move here button */
const MOVE_HERE_TEXT = "— Move here —";

// !!! make sure only one set of move buttons can pop up at once

export default class Mover {
  constructor() {
    //TODO
    // const startMoveButton = this.m_card.htmlClone.childNodes[7].childNodes[3]; // ??? change this to query selector?
    console.log("LOOK HERE!!!!!!!!!!!");
    console.log(this);
    // const startMoveButton = 
    // startMoveButton.addEventListener("click", (event) => { this.startMoving(); });

    // ! ?? confused what is supposed to go in here/what this class rly represents ()

  }

  startMoving(card) {
    console.log("--entering startMoving--");
    card.htmlClone.className = "moving";  // give the card the CSS class movingz
    console.log(card.htmlClone);
    const moveButton = document.createElement("button");
    moveButton.textContent = MOVE_HERE_TEXT;
    moveButton.className = "moveHere";
    console.log(moveButton);
    // const cols = document.getElementsByClassName("column");
    const colTitles = document.getElementsByClassName("columnTitle");
    const cards = document.getElementsByTagName("article"); // this a good way to access this?
    console.log(colTitles);
    console.log(cards);

    /* nested function to handle click on Move here buttons */
    function handleMove(event) {
      console.log("did click work?");
      console.log(this);
      console.log(card);
      this.insertAdjacentElement("afterend", card.htmlClone); // this refers to the button, not the class

      return -1;
    }

    for(let col = 0; col < colTitles.length; col++) {
      // make it under parent column and sibling to coltitles
      // parent.insertBefore(newElem, sibling);
      let clone = moveButton.cloneNode(true);
      clone.addEventListener("click", handleMove);
      colTitles[col].insertAdjacentElement("afterend", clone);
       // ??? what is the benefit to having this as a member fxn like above or not like here
      
    }
    for(let i = 0; i < cards.length - 1; i++) { // -1 bc this includes the template 
      let clone = moveButton.cloneNode(true);
      clone.addEventListener("click", handleMove);  // .bind(this) maybe so that this refers to mover obj?? also it says to bind in constructor but i didnt do that...
      cards[i].insertAdjacentElement("afterend", clone);
       // ??? what is the benefit to having this as a member fxn like above or not like here

      // cards[i].appendChild(clone);
    }
  }

  quickTest() {
    console.log("--ENTERING quickTest()--")
  }

  stopMoving() {
    //TODO
  }

  //TODO
}
