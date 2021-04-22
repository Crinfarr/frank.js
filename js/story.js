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

function showdialog(imgID, boxID, text, imgsrc = 'src/default.png') {
    document.getElementById(imgID).src = imgsrc;
    document.getElementById(boxID).innerHTML = text.toString();
}