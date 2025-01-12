export default class Score {
    score = 0;
    HIGHT_SCORE_KEY = "highScore";

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

    draw() {
        const highScore = Number(localStorage.getItem(this.HIGHT_SCORE_KEY));
        const y = 25;

        this.ctx.font = `15px 'Press Start 2P'`;
        this.ctx.fillStyle = "white";

        const scoreX = this.canvas.width - 75;
        const highScoreX = scoreX - 135;

        // Format score and high score
        const scorePadded = Math.floor(this.score).toString().padStart(5, 0);
        const highScorePadded = highScore.toString().padStart(5, 0);

        this.ctx.fillText(scorePadded, scoreX, y);
        this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
    }
}