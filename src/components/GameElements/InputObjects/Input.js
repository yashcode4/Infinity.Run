import { PI, /* SQRT2, SQRT3, EULER, */ Numbers, Letters, AlphaNumeric, Symbols, Binary, Netflix, Marvel, DC, Anime } from './Constants.js';

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

        // Maps each mode name to its corresponding input string
        this.input = {
            PI,
            // SQRT2,
            // SQRT3,
            // EULER,
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

        // Setup keyboard listeners
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
