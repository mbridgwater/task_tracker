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
    console.log("----entering startMoving(card)----");
    this.stopMoving();
    card.htmlClone.className = "moving";  // give the card the CSS class moving
    const moveButton = document.createElement("button");
    moveButton.textContent = MOVE_HERE_TEXT;
    moveButton.className = "moveHere";
    
    const colTitles = document.getElementsByClassName("columnTitle");
    const cards = document.getElementsByTagName("article");
    // this.card = card;  // DON'T REFERENCE this.card
    // console.log("WHAT IS CARD HERE");
    // console.log(card);

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
    // !! note: when stop moving, need to both update the position of the current card as well as all the other cards in that 
    // !! column below the curr card or else their positions will potensh skip something 
    console.log("----entering stopMoving(event)----");
    // document.querySelector("moving")?.classList.remove("moving");
    // if (this.card !== undefined) {
    //   this.card.htmlClone.className = "card";
    // }
    // if (event !== undefined && this.card !== undefined) {
    let currCard = document.querySelector("article.moving");
    let originalColumn = "";
    let column = "";
    let prevSiblingId = "";
    // let position = 0;
    if (event !== undefined) {
      if (currCard !== null) {  // ! this null check needed?
        column = event.currentTarget.parentElement.id;
        prevSiblingId = event.currentTarget.previousElementSibling.getAttribute('id');
        originalColumn = currCard.parentElement.id;
        // console.log("ORIGINAL COLUMN: ", originalColumn);
      }
      
      document.querySelector("article.moving")?.classList.remove("moving"); // '?' for if null
      currCard?.classList.add("card"); // '?' for if null
      // console.log("class list for currCard is ", currCard.classList)
      // console.log("curr card is ", currCard)
      // document.querySelector("article.moving")?.classList.remove("moving"); // '?' for if null
      // currCard?.className = "card"; // '?' for if null
      // event.currentTarget.after(this.card.htmlClone); 
      event.currentTarget.after(currCard);  // need something here for if card us null? or will it not enter it in that case?
      console.log("--------------testing mover here positioning-------------");
      console.log("my event is", event);
      console.log("my event.currentTarget is ", event.currentTarget);
      console.log("my event.currentTarget.previousElementSibling.getAttribute(id) is", event.currentTarget.previousElementSibling.getAttribute('id'));
      // console.log("IS IT HERE???");
      // console.log(currCard);
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
    // console.log("----entering updateLocalStorageColPosition(card) within mover.js----");
    // NOTE: here, card is HTML, not an object
    // console.log("LOOK HERE !!! card is");
    // console.log(card);

    let cards = JSON.parse(window.localStorage.getItem('cards')) || [];  /* get cards that are already stored, shouldn't need || [] bc for stopMoving to be called, some cards must exist, but can add it as safegaurd */
    // console.log("LOOK HERE !!! cards is");
    // console.log(cards);
    // console.log("card.getAttribute('id') is ", card.getAttribute('id'));
    const existingCardIndex = cards.findIndex(c => c.id === card.getAttribute('id')); /* see if the card alr exists */
    const prevSiblingIndex = cards.findIndex(c => c.id === prevSiblingId); // prevSiblingIndex is -1 if there is no card prior to the one ur inserting in that col
    // console.log("existing card index is: ", existingCardIndex);
    // console.log(existingCardIndex);
    // console.log(card);
    console.log("CARDS - LOOK HERE", cards);

    if (existingCardIndex !== -1) { 
      // cards[existingCardIndex] = card;  // so that this makes the update for the column
      const ogCardPosition = cards[existingCardIndex].position;
      cards[existingCardIndex].col = newColumn; // Note it is important that we only update the col and position here and not the whole card bc since we do not keep the object itself up to date, other attributes could get overwritten with old data
      // if no previous sibling id, set position to zero. else set it to the previous + 1

      /* REMOVE CARD FROM CURRENT COLUMN BY DECREMENTING ALL POSITIONS ABOVE IT */
      // const ogCardPosition = cards[existingCardIndex].position;
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

      /* ADD CARD TO NEW COLUMN */

      /* 
      if (prevSiblingIndex === -1) {
        cards[existingCardIndex].position = 0;
      }
      else if (ogCardPosition > prevSiblingIndex) {
        cards[existingCardIndex].position = cards[prevSiblingIndex].position + 1;
      }
      else if (ogCardPosition <= prevSiblingIndex) {
        cards[existingCardIndex].position = cards[prevSiblingIndex].position;
      }
      else {
        console.log(" WHY ARE YOU ENTERING THIS. YOU SHOULD NOT BE ");
      }
      // cards[existingCardIndex].position = prevSiblingIndex === -1 ? 0 : cards[prevSiblingIndex].position + 1;
      // ! test staying in the same position
      // update the rest of the positions of all cards in the same column following the curr card (increment them by 1):
      console.log("ORIGINAL CARD POS: ogCardPosition: ", ogCardPosition);
      console.log("NEW CARD POS: cards[existingCardIndex].position: ", cards[existingCardIndex].position);
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].col === newColumn && cards[i].col === originalColumn && cards[existingCardIndex].position !== ogCardPosition) { // do nothing if the position is the same as original
          console.log("entering ZERO if (cards[i].col === newColumn && cards[i].col === originalColumn && cards[existingCardIndex].position !== ogCardPosition)");
          if (ogCardPosition > cards[existingCardIndex].position) {
            console.log("entering ONE if (ogCardPosition > cards[existingCardIndex].position)");
            if (cards[i].position >= cards[existingCardIndex].position && i !== existingCardIndex) {
              console.log("entering TWO if (cards[i].position >= cards[existingCardIndex].position && i !== existingCardIndex)");
              cards[i].position++;
            }
          }
          else if (ogCardPosition < cards[existingCardIndex].position) {
            console.log("entering THREE else if (ogCardPosition < cards[existingCardIndex].position)")
            if (cards[i].position >= ogCardPosition && cards[i].position < cards[existingCardIndex].position) {
              cards[i].position--;
            }
            // cards[existingCardIndex].position--;  // fix this since we incremented
          }
        }
        // else if ((cards[i].col === column && cards[i].col !== originalColumn) || (cards[i].col === column && cards[i].col === originalColumn && ogCardPosition > cards[existingCardIndex].position)) {  // if new col and og col are same, should go into this if moving card up (i.e. og position > new position)
        else if (cards[i].col === newColumn) {
          console.log("entering FOUR else if (cards[i].col === newColumn) {")
          if (cards[i].position >= cards[existingCardIndex].position && i !== existingCardIndex) {
            console.log("cards[i].position before increment", cards[i].position);
            console.log("cards[existingCardIndex].position", cards[existingCardIndex].position);
            cards[i].position++;
          }
        }
        else if (cards[i].col === originalColumn) { // if new col and og col are same, should go into this if moving card down (i.e. og position < new position)
          console.log("entering FIVE else cards[i].col === originalColumn) {")
          if (cards[i].position >= ogCardPosition) {  // shouldn't need  && i !== existingCardIndex here
            console.log("cards[i].position before decrement", cards[i].position);
            console.log("ogCardPosition", ogCardPosition);
            cards[i].position--;
          }
        }
      }
      // cards[existingCardIndex].col = this.card.col;
      // console.log("cards[existingCardIndex].col", cards[existingCardIndex].col);
      */
    } 
    else {
      // WE SHOULD NEVER GO INTO THIS
      console.log("THIS IS A PROBLEM, YOU SHOULD NOT BE ENTERING THIS!!!!!!")
      // cards.push(card);
    }
    
    console.log("FINAL CARDS LIST: ", cards)
    window.localStorage.setItem('cards', JSON.stringify(cards));
    console.log("WHAT IS BEING STORED: ", JSON.parse(window.localStorage.getItem('cards')));
  }
}