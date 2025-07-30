import groundImageSrc from "../../../images/game-images/ground.png"

export default class Ground {
    constructor(ctx, width, height, speed, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.speed = speed; // Ground movement speed factor
        this.scaleRatio = scaleRatio;

        this.x = 0; // Initial horizontal position
        this.y = this.canvas.height - this.height; // Align to bottom of canvas

        this.groundImage = new Image();
        this.groundImage.src = groundImageSrc
    }

    // Updates the ground's position to create the illusion of movement
    update(gameSpeed, frameTimeDelta) {
        // Shift ground left over time to simulate forward movement
        this.x -= gameSpeed * frameTimeDelta * this.speed * this.scaleRatio;
    }

    // Draws two ground images side-by-side to create an endless scrolling effect
    draw() {
        // Save the current canvas state
        this.ctx.save();

        // Slight transparency effect for ground
        this.ctx.globalAlpha = 0.7;

        // First ground image
        this.ctx.drawImage(
            this.groundImage,
            this.x,
            this.y,
            this.width,
            this.height
        );

        // Second ground image placed right next to the first
        this.ctx.drawImage(
            this.groundImage,
            this.x + this.width,
            this.y,
            this.width,
            this.height
        );

        // Restore the original canvas state (opacity)
        this.ctx.restore();

        // Reset ground position if it goes off-screen
        if (this.x < -this.width) {
            this.x = 0;
        }
    }

    // Reset ground to its original starting position
    reset() {
        this.x = 0;
    }
}