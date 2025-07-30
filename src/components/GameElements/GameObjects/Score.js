import { getRankFromScore } from "./RankUtils.js";

export default class Score {
    score = 0; // Current score value
    HIGHT_SCORE_KEY = "highScore"; // Local storage key for high score
    SCORE_LIST_KEY = "topScores"; // Local storage key for top score list

    constructor(ctx, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.scaleRatio = scaleRatio;
    }

    // Increment score based on frame time
    update(frameTimeDelta) {
        this.score += frameTimeDelta * 0.01;
    }

    // Reset score to zero
    reset() {
        this.score = 0;
    }

    // Save high score to localStorage if current score is higher
    setHighScore() {
        const highScore = Number(localStorage.getItem(this.HIGHT_SCORE_KEY))
        if (this.score > highScore) {
            localStorage.setItem(this.HIGHT_SCORE_KEY, Math.floor(this.score));
        }
    }

    // Save the current score with mode, rank, and date to localStorage
    saveCurrentScore(mode) {
        const finalScore = Math.floor(this.score);
        const rank = getRankFromScore(finalScore); // calculate rank

        const newScore = {
            score: finalScore,
            mode,
            rank,
            date: new Date().toISOString().slice(0, 10)
        };

        const existing = JSON.parse(localStorage.getItem(this.SCORE_LIST_KEY)) || [];
        const updated = [newScore, ...existing].slice(0, 20); // Keep top 20 entries

        localStorage.setItem(this.SCORE_LIST_KEY, JSON.stringify(updated));
    }

    // Draw current score and high score
    draw() {
        // Retrieve values
        const highScore = Number(localStorage.getItem(this.HIGHT_SCORE_KEY));
        const scorePadded = Math.floor(this.score).toString().padStart(5, 0); // Add leading zeroes
        const highScorePadded = highScore.toString().padStart(5, 0);

        // Positions and layout
        const y = 18 * this.scaleRatio;
        const scoreX = this.canvas.width - 40 * this.scaleRatio;
        const highScoreX = scoreX - 120 * this.scaleRatio;

        // Draw background behind the scores
        const bgWidth = 230 * this.scaleRatio;
        const bgHeight = 19 * this.scaleRatio;
        const bgX = highScoreX - 68 * this.scaleRatio;
        const bgY = y - bgHeight;

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(bgX, bgY, bgWidth, bgHeight);

        // Draw score and high score values
        const fontSize = 16 * this.scaleRatio;
        this.ctx.font = `${fontSize}px 'Press Start 2P'`;
        this.ctx.fillStyle = "white";
        this.ctx.fillText(scorePadded, scoreX, y);
        this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
    }
}