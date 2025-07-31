import { PI, Numbers, Letters, AlphaNumeric, Symbols, Binary, Netflix, Marvel, DC, Anime } from './Constants.js';

export default class Input {
    constructor(ctx, player, scaleRatio) {
        this.ctx = ctx;
        this.scaleRatio = scaleRatio;

        this.x = 155 * this.scaleRatio;
        this.y = 122 * this.scaleRatio;

        this.player = player;

        this.typedInput = ""; // All user-typed characters
        this.currentIndex = 0; // Position in the input string
        this.precision = 30; // Number of characters shown at once

        this.inputToMatch = null; // Character to match
        this.inputDisabled = false; // Disables input when true

        // Maps each mode name to its corresponding input string
        this.input = {
            PI,
            Numbers,
            Letters,
            AlphaNumeric,
            Symbols,
            Binary,
            Netflix,
            Marvel,
            DC,
            Anime
        };

        // Default mode
        this.currentMode = "PI";

        // Remove previous listeners (if any) and add new ones
        document.removeEventListener("keydown", this.keydown);
        document.removeEventListener("keyup", this.keyup);
        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

    // Compute the input to display
    computeInput(mode, index) {
        const rawInput = this.input[mode]; // Already cleaned
        const repeatedInput = rawInput.repeat(Math.ceil((index + this.precision) / rawInput.length));
        return repeatedInput.substring(0, index + this.precision);
    }

    // Resets the typed input and index tracking
    resetInput() {
        this.typedInput = "";
        this.currentIndex = 0;
        this.inputToMatch = null;
    }

    // Updates current input mode
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

                // Trigger jump
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

    // Draw upcoming input characters
    draw() {
        const fontSize = 90 * this.scaleRatio;
        this.ctx.font = `${fontSize}px Calibri`;

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
