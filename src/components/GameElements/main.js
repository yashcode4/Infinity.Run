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
    // Get canvas and its 2D rendering context
    const canvas = document.getElementById("game"); // First canvas
    const ctx = canvas.getContext("2d");
    const canvas2 = document.getElementById("game2"); // Second canvas 
    const ctx2 = canvas2.getContext("2d");

    // Game settings and configurations
    const GAME_SPEED_START = 1; // Initial game speed
    const GAME_SPEED_INCREMENT = 0.00001; // Speed increase over time

    // Canvas Dimensions
    const GAME_WIDTH = 1280, GAME_HEIGHT = 210;
    const GAME_WIDTH2 = 1150, GAME_HEIGHT2 = 180;

    // Player's dimensions
    const PLAYER_WIDTH = 88 / 1.5, PLAYER_HEIGHT = 94 / 1.5;

    // Player's jump height limits
    const MAX_JUMP_HEIGHT = GAME_HEIGHT, MIN_JUMP_HEIGHT = 150;

    // Ground properties
    const GROUND_WIDTH = 2400, GROUND_HEIGHT = 24;
    const GROUND_AND_OBSTACLE_SPEED = 0.5; // Movement speed for ground and obstacles

    // Mode icon dimensions
    const MODE_ICON_WIDTH = 70, MODE_ICON_HEIGHT = 70;

    // Obstacles configuration: width, height, and images
    const OBSTACLES_CONFIG = [
        { width: 30 / 1.5, height: 100 / 1.5, image: obsImage1 },
        { width: 80 / 1.5, height: 100 / 1.5, image: obsImage2 },
        { width: 56 / 1.5, height: 70 / 1.5, image: obsImage3 },
        { width: 90 / 1.5, height: 70 / 1.5, image: obsImage4 },
        { width: 30 / 1.5, height: 83 / 1.5, image: obsImage5 },
        { width: 30 / 1.5, height: 108 / 1.5, image: obsImage6 }
    ];

    // Game objects
    let player, ground, obsController, score;
    let mode, separator, input;

    // Game state
    let scaleRatio = null;
    let previousTime = null; // Keeps track of the last frame's time
    let gameSpeed = GAME_SPEED_START; // Current game speed
    let gameOver = false; // Indicates if the game is over
    let hasAddEventListenerForRestart = false; // Ensures event listener for restarting is added only once
    let waitingToStart = true; // Indicates if the game is waiting for the player to start

    // Handles game start input on initial load and after resize
    function handleStartKey(event) {
        // Start the game when correct key is pressed and it's in waiting state
        if (waitingToStart && event.key === input.inputToMatch) {
            waitingToStart = false;
        }
    }

    // Initialize all game objects
    function createSprites() {
        const playerWidth = PLAYER_WIDTH * scaleRatio;
        const playerHeight = PLAYER_HEIGHT * scaleRatio;
        const minJumpHeight = MIN_JUMP_HEIGHT * scaleRatio;
        const maxJumpHeight = MAX_JUMP_HEIGHT * scaleRatio;

        const groundWidth = GROUND_WIDTH * scaleRatio;
        const groundHeight = GROUND_HEIGHT * scaleRatio;;

        // Create player object
        player = new Player(ctx, playerWidth, playerHeight, minJumpHeight, maxJumpHeight, scaleRatio);

        // Create ground object
        ground = new Ground(ctx, groundWidth, groundHeight, GROUND_AND_OBSTACLE_SPEED, scaleRatio);

        // Load obstacle images into objects with dimensions
        const obstacles = OBSTACLES_CONFIG.map(o => {
            const img = new Image();
            img.src = o.image;
            return { image: img, width: o.width * scaleRatio, height: o.height * scaleRatio };
        });

        // Create obstacles controller object
        obsController = new ObsController(ctx, obstacles, scaleRatio, GROUND_AND_OBSTACLE_SPEED);

        // Create score object
        score = new Score(ctx, scaleRatio);

        // Canvas2 Objects
        input = new Input(ctx2, player, scaleRatio); // pass player for jumpPressed state
        separator = new Separator(ctx2, scaleRatio);
        mode = new Mode(ctx2, MODE_ICON_WIDTH, MODE_ICON_HEIGHT, input, scaleRatio); // pass input
    }

    // Set canvas sizes and scale ratio
    function setScreen() {
        scaleRatio = getScaleRatio();

        canvas.width = GAME_WIDTH * scaleRatio;
        canvas.height = GAME_HEIGHT * scaleRatio;

        canvas2.width = GAME_WIDTH2 * scaleRatio;
        canvas2.height = GAME_HEIGHT2 * scaleRatio;

        createSprites();
    }

    // Return scale ratio based on screen size
    function getScaleRatio() {
        const screenHeight = Math.min(
            window.innerHeight,
            document.documentElement.clientHeight
        );

        const screenWidth = Math.min(
            window.innerWidth,
            document.documentElement.clientWidth
        );

        //window is wider than the game width
        if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
            return screenWidth / GAME_WIDTH;
        } else {
            return screenHeight / GAME_HEIGHT;
        }
    }

    // Clear both canvas for the next frame
    function clearScreen() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    }

    // Resets game state and objects when window is resized
    function resetOnResize() {
        // Clear both canvases to remove any existing drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

        // Reset essential game state variables
        previousTime = null;
        hasAddEventListenerForRestart = false;
        gameOver = false;
        waitingToStart = true;
        gameSpeed = GAME_SPEED_START;

        // Recalculate dimensions and recreate game objects
        setScreen();

        // Reconnect key listener after recreating input
        document.removeEventListener("keydown", handleStartKey);
        document.addEventListener("keydown", handleStartKey);
    }

    // Set up game reset on game over
    function setupGameReset() {
        if (hasAddEventListenerForRestart) return;
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
        }, 500);
    }

    // Reset all game state to its initial state
    function reset() {
        hasAddEventListenerForRestart = false;
        gameOver = false;
        waitingToStart = true; //Wait for a new start after reset
        gameSpeed = GAME_SPEED_START;

        ground.reset();
        obsController.reset();
        score.reset();
        player.reset();
        player.playerCollided = false;

        mode.modeChangeEnabled = true;
        input.inputDisabled = false;
        input.resetInput();
    }

    // Display "Let's Go!!!" before game starts
    function showStartGameText() {
        const fontSize = 95 * scaleRatio;
        ctx.font = `${fontSize}px Pixelify Sans`;
        ctx.fillStyle = "white";
        ctx.textAlign = "center";

        const x = canvas.width / 2;
        const y = canvas.height / 1.65;
        ctx.fillText("Let's Go !!!", x, y);
    }

    // Display "Game Over" message
    function showGameOver() {
        const x = canvas.width / 2;
        const y = canvas.height / 2.7;
        const y2 = canvas.height / 1.8;

        const fontSize = 120 * scaleRatio;
        const smallFont = 30 * scaleRatio;

        ctx.font = `${fontSize}px Pixelify Sans`;
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.textAlign = "center";

        ctx.strokeText("GAME OVER", x, y);
        ctx.fillText("GAME OVER", x, y);

        ctx.font = `${smallFont}px Pixelify Sans`;
        ctx.strokeText("Space for Restart", x, y2);
        ctx.fillText("Space for Restart", x, y2);
    }

    // Increase game speed gradually
    function updateGameSpeed(frameTimeDelta) {
        gameSpeed += frameTimeDelta * GAME_SPEED_INCREMENT;
    }

    // Game loop: update and draw everything
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
            score.saveCurrentScore(input.currentMode);
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
        if (waitingToStart) showStartGameText();
        if (gameOver) showGameOver();

        // Request the next animation frame
        requestAnimationFrame(gameLoop);
    }

    // Initialize the game
    setScreen();
    requestAnimationFrame(gameLoop);

    // Attach key listener to start the game when player presses the correct key on first load
    document.addEventListener("keydown", handleStartKey);

    // Trigger game reset and re-initialize on window resize
    window.addEventListener("resize", resetOnResize);
}
