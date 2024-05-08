/* Text to add to the move here button */
const MOVE_HERE_TEXT = "— Move here —";

// !!! make sure only one set of move buttons can pop up at once

export default class Mover {
  constructor() {
    //TODO
    // const startMoveButton = this.m_card.htmlClone.childNodes[7].childNodes[3]; // ??? change this to query selector?
    // console.log("LOOK HERE!!!!!!!!!!!");
    // console.log(this);
  //  this.canMove = true; // track if we are moving
    // const startMoveButton = 
    // startMoveButton.addEventListener("click", (event) => { this.startMoving(); });

    // ! ?? confused what is supposed to go in here/what this class rly represents ()

  }

  startMoving(card) {
    this.stopMoving();
    console.log("--entering startMoving--");
    card.htmlClone.className = "moving";  // give the card the CSS class moving
    const moveButton = document.createElement("button");
    moveButton.textContent = MOVE_HERE_TEXT;
    moveButton.className = "moveHere";
    // const cols = document.getElementsByClassName("column");
    const colTitles = document.getElementsByClassName("columnTitle");
    const cards = document.getElementsByTagName("article"); // this a good way to access this?
    this.card = card;

//    if (this.canMove) {
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
//    }
//    this.canMove = false;
  }

  stopMoving(event) { // ?? best to pass in event here?
    // event.currentTarget.insertAdjacentElement("afterend", card.htmlClone); // this refers to the button, not the class
    
    if (event !== undefined) {
      this.card.htmlClone.className = "card";
      event.currentTarget.after(this.card.htmlClone); // ! ??? does this cause an issue when we call stopMoving even when we are not currently moving?
    }
    const moveHereButtons = document.getElementsByClassName("moveHere");
    const len = moveHereButtons.length;
    for(let i = 0; i < len; i++) { 
      moveHereButtons[0].remove();
    }
 //   this.canMove = true;
  }

}



/* BELLOW HERE IS AN IMPLEMENTATION WITH MOST STUFF MOVED TO CONSTRUCTOR, NOT RIGHT THOUGH */

/*
/* Text to add to the move here button
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

    function handleMove(event) {
      console.log("did click work?");
      console.log(this);
      console.log(card);
      this.insertAdjacentElement("afterend", card.htmlClone); // this refers to the button, not the class

    }

    // ! ?? confused what is supposed to go in here/what this class rly represents ()
    const moveButton = document.createElement("button");
    moveButton.textContent = MOVE_HERE_TEXT;
    moveButton.className = "hidden moveHere";
    const colTitles = document.getElementsByClassName("columnTitle");
    const cards = document.getElementsByTagName("article"); // this a good way to access this?
    

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

  startMoving(card) {
    console.log("--entering startMoving--");
    card.htmlClone.className = "moving";  // give the card the CSS class movingz
    console.log(card.htmlClone);
    moveHereButtons = document.getElementsByClassName("moveHere");
    for(let i = 0; i < moveHereButtons.length; i++) {
      moveHereButtons[i].className = "moveHere";
    }
    // const moveButton = document.createElement("button");
    // moveButton.textContent = MOVE_HERE_TEXT;
    // moveButton.className = "moveHere";
    // console.log(moveButton);
    // const cols = document.getElementsByClassName("column");
    // const colTitles = document.getElementsByClassName("columnTitle");
    // const cards = document.getElementsByTagName("article"); // this a good way to access this?
    // console.log(colTitles);
    // console.log(cards);

    // nested function to handle click on Move here buttons 
    // function handleMove(event) {
    //   console.log("did click work?");
    //   console.log(this);
    //   console.log(card);
    //   this.insertAdjacentElement("afterend", card.htmlClone); // this refers to the button, not the class

    // }

    // for(let col = 0; col < colTitles.length; col++) {
    //   // make it under parent column and sibling to coltitles
    //   // parent.insertBefore(newElem, sibling);
    //   let clone = moveButton.cloneNode(true);
    //   clone.addEventListener("click", handleMove);
    //   colTitles[col].insertAdjacentElement("afterend", clone);
    //    // ??? what is the benefit to having this as a member fxn like above or not like here
      
    // }
    // for(let i = 0; i < cards.length - 1; i++) { // -1 bc this includes the template 
    //   let clone = moveButton.cloneNode(true);
    //   clone.addEventListener("click", handleMove);  // .bind(this) maybe so that this refers to mover obj?? also it says to bind in constructor but i didnt do that...
    //   cards[i].insertAdjacentElement("afterend", clone);
    //    // ??? what is the benefit to having this as a member fxn like above or not like here

    //   // cards[i].appendChild(clone);
    // }
  }

  quickTest() {
    console.log("--ENTERING quickTest()--")
  }

  stopMoving() {
    //TODO
  }

  //TODO
}

*/
