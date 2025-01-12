import { PI, SQRT2, SQRT3, E, ranNum, ranLet, ranLetNum, ranSpecialChar, netflix, marvelCharacters, dcCharacters, animes } from './Constants.js';

export default class Value {
    constructor(ctx, player) {
        this.ctx = ctx;
        this.x = 155;
        this.y = 125;

        this.player = player;

        this.typedValue = ""; // User input
        this.currentIndex = 0; // Current match index
        this.precision = 30; // Number of digits to display

        this.valueToMatch = null; // The current correct character to match
        this.inputDisabled = false; // Input switch

        // Symbol-value map
        this.values = {
            π: PI,
            "√2": SQRT2,
            "√3": SQRT3,
            e: E,
            "123": ranNum,
            "ABC": ranLet,
            "ABC123": ranLetNum,
            "@#$": ranSpecialChar,
            "net": netflix,
            "mar": marvelCharacters,
            "dc": dcCharacters,
            "ani": animes
        };

        // Default symbol
        this.currentSymbol = "π";

        // Setup keyboard listeners
        document.removeEventListener("keydown", this.keydown);
        document.removeEventListener("keyup", this.keyup);

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

    // Compute the value to display
    computeValue(symbol, index) {
        const value = this.values[symbol];
        return value.substring(0, index + this.precision);
    }

    // Reset function for reset the typed input, currentIndex, and valueToMatch
    resetValue() {
        this.typedValue = "";
        this.currentIndex = 0;
        this.valueToMatch = null;
    }

    // Update the current symbol
    updateSymbol(symbol) {
        this.currentSymbol = symbol;
        this.typedValue = "";
        this.currentIndex = 0;
    }

    // Handle keydown event for input
    keydown = (event) => {
        // If input is disabled, prevent input
        if (this.inputDisabled) return;

        // Prevent repeated action when holding down the key
        if (this.player.jumpPressed) return;

        const allowedKeys = /^[\S]$/;
        if (allowedKeys.test(event.key)) {
            this.valueToMatch = this.computeValue(this.currentSymbol, this.currentIndex)[this.currentIndex];
            if (event.key === this.valueToMatch) {
                this.typedValue += event.key;
                this.currentIndex++;

                // Set player's jump state
                this.player.jumpPressed = true;
            }
        }
    }

    // Handle keyup event to reset jump state
    keyup = (event) => {
        if (event.key === this.valueToMatch) {
            this.player.jumpPressed = false;
        }
    };

    draw() {
        this.ctx.font = "95px Calibri";
        let xPos = this.x;
        let yPos = this.y;

        const valueToDraw = this.computeValue(this.currentSymbol, this.currentIndex);

        for (let i = this.currentIndex; i < valueToDraw.length; i++) {
            const char = valueToDraw[i];
            this.ctx.fillStyle = "white";
            this.ctx.fillText(char, xPos, yPos);

            const charWidth = this.ctx.measureText(char).width;
            const extraSpacing = (char === '.' || char === '1') ? 10 : 0;

            xPos += charWidth + extraSpacing;
        }
    }
}