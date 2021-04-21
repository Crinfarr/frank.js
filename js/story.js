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
        this.line++;
    }
    previousLine() {
        this.line++;
    }
    getStoryLine(n = this.line) {
        return this.story[n];
    }
}