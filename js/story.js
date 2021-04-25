class story {
    constructor(report) {
        this.story = report;
        this.line = 0;
    }
    nextLine() {
        if (this.line < this.story.length - 1) this.line++;
    }
    previousLine() {
        if (this.line > 0) this.line--;
    }
    getStoryLine(n = this.line) {
        return this.story[n];
    }
}

function showdialog(imgID, boxID, text, imgsrc = 'default') {
    document.getElementById(imgID).src = `src/${imgsrc}.jpg`;
    document.getElementById(boxID).innerHTML = text.toString();
}