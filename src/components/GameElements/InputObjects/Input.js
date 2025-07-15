import { PI, /* SQRT2, SQRT3, E, */ ranNum, ranLet, ranLetNum, ranBinary, ranSpecialChar, netflix, marvelCharacters, dcCharacters, animes } from './Constants.js';

export default class Input {
    constructor(ctx, player) {
        this.ctx = ctx;
        this.x = 155;
        this.y = 127;

        this.player = player;

        this.typedInput = ""; // User input
        this.currentIndex = 0; // Current match index
        this.precision = 30; // Number of digits to display

        this.inputToMatch = null; // The current correct character to match
        this.inputDisabled = false; // Input switch

        // Mode-input map
        this.input = {
            π: PI,
           /*  "√2": SQRT2,
            "√3": SQRT3,
            e: E, */
            "123": ranNum,
            "ABC": ranLet,
            "ABC123": ranLetNum,
            "@#$": ranSpecialChar,
            "01": ranBinary,
            "net": netflix,
            "mar": marvelCharacters,
            "dc": dcCharacters,
            "ani": animes
        };

        // Default mode
        this.currentMode = "π";

        // Setup keyboard listeners
        document.removeEventListener("keydown", this.keydown);
        document.removeEventListener("keyup", this.keyup);

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

    // Compute the input to display
    computeInput(mode, index) {
        const input = this.input[mode];
        return input.substring(0, index + this.precision);
    }

    // Reset function for reset the typed input, currentIndex, and inputToMatch
    resetInput() {
        this.typedInput = "";
        this.currentIndex = 0;
        this.inputToMatch = null;
    }

    // Update the current mode
    updateMode(mode) {
        this.currentMode = mode;
        this.typedInput = "";
        this.currentIndex = 0;
    }

    // Handle keydown event for input
    keydown = (event) => {
        // Cancel jump if NumLock or CapsLock is pressed
        if (event.key === "NumLock" || event.key === "CapsLock") {
            this.player.jumpPressed = false;
            return; // Don't process further
        }

        // If input is disabled, prevent input
        if (this.inputDisabled) return;

        // Prevent repeated action when holding down the key
        if (this.player.jumpPressed) return;

        const allowedKeys = /^[\S]$/;
        if (allowedKeys.test(event.key)) {
            this.inputToMatch = this.computeInput(this.currentMode, this.currentIndex)[this.currentIndex];
            if (event.key === this.inputToMatch) {
                this.typedInput += event.key;
                this.currentIndex++;

                // Set player's jump state
                this.player.jumpPressed = true;
            }
        }
    }

    // Handle keyup event to reset jump state
    keyup = (event) => {
        if (event.key === this.inputToMatch) {
            this.player.jumpPressed = false;
        }
    };

    draw() {
        this.ctx.font = "95px Calibri";
        let xPos = this.x;
        let yPos = this.y;

        const inputToDraw = this.computeInput(this.currentMode, this.currentIndex);

        for (let i = this.currentIndex; i < inputToDraw.length; i++) {
            const char = inputToDraw[i];
            this.ctx.fillStyle = "white";
            this.ctx.fillText(char, xPos, yPos);

            const charWidth = this.ctx.measureText(char).width;
            const extraSpacing = (char === '.' || char === '1') ? 10 : 0;

            xPos += charWidth + extraSpacing;
        }
    }
}
