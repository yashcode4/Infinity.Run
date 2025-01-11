import piSymbol from "../../../images/symbol-images/pi-symbol-icon.png";
import root2Symbol from "../../../images/symbol-images/root2-symbol-icon.png";
import root3Symbol from "../../../images/symbol-images/root3-symbol-icon.png";
import eSymbol from "../../../images/symbol-images/e-symbol-icon.png";
import ranNum from "../../../images/symbol-images/ran-num.png";
import ranLet from "../../../images/symbol-images/ran-let.png";
import ranLetNum from "../../../images/symbol-images/ran-let-num.png";
import ranSpecialChar from "../../../images/symbol-images/ran-special-char.png";
import netflix from "../../../images/symbol-images/netflix_logo.png";
import marvelChar from "../../../images/symbol-images/marvel_logo.png";
import dcChar from "../../../images/symbol-images/dc_logo.png";
import anime from "../../../images/symbol-images/anime_logo.png";

export default class Symbol {
    constructor(ctx, width, height, value) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;

        this.currentSymbol = ''; // Currently displayed symbol
        this.currentIndex = 0; // Index of the current symbol in the array
        this.typedValue = ''; // Value typed by the user

        // Position of the symbol on canvas
        this.x = 10;
        this.y = 65;

        // Arrays of symbol images and their associated keys
        this.symbolImages = [piSymbol, root2Symbol, root3Symbol, eSymbol, ranNum, ranLet, ranLetNum, ranSpecialChar, netflix, marvelChar, dcChar, anime];
        this.symbolKeys = ["π", "√2", "√3", "e", "123", "ABC", "ABC123", "@#$", "net", "mar", "dc", "ani"];
        this.currentIndex = 0; // Start with the first symbol image
        this.image = this.loadImage(this.symbolImages[this.currentIndex]); // Load the first symbol image

        // Update the displayed value when a new symbol is selected
        this.value = value;
        this.value.updateSymbol(this.symbolKeys[this.currentIndex]);

        this.symbolChangeEnabled = true; // symbol switch

        // Hover effects variables
        this.isHovered = false;
        this.currentGlow = 0; // Current shadow blur for hover effect
        this.targetGlow = 0; // Target shadow blur for hover effect

        // Event listeners for hover and click
        this.canvas.addEventListener("mousemove", (e) => this.handleMouseMove(e));
        this.canvas.addEventListener("click", (e) => this.handleClick(e));
    }

    // Load an image from the source, change the symbol when click
    loadImage(src) {
        const img = new Image();
        img.src = src;
        return img;
    }

    // Handle mouse movement (for hover effect)
    handleMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;

        const mouseX = (event.clientX - rect.left) * scaleX;
        const mouseY = (event.clientY - rect.top) * scaleY;

        // Check if the mouse is hovering over the symbol
        const isHovering = mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
        this.targetGlow = isHovering ? 5 : 0;
        this.canvas.style.cursor = isHovering ? "pointer" : "default";
        this.isHovered = isHovering;
    }

    // Handle mouse click (to switch symbols)
    handleClick(event) {
        if (this.isHovered && this.symbolChangeEnabled) {
            this.currentIndex = (this.currentIndex + 1) % this.symbolImages.length;
            this.image = this.loadImage(this.symbolImages[this.currentIndex]); // Change symbol when clicked
            this.value.updateSymbol(this.symbolKeys[this.currentIndex]); // Change values when clicked
        }
    }

    // Update the glow effect for hover
    updateGlow() {
        const transitionSpeed = 0.1;
        if (Math.abs(this.currentGlow - this.targetGlow) > 0.1) {
            this.currentGlow += (this.targetGlow - this.currentGlow) * transitionSpeed;
        } else {
            this.currentGlow = this.targetGlow;
        }
    }

    // Draw the symbol and its associated value
    draw() {
        this.updateGlow();

        // Apply glow effect using the filter (drop-shadow)
        this.ctx.filter = `drop-shadow(0 0 ${this.currentGlow}px blue)`;

        // Draw the symbol image
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        // Reset filter settings to avoid affecting other drawing operations
        this.ctx.filter = "none";

        // Draw the value (if any)
        this.value.draw();
    }
}
