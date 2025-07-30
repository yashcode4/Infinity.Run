// Represents a single obstacle
export default class Obstacle {
    constructor(ctx, x, y, width, height, image) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image; // Obstacle image to draw
    }

    // Update obstacle position (moves to the left)
    update(speed, gameSpeed, frameTimeDelta, scaleRatio) {
        this.x -= speed * gameSpeed * frameTimeDelta * scaleRatio;
    }

    // Draw obstacle on canvas
    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    // Basic rectangle collision check with player
    collideWith(sprite) {
        const adjustBy = 1.4; // Slightly shrink collision box for better gameplay feel
        if (
            sprite.x < this.x + this.width / adjustBy &&
            sprite.x + sprite.width / adjustBy > this.x &&
            sprite.y < this.y + this.height / adjustBy &&
            sprite.height + sprite.y / adjustBy > this.y
        ) {
            return true;
        } else {
            return false;
        }
    }
}