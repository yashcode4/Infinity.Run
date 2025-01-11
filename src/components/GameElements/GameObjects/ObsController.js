import Obstacle from "./Obstacle";

export default class ObsController {
    // Minimum and maximum intervals for obstacle creation
    OBSTACLES_INTERVAL_MIN = 500;
    OBSTACLE_INTERVAL_MAX = 2000;

    // Time until the next obstacle spawns
    nextObstacleInterval = null;

    // List of active obstacles
    obstacles = [];

    constructor(ctx, obstaclesImages, speed) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.obstaclesImages = obstaclesImages;
        this.speed = speed;

        // Initialize the next obstacle interval
        this.setNextObstacleTime();
    }

    // Sets the interval until the next obstacle spawns
    setNextObstacleTime() {
        const num = this.getRandomNumber(
            this.OBSTACLES_INTERVAL_MIN,
            this.OBSTACLE_INTERVAL_MAX
        );

        this.nextObstacleInterval = num;
    }

    // Generates a random number between min and max
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Creates a new obstacle and adds it to the list
    createObstacle() {
        // Randomly select an obstacle image
        const index = this.getRandomNumber(0, this.obstaclesImages.length - 1);
        const obstacleImage = this.obstaclesImages[index];

        // Calculate obstacle's starting position
        const x = this.canvas.width * 1.5;
        const y = this.canvas.height - obstacleImage.height - 2;

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

    // Update obstacles and spawn timing
    update(gameSpeed, frameTimeDelta) {
        // Check if it's time to spawn a new obstacle
        if (this.nextObstacleInterval <= 0) {
            this.createObstacle();
            this.setNextObstacleTime(); // Reset spawn interval
        }
        this.nextObstacleInterval -= frameTimeDelta; // Decrease timer

        // Move all obstacles
        this.obstacles.forEach((obstacle) => {
            obstacle.update(this.speed, gameSpeed, frameTimeDelta);
        });

        // Remove obstacles that move off-screen
        this.obstacles = this.obstacles.filter((obstacle) => obstacle.x > -obstacle.width);
    }

    draw() {
        this.obstacles.forEach((obstacle) => obstacle.draw());
    }

    // Check if obstacle collides with player
    collideWith(sprite) {
        return this.obstacles.some((obstacle) => obstacle.collideWith(sprite));
    }

    // Clear all obstacles
    reset() {
        this.obstacles = [];
    }
}