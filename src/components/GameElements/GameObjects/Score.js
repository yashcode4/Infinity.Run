import { getRankFromScore } from "./RankUtils.js";

export default class Score {
    score = 0;
    HIGHT_SCORE_KEY = "highScore";
    SCORE_LIST_KEY = "topScores";

    constructor(ctx) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
    }

    // Increment score based on frame time
    update(frameTimeDelta) {
        this.score += frameTimeDelta * 0.01;
    }

    reset() {
        this.score = 0;
    }

    // Update high score in localStorage if current score is higher
    setHighScore() {
        const highScore = Number(localStorage.getItem(this.HIGHT_SCORE_KEY))
        if (this.score > highScore) {
            localStorage.setItem(this.HIGHT_SCORE_KEY, Math.floor(this.score));
        }
    }

    // Save the current score + rank + metadata
    saveCurrentScore(mode = "Unknown") {
        const finalScore = Math.floor(this.score);
        const rank = getRankFromScore(finalScore); // calculate rank

        const newScore = {
            score: finalScore,
            mode,
            rank,
            date: new Date().toISOString().slice(0, 10)
        };

        const existing = JSON.parse(localStorage.getItem(this.SCORE_LIST_KEY)) || [];
        const updated = [newScore, ...existing].slice(0, 20); // Top 20 only

        localStorage.setItem(this.SCORE_LIST_KEY, JSON.stringify(updated));
    }


    draw() {
        // Retrieve values
        const highScore = Number(localStorage.getItem(this.HIGHT_SCORE_KEY));
        const scorePadded = Math.floor(this.score).toString().padStart(5, 0);
        const highScorePadded = highScore.toString().padStart(5, 0);

        // Layout constants
        const y = 18;
        const scoreX = this.canvas.width - 80;
        const highScoreX = scoreX - 135;

        // Draw background behind the scores
        const bgWidth = 220;
        const bgHeight = 18;
        const bgX = highScoreX - 1;
        const bgY = y - bgHeight;

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(bgX, bgY, bgWidth, bgHeight);

        // Draw score and high score text
        this.ctx.font = `16px 'Press Start 2P'`;
        this.ctx.fillStyle = "white";
        this.ctx.fillText(scorePadded, scoreX, y);
        this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
    }
}