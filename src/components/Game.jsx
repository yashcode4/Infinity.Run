import React, { useEffect } from 'react';
import main from './GameElements/main';

const Game = () => {
    useEffect(() => {
        main();
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <div className="container game-canvas">
            <canvas id="game"></canvas>
            <canvas id="game2"></canvas>
        </div>
    );
};

export default Game;

