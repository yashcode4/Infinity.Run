import { useEffect } from 'react';
import main from './GameElements/main';

const Game = () => {
    // Prevent `main()` from running twice in React StrictMode (dev mode).
    // React intentionally double-invokes useEffect to detect side-effects.
    let hasInitialized = false;

    useEffect(() => {
        if (!hasInitialized) {
            hasInitialized = true;
            main();
        }
    }, []); // Runs ONLY ONCE after the first render

    return (
        <div className="container game-canvas">
            <canvas id="game"></canvas>
            <canvas id="game2"></canvas>
        </div>
    );
};

export default Game;

