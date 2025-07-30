import Obstacle from "./Obstacle";

export default class ObsController {
    // Minimum and maximum interval (in ms) between obstacle spawns
    OBSTACLES_INTERVAL_MIN = 500;
    OBSTACLE_INTERVAL_MAX = 2000;

    // Countdown until next obstacle appears
    nextObstacleInterval = null;

    // Active obstacles on screen
    obstacles = [];

    constructor(ctx, obstaclesImages, scaleRatio, speed) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.obstaclesImages = obstaclesImages;  // Array of obstacle image objects
        this.scaleRatio = scaleRatio;
        this.speed = speed; // Horizontal scrolling speed for obstacles

        // Initialize the next obstacle interval
        this.setNextObstacleTime(); // Initialize spawn timer
    }

    // Set random time for next obstacle spawn
    setNextObstacleTime() {
        const num = this.getRandomNumber(
            this.OBSTACLES_INTERVAL_MIN,
            this.OBSTACLE_INTERVAL_MAX
        );

        this.nextObstacleInterval = num;
    }

    // Generate a random number between min and max (inclusive)
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Create a new obstacle instance and add to the list
    createObstacle() {
        // Randomly select an obstacle image
        const index = this.getRandomNumber(0, this.obstaclesImages.length - 1);
        const obstacleImage = this.obstaclesImages[index];

        // Calculate obstacle's starting position
        const x = this.canvas.width * 1.5; // Start off-screen
        const y = this.canvas.height - obstacleImage.height - 7 * this.scaleRatio; // Ground aligned

        // Create and add a new obstacle instance
        const obstacle = new Obstacle(
            this.ctx,
            x,
            y,
            obstacleImage.width,
            obstacleImage.height,
            obstacleImage.image
        );

        this.obstacles.push(obstacle); // Add to the list
    }

    // Update all obstacles and manage spawn timing
    update(gameSpeed, frameTimeDelta) {
        // Check if it's time to spawn a new obstacle
        if (this.nextObstacleInterval <= 0) {
            this.createObstacle();
            this.setNextObstacleTime(); // Reset spawn interval
        }
        this.nextObstacleInterval -= frameTimeDelta; // Decrease timer

        // Move / Update all obstacles positions
        this.obstacles.forEach((obstacle) => {
            obstacle.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
        });

        // Remove obstacles that move off-screen
        this.obstacles = this.obstacles.filter((obstacle) => obstacle.x > -obstacle.width);
    }

    // Draw all active obstacles on canvas
    draw() {
        this.obstacles.forEach((obstacle) => obstacle.draw());
    }

    // Check for collision between any obstacle and the player
    collideWith(sprite) {
        return this.obstacles.some((obstacle) => obstacle.collideWith(sprite));
    }

    // Clear all current obstacles
    reset() {
        this.obstacles = [];
    }
}