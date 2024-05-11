export default class ImportTextFile {
    constructor(card) {
        this.card = card;
        this.cardHtml = card.htmlClone; 
        this.textArea = this.cardHtml.getElementsByClassName("description")[0];

        this.textArea.parentElement.addEventListener('dragover', this.handleDragOver.bind(this));
        this.textArea.parentElement.addEventListener("dragleave", this.handleDragLeave.bind(this));
        this.textArea.parentElement.addEventListener('drop', this.handleDrop.bind(this));
    }

    readFile(source, target) {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            target.value = event.target.result;
            this.textArea.innerText = target.value;
        });
        reader.readAsText(source);
    }

    handleDragOver(event) {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        this.cardHtml.className = "card blueBorder";
        this.cardHtml.getElementsByClassName("title")[0].className = "title no-drag";
        this.cardHtml.getElementsByClassName("description")[0].className = "description no-drag";
        this.cardHtml.getElementsByClassName("buttons")[0].className = "buttons no-drag";

    }

    handleDragLeave(event) {
        event.stopPropagation();
        event.preventDefault();
        this.cardHtml.className = "card";
        this.cardHtml.getElementsByClassName("title")[0].className = "title";
        this.cardHtml.getElementsByClassName("description")[0].className = "description";
        this.cardHtml.getElementsByClassName("buttons")[0].className = "buttons";
    }

    handleDrop(event) {
        event.stopPropagation();
        event.preventDefault();
        const input = event.dataTransfer.files[0];
        this.readFile(input, this.textArea);
        this.cardHtml.className = "card";
        this.cardHtml.getElementsByClassName("title")[0].className = "title";
        this.cardHtml.getElementsByClassName("description")[0].className = "description";
        this.cardHtml.getElementsByClassName("buttons")[0].className = "buttons";
    }
}