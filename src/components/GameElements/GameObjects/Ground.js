import groundImageSrc from "../../../images/game-images/ground.png"

export default class Ground {
    constructor(ctx, width, height, speed) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.speed = speed; // Speed at which the ground moves

        this.x = 0; // Horizontal position of the ground
        this.y = this.canvas.height - this.height; // Position at the bottom of the canvas

        this.groundImage = new Image();
        this.groundImage.src = groundImageSrc
    }

    // Updates the ground's position to create the illusion of movement
    update(gameSpeed, frameTimeDelta) {
        this.x -= gameSpeed * frameTimeDelta * this.speed;
    }

    // Draws the ground on the canvas
    draw() {
        this.ctx.drawImage(
            this.groundImage,
            this.x,
            this.y,
            this.width,
            this.height)

        this.ctx.drawImage(
            this.groundImage,
            this.x + this.width,
            this.y,
            this.width,
            this.height)

        if (this.x < -this.width) {
            this.x = 0;
        }
    }

    // Resets the ground's position
    reset() {
        this.x = 0;
    }
}