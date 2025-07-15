export default class Separator {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;

        this.x = 100; 
        this.y = 135; 
    }                            

    draw() {
        this.ctx.font = `150px Pixelify Sans`;
        this.ctx.fillStyle = "white";
        this.ctx.fillText(":", this.x, this.y); // Draw colon at specified position
    }
}

