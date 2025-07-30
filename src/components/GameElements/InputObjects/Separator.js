export default class Separator {
    constructor(ctx, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.scaleRatio = scaleRatio;

        // Colon position on canvas
        this.x = 100 * scaleRatio;
        this.y = 135 * scaleRatio;
    }

    // Draw a colon (:) as a visual separator between input and mode
    draw() {
        const fontSize = 150 * this.scaleRatio;
        this.ctx.font = `${fontSize}px Pixelify Sans`;
        this.ctx.fillStyle = "white";
        this.ctx.fillText(":", this.x, this.y); // Draw colon at specified position
    }
}
