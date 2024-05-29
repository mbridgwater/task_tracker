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
    let currCard = document.querySelector("article.moving");
    let originalColumn = "";
    let column = "";
    let prevSiblingId = "";
    // let position = 0;
    if (event !== undefined) {
      if (currCard !== null) {
        column = event.currentTarget.parentElement.id;
        prevSiblingId = event.currentTarget.previousElementSibling.getAttribute('id');
        originalColumn = currCard.parentElement.id;
      }
      
      document.querySelector("article.moving")?.classList.remove("moving"); // '?' for if null
      currCard?.classList.add("card"); // '?' for if null
      event.currentTarget.after(currCard);  // need something here for if card us null? or will it not enter it in that case?
      // make the column update with the column id marker
      /* save update to local storage */
//      this.updateLocalStorage(this.card);
      this.updateLocalStorageColPosition(currCard, column, prevSiblingId, originalColumn); // NOTE: id of prev elem is null if there are no cards before it
    }

    /* remove move here buttons */
    const moveHereButtons = document.getElementsByClassName("moveHere");
    const len = moveHereButtons.length;
    for(let i = 0; i < len; i++) { 
      moveHereButtons[0].remove();
    }
  }

  updateLocalStorageColPosition(card, newColumn, prevSiblingId, originalColumn) {

    let cards = JSON.parse(window.localStorage.getItem('cards')) || [];  /* get cards that are already stored, shouldn't need || [] bc for stopMoving to be called, some cards must exist, but can add it as safegaurd */
    const existingCardIndex = cards.findIndex(c => c.id === card.getAttribute('id')); /* see if the card alr exists */
    const prevSiblingIndex = cards.findIndex(c => c.id === prevSiblingId); // prevSiblingIndex is -1 if there is no card prior to the one ur inserting in that col

    if (existingCardIndex !== -1) {
      const ogCardPosition = cards[existingCardIndex].position;
      cards[existingCardIndex].col = newColumn; // Note it is important that we only update the col and position here and not the whole card bc since we do not keep the object itself up to date, other attributes could get overwritten with old data
      // if no previous sibling id, set position to zero. else set it to the previous + 1

      /* REMOVE CARD FROM CURRENT COLUMN BY DECREMENTING ALL POSITIONS ABOVE IT */
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].col === originalColumn) {
          if (cards[i].position > ogCardPosition) {
            cards[i].position--;
          }
        }
      }

      /* ADD CARD FROM THE OG COLUMN TO THE NEW COLUMN BY GIVING IT THE PREV ELEM POS + 1 AND THEN FIXING ABOVE AND EQUAL TO IT */
      if (prevSiblingIndex === -1) {
        cards[existingCardIndex].position = 0;
      }
      else {
        cards[existingCardIndex].position = cards[prevSiblingIndex].position + 1;
      }
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].col === newColumn) {
          if (cards[i].position >= cards[existingCardIndex].position && i !== existingCardIndex) {
            cards[i].position++;
          }
        }
      }
    } 
    // else {
      // WE SHOULD NEVER GO INTO THIS
      // console.log("THIS IS A PROBLEM, YOU SHOULD NOT BE ENTERING THIS!!!!!!")
      // cards.push(card);
    // }
    
    window.localStorage.setItem('cards', JSON.stringify(cards));
  }
}