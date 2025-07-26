// Obstacle images
import obsImage1 from "../../images/game-images/obs_1.png";
import obsImage2 from "../../images/game-images/obs_2.png";
import obsImage3 from "../../images/game-images/obs_3.png";
import obsImage4 from "../../images/game-images/obs_4.png";
import obsImage5 from "../../images/game-images/obs_5.png";
import obsImage6 from "../../images/game-images/obs_6.png";

// Game Objects
import Player from './GameObjects/Player';
import Ground from './GameObjects/Ground';
import ObsController from './GameObjects/ObsController';
import Score from './GameObjects/Score';

// Input Objects
import Mode from "./InputObjects/Mode";
import Separator from "./InputObjects/Separator";
import Input from "./InputObjects/Input";

// Main function to initialize and start the Game
export default function main() {
    // Get the canvas element and its 2D rendering context
    const canvas = document.getElementById("game"); // First canvas
    const ctx = canvas.getContext("2d");

    const canvas2 = document.getElementById("game2"); // Second canvas 
    const ctx2 = canvas2.getContext("2d");

    // Game settings and configurations
    const GAME_SPEED_START = 1; // Initial game speed
    const GAME_SPEED_INCREMENT = 0.00001; // Speed increase over time

    // Canvas Dimensions
    const GAME_WIDTH = 1280;
    const GAME_HEIGHT = 210;
    const GAME_WIDTH2 = 1200;
    const GAME_HEIGHT2 = 200;

    // Player's dimensions
    const PLAYER_WIDTH = 88 / 1.5;
    const PLAYER_HEIGHT = 94 / 1.5;

    // Player's jump height limits
    const MAX_JUMP_HEIGHT = GAME_HEIGHT;
    const MIN_JUMP_HEIGHT = 150;

    // Ground properties
    const GROUND_WIDTH = 2400;
    const GROUND_HEIGHT = 24;
    const GROUND_AND_OBSTACLE_SPEED = 0.5; // Movement speed for ground and obstacles

    // Obstacles configuration: width, height, and images
    const OBSTACLES_CONFIG = [
        { width: 30 / 1.5, height: 100 / 1.5, image: obsImage1 },
        { width: 80 / 1.5, height: 100 / 1.5, image: obsImage2 },
        { width: 56 / 1.5, height: 70 / 1.5, image: obsImage3 },
        { width: 90 / 1.5, height: 70 / 1.5, image: obsImage4 },
        { width: 30 / 1.5, height: 83 / 1.5, image: obsImage5 },
        { width: 30 / 1.5, height: 108 / 1.5, image: obsImage6 }
    ];

    // Mode dimensions
    const MODE_ICON_WIDTH = 70;
    const MODE_ICON_HEIGHT = 70;

    // Declare game objects and state variables
    let player = null; // The player character
    let ground = null; // The ground
    let obsController = null; // Controls obstacles generation and movement
    let score = null; // Score tracker

    // Canvas2 objects
    let mode = null;
    let separator = null;
    let input = null;

    let previousTime = null; // Keeps track of the last frame's time
    let gameSpeed = GAME_SPEED_START; // Current game speed
    let gameOver = false; // Indicates if the game is over
    let hasAddEventListenerForRestart = false; // Ensures event listener for restarting is added only once
    let waitingToStart = true; // Indicates if the game is waiting for the player to start

    // Create and initialize game objects
    function createSprites() {
        // Create player object
        player = new Player(ctx, PLAYER_WIDTH, PLAYER_HEIGHT, MIN_JUMP_HEIGHT, MAX_JUMP_HEIGHT);

        // Create ground object
        ground = new Ground(ctx, GROUND_WIDTH, GROUND_HEIGHT, GROUND_AND_OBSTACLE_SPEED);

        // Load obstacle images into objects with dimensions
        const obstaclesImages = OBSTACLES_CONFIG.map((obstacle) => {
            const image = new Image();
            image.src = obstacle.image;
            return {
                image: image,
                width: obstacle.width,
                height: obstacle.height,
            };
        });

        // Create obstacles controller and score
        obsController = new ObsController(ctx, obstaclesImages, GROUND_AND_OBSTACLE_SPEED);
        score = new Score(ctx);

        // Canvas2 Objects
        input = new Input(ctx2, player); // pass player for jumpPressed state
        separator = new Separator(ctx2);
        mode = new Mode(ctx2, MODE_ICON_WIDTH, MODE_ICON_HEIGHT, input); // pass input
    }

    // Set canvas dimensions and initialize game objects
    function setScreen() {
        canvas.width = GAME_WIDTH;
        canvas.height = GAME_HEIGHT;

        canvas2.width = GAME_WIDTH2;
        canvas2.height = GAME_HEIGHT2;

        createSprites();
    }

    // Clear canvases for the next frame
    function clearScreen() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    }

    // Set up game reset on game over
    function setupGameReset() {
        if (!hasAddEventListenerForRestart) {
            hasAddEventListenerForRestart = true;

            // Define the event handler function
            const handleKeyUp = (event) => {

                if (event.key === " " && gameOver) {
                    reset();

                    // After reset, remove the event listener to avoid further calls
                    document.removeEventListener("keyup", handleKeyUp);
                }
            };

            // Add an event listener to reset the game after a delay
            setTimeout(() => {
                document.addEventListener("keyup", handleKeyUp);
            }, 1000);
        }
    }

    // Reset the game to its initial state
    function reset() {
        hasAddEventListenerForRestart = false;
        gameOver = false;
        waitingToStart = true; //Wait for a new start after reset
        ground.reset();
        obsController.reset();
        score.reset();
        gameSpeed = GAME_SPEED_START;

        player.reset();
        player.playerCollided = false;

        mode.modeChangeEnabled = true;
        input.inputDisabled = false;

        // Reset the mode's input 
        input.resetInput();
    }

    // "Game Start" text
    function showStartGameText() {
        const fontSize = 90;
        ctx.font = `${fontSize}px Pixelify Sans`;
        ctx.fillStyle = "white";
        const x = 418;
        const y = 120;
        ctx.fillText("Let's Go !!!", x, y);
    }

    // "Game Over" text
    function showGameOver() {
        const fontSize = 120;
        ctx.font = `${fontSize}px Pixelify Sans`;
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;

        const x = 335;
        const y = 78;

        ctx.strokeText("GAME OVER", x, y);
        ctx.fillText("GAME OVER", x, y);

        const fontSize2 = 30;
        ctx.font = `${fontSize2}px Pixelify Sans`;
        const x2 = 500;
        const y2 = 120;

        ctx.strokeText("Space for Restart", x2, y2);
        ctx.fillText("Space for Restart", x2, y2);
    }

    // Gradually increase the game speed
    function updateGameSpeed(frameTimeDelta) {
        gameSpeed += frameTimeDelta * GAME_SPEED_INCREMENT;
    }

    // Main game loop: updates game objects and handles drawing
    function gameLoop(currentTime) {
        if (previousTime == null) {
            previousTime = currentTime;
            requestAnimationFrame(gameLoop);
            return;
        }

        // Calculate time elapsed since the last frame
        const frameTimeDelta = currentTime - previousTime;
        previousTime = currentTime;

        // Clear the screen for the new frame
        clearScreen();

        // Update game objects if the game is running
        if (!gameOver && !waitingToStart) {
            ground.update(gameSpeed, frameTimeDelta);
            obsController.update(gameSpeed, frameTimeDelta);
            player.update(gameSpeed, frameTimeDelta);
            score.update(frameTimeDelta);
            updateGameSpeed(frameTimeDelta);

            mode.modeChangeEnabled = false; // disable mode change during game progress
        }

        // Check for collisions and handle game over
        if (!gameOver && obsController.collideWith(player)) {
            gameOver = true;
            player.playerCollided = true;
            setupGameReset();
            score.saveCurrentScore(input.currentMode, player.rank);
            score.setHighScore();

            input.inputDisabled = true; // disable input when game over
        }

        // Draw game objects
        ground.draw();
        obsController.draw();
        player.draw();
        score.draw();

        // Draw objects on the second canvas
        mode.draw();
        separator.draw();

        // Show "Game Over" or "Start Game" texts if needed
        if (waitingToStart) {
            showStartGameText();
        }
        if (gameOver) {
            showGameOver();
        }

        // Request the next animation frame
        requestAnimationFrame(gameLoop);
    }

    // Initialize the game
    setScreen();
    requestAnimationFrame(gameLoop);

    // Start the game when the right key is pressed and waitingToStart is true
    document.addEventListener("keydown", (event) => {
        if (waitingToStart && event.key === input.inputToMatch) {
            waitingToStart = false;
        }
    });
}
