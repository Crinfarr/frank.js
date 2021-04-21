// const report = [
//     {
//         avatar: '',
//         location: [0, 0, 0],
//         line: '',
//         delay: 0
//     }
// ];

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