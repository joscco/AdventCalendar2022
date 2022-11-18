import {Container, Text, TextMetrics, TextStyle} from "pixi.js";

export class TextBox extends Container {

    TEXT_PADDING_VERTICAL: number = 80
    TEXT_PADDING_HORIZONTAL: number = 150
    MAX_LETTERS: number = 200

    LETTER_TYPE_DURATION = 0.2
    LETTER_TYPE_OFFSET = 0.01
    LETTER_DETYPE_DURATION = 0.2
    LETTER_DETYPE_OFFSET = 0.005

    private style: TextStyle
    private boxWidth: number
    private boxHeight: number
    private fullText: string
    private letters: Text[]

    constructor(width: number, height: number) {
        super()
        this.boxWidth = width
        this.boxHeight = height

        this.style = new TextStyle({
            fontFamily: "Futurahandwritten",
            fill: "#ffffff",
            fontSize: 60,
            wordWrapWidth: this.boxWidth - 2*this.TEXT_PADDING_HORIZONTAL
        })

        this.letters = this.initLetters()
        this.fullText = ""

        this.position.set(-this.boxWidth/2 + this.TEXT_PADDING_HORIZONTAL - 20, -this.boxHeight/2 + this.TEXT_PADDING_VERTICAL)
    }

    setFullText(text: string) {
        this.fullText = text
        this.setLetters(this.fullText)
    }

    async type() {
        for (let i = 0; i < this.fullText.length - 1; i++) {
            gsap.to(this.letters[i].scale, {x: 1, y: 1, duration: this.LETTER_TYPE_DURATION, delay: i * this.LETTER_TYPE_OFFSET, ease: Back.easeOut})
        }
        await gsap.to(this.letters[this.fullText.length - 1].scale, {x: 1, y: 1, duration: this.LETTER_TYPE_DURATION, delay: (this.fullText.length - 1) * this.LETTER_TYPE_OFFSET, ease: Back.easeIn})
    }

    async detype() {
        for (let i = this.fullText.length - 1; i > 0; i--) {
            gsap.to(this.letters[i].scale, {x: 0, y: 0, duration: this.LETTER_DETYPE_DURATION, delay: (this.fullText.length - 1 - i) * this.LETTER_DETYPE_OFFSET, ease: Back.easeIn})
        }
        await gsap.to(this.letters[0].scale, {x: 0, y: 0, duration: this.LETTER_DETYPE_DURATION, delay: (this.fullText.length - 1) * this.LETTER_DETYPE_OFFSET, ease: Back.easeIn})
    }

    private initLetters() {
        let result = []
        for (let i = 0; i < this.MAX_LETTERS; i++) {
            let letter = new Text("", new TextStyle({
                fontFamily: "Futurahandwritten",
                fontSize: 60,
                fill: 0xffffff,
                align: "left",
                wordWrapWidth: this.boxWidth - 2 * this.TEXT_PADDING_VERTICAL}))
            letter.anchor.set(0.5)
            letter.scale.set(0)
            result.push(letter)
            this.addChild(letter)
        }
        return result;
    }

    private setLetters(fullText: string) {
        let lineIndex = 0
        let lineY = 0
        let lineMeasure
        let lineTillEndOfWordMeasure
        let letterMeasure
        let lineText = ""
        for (let i = 0; i < this.MAX_LETTERS; i++) {
            let letter = fullText.slice(i, i + 1)
            let lineTextTillEndOfWord = lineText + fullText.substring(i).split(" ")[0]

            lineText += letter
            letterMeasure = TextMetrics.measureText(letter, this.style)
            lineMeasure = TextMetrics.measureText(lineText, this.style, true)
            lineTillEndOfWordMeasure = TextMetrics.measureText(lineTextTillEndOfWord, this.style, true)
            if (lineTillEndOfWordMeasure.lines.length > 1) {
                // We had a line break
                lineIndex++
                lineY += lineTillEndOfWordMeasure.lineHeight
                lineText = letter
                lineMeasure = TextMetrics.measureText(letter, this.style)
            }
            this.letters[i].position.set(lineMeasure.width - letterMeasure.width/2, lineY)
            this.letters[i].text = letter
        }

        if (lineIndex === 0) {
            this.letters.forEach(letter => letter.position.y = this.boxHeight/2 - this.TEXT_PADDING_VERTICAL)
        }
    }
}