import playerStillImg from '../../../images/game-images/standing_still.png';
import playerCollidedImg from '../../../images/game-images/game_over.png';
import playerRunImg1 from '../../../images/game-images/run_image1.png';
import playerRunImg2 from '../../../images/game-images/run_image2.png';

export default class Player {
    constructor(ctx, width, height, minJumpHeight, maxJumpHeight) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.minJumpHeight = minJumpHeight;
        this.maxJumpHeight = maxJumpHeight;

        this.x = 20; // Starting x position
        this.y = this.canvas.height - this.height; // Starting y position
        this.yStandingPosition = this.y;

        // Standing Image
        this.standingStillImage = new Image();
        this.standingStillImage.src = playerStillImg;
        this.image = this.standingStillImage;

        // Collided Image
        this.collidedImage = new Image();
        this.collidedImage.src = playerCollidedImg;
        this.playerCollided = false;

        // Running Images
        this.playerRun1 = new Image();
        this.playerRun1.src = playerRunImg1;
        this.playerRun2 = new Image();
        this.playerRun2.src = playerRunImg2;

        // Walk animation settings
        this.WALK_ANIMATION_TIMER = 200;
        this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;

        // Physics constants for jumping
        this.JUMP_SPEED = 0.6;
        this.GRAVITY = 0.4;

        // Jumping flags
        this.jumpPressed = false;
        this.jumpInProgress = false;
        this.falling = false;
    }

    // Update player's running and jumping states
    update(gameSpeed, frameTimeDelta) {
        this.run(gameSpeed, frameTimeDelta);
        this.jump(frameTimeDelta);
    }

    // Jump logics
    jump(frameTimeDelta) {
        // Handle jumping
        if (this.jumpPressed) this.jumpInProgress = true;

        // Jump upwards until max height
        if (this.jumpInProgress && !this.falling) {
            if (this.y > this.canvas.height - this.minJumpHeight ||
                (this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed)) {
                this.y -= this.JUMP_SPEED * frameTimeDelta;
            } else {
                this.falling = true; // Start falling after reaching peak
            }
        } else if (this.y < this.yStandingPosition) {
            // If player is falling, apply gravity
            this.y += this.GRAVITY * frameTimeDelta;
            if (this.y >= this.yStandingPosition) {
                // Once player reaches ground, stop falling and reset state
                this.y = this.yStandingPosition;
                this.falling = false;
                this.jumpInProgress = false;
            }
        }
    }

    // Run logic
    run(gameSpeed, frameTimeDelta) {
        if (this.walkAnimationTimer <= 0) {
            // Toggle running images
            this.image = this.image === this.playerRun1 ? this.playerRun2 : this.playerRun1;
            this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
        }
        this.walkAnimationTimer -= frameTimeDelta * gameSpeed;
    }

    draw() {
        // player image (either running or collided)
        this.ctx.drawImage(this.playerCollided ? this.collidedImage : this.image, this.x, this.y, this.width, this.height);
    }

    reset() {
        this.y = this.canvas.height - this.height - 1.5; // Ensure player starts on the ground
        this.image = this.standingStillImage; // Set standing image

        // Reset Player's jump and falling states
        this.jumpPressed = false;
        this.jumpInProgress = false;
        this.falling = false;
    }
}
