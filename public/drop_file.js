//import 

export default class ImportTextFile {
    constructor(card) {
        console.log("ENTERING ImportTextFile CLASS for card " + card.title);
        this.card = card;   // maybe delete this at end
        this.cardHtml = card.htmlClone; // make sure to remove all this.wrapper
        // this.fileInput = this.wrapper.querySelector('input');
        this.textArea = this.cardHtml.getElementsByClassName("description")[0];
        console.log("this.textarea is");
        console.log(this.textArea);

        // this.textInitialHeight = this.textArea.style.height; // removing styling
        // if (this.textArea.style.maxHeight === '') {
        //     this.textArea.style.maxHeight = '30em';
        // }
        // this.textArea.style.overflowY = 'auto';

        // this.fileInput.addEventListener('change', this.handleFileInputChange.bind(this));
        
        this.textArea.parentElement.addEventListener('dragover', this.handleDragOver.bind(this));   // .parent element?
        console.log("this.textArea.parentElement is");
        console.log(this.textArea.parentElement);
        // this.textArea.parentElement.addEventListener('dragenter', this.handleDragEnter.bind(this));
        this.textArea.parentElement.addEventListener("dragleave", this.handleDragLeave.bind(this));
        this.textArea.parentElement.addEventListener('drop', this.handleDrop.bind(this));
    }

    readFile(source, target) {
        console.log("--entering readFile for card " + this.card.title);
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            target.value = event.target.result;
            console.log("target.value IS");
            console.log(target.value);
            this.textArea.innerText = target.value;
            // return target.value;
        });
        reader.readAsText(source);
        // console.log("target.value IS");
        // console.log(target.value);
    }

    // handleFileInputChange(event) {
    //     event.preventDefault();
    //     const input = this.fileInput.files[0];
    //     this.readFile(input, this.textArea);
    //     this.fileInput.value = '';
    //     this.fileInput.blur();
    // }

    // handleDragEnter(event) {
    //     // event.stopPropagation();
    //     // event.preventDefault();
    //     console.log("--entering handleDragEnter--")
    //     // this.cardHtml.className = "card blueBorder";
    // }

    handleDragOver(event) {
        console.log("--entering handleDragOver for card " + this.card.title);
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy'; // look into this more
        console.log("BEFORE CHANGE");
        console.log(this.cardHtml.className);
        this.cardHtml.className = "card blueBorder";
        console.log("AFTER CHANGE");
        console.log(this.cardHtml.className);
        this.cardHtml.getElementsByClassName("title")[0].className = "title no-drag";
        this.cardHtml.getElementsByClassName("description")[0].className = "description no-drag";
        // this.cardHtml.getElementsByClassName("editDescription hidden")[0].className = "editDescription hidden no-drag";
        this.cardHtml.getElementsByClassName("buttons")[0].className = "buttons no-drag";

    }

    handleDragLeave(event) {
        event.stopPropagation();
        event.preventDefault();
        console.log("--entering handleDragLeave for card " + this.card.title);
        this.cardHtml.className = "card";
        this.cardHtml.getElementsByClassName("title")[0].className = "title";
        this.cardHtml.getElementsByClassName("description")[0].className = "description";
        // this.cardHtml.getElementsByClassName("editDescription hidden")[0].className = "editDescription hidden no-drag";
        this.cardHtml.getElementsByClassName("buttons")[0].className = "buttons";
    }

    handleDrop(event) {
        console.log("--entering handleDrop for card " + this.card.title);
        event.stopPropagation();
        event.preventDefault();
        const input = event.dataTransfer.files[0];
        console.log("INPUT");
        console.log(input);
        this.readFile(input, this.textArea);    // this what i want??
        // console.log("BEFORE CHANGE");
        // console.log(this.cardHtml.className);
        this.cardHtml.className = "card";
        // console.log("AFTER CHANGE");
        // console.log(this.cardHtml.className);
        this.cardHtml.getElementsByClassName("title")[0].className = "title";
        this.cardHtml.getElementsByClassName("description")[0].className = "description";
        // this.cardHtml.getElementsByClassName("editDescription hidden")[0].className = "editDescription hidden no-drag";
        this.cardHtml.getElementsByClassName("buttons")[0].className = "buttons";
        // console.log("TEXT IS ");
        // console.log(text);
        // this.textArea.innerText = text;
    }
}