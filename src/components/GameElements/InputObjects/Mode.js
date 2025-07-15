import pi_mode from "../../../images/mode-images/pi_mode.png";
/* import rootTwo_mode from "../../../images/mode-images/rootTwo_mode.png";
import rootThree_mode from "../../../images/mode-images/rootThree_mode.png";
import euler_mode from "../../../images/mode-images/euler_mode.png"; */
import ran_num_mode from "../../../images/mode-images/ran_num_mode.png";
import ran_let_mode from "../../../images/mode-images/ran_let_mode.png";
import ran_let_num_mode from "../../../images/mode-images/ran_let_num_mode.png";
import ran_spec_char_mode from "../../../images/mode-images/ran_spec_char_mode.png";
import binary_mode from "../../../images/mode-images/binary_mode.png";
import netflix_mode from "../../../images/mode-images/netflix_mode.png";
import marvel_mode from "../../../images/mode-images/marvel_mode.png";
import dc_mode from "../../../images/mode-images/dc_mode.png";
import anime_mode from "../../../images/mode-images/anime_mode.png";

export default class Mode {
    constructor(ctx, width, height, input) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;

        this.currentMode = ''; // Currently displayed mode
        this.currentIndex = 0; // Index of the current mode in the array
        this.typedInput = ''; // Input typed by the user

        // Position of the mode on canvas
        this.x = 10;
        this.y = 65;

        // Arrays of mode images and their associated keys
        this.modeImages = [
            pi_mode,
            // rootTwo_mode, 
            // rootThree_mode, 
            // euler_mode,
            ran_num_mode,
            ran_let_mode,
            ran_let_num_mode,
            ran_spec_char_mode,
            binary_mode,
            netflix_mode,
            marvel_mode,
            dc_mode,
            anime_mode];

        this.modeKeys = [
            "π",
            // "√2",
            // "√3",
            // "e",
            "123",
            "ABC",
            "ABC123",
            "@#$",
            "01",
            "net",
            "mar",
            "dc",
            "ani"];

        this.currentIndex = 0; // Start with the first mode image
        this.image = this.loadImage(this.modeImages[this.currentIndex]); // Load the first mode image

        // Update the displayed input when a new mode is selected
        this.input = input;
        this.input.updateMode(this.modeKeys[this.currentIndex]);

        this.modeChangeEnabled = true; // mode switch

        // Hover effects variables
        this.isHovered = false;
        this.currentGlow = 0; // Current shadow blur for hover effect
        this.targetGlow = 0; // Target shadow blur for hover effect

        // Event listeners for hover and click
        this.canvas.addEventListener("mousemove", (e) => this.handleMouseMove(e));
        this.canvas.addEventListener("click", (e) => this.handleClick(e));
    }

    // Load an image from the source, change the mode when click
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

        // Check if the mouse is hovering over the mode
        const isHovering = mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
        this.targetGlow = isHovering ? 5 : 0;
        this.canvas.style.cursor = isHovering ? "pointer" : "default";
        this.isHovered = isHovering;
    }

    // Handle mouse click (to switch modes)
    handleClick(event) {
        if (this.isHovered && this.modeChangeEnabled) {
            this.currentIndex = (this.currentIndex + 1) % this.modeImages.length;
            this.image = this.loadImage(this.modeImages[this.currentIndex]); // Change mode when clicked
            this.input.updateMode(this.modeKeys[this.currentIndex]); // Change input when clicked
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

    // Draw the mode and its associated input
    draw() {
        this.updateGlow();

        // Apply glow effect using the filter (drop-shadow)
        this.ctx.filter = `drop-shadow(0 0 ${this.currentGlow}px blue)`;

        // Draw the mode image
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        // Reset filter settings to avoid affecting other drawing operations
        this.ctx.filter = "none";

        // Draw the input (if any)
        this.input.draw();
    }
}
