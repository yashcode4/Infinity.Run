import React, { useState, useEffect } from "react";

const Scoreboard = () => {
  // State for scores
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("topScores");
    if (stored) {
      setScores(JSON.parse(stored));
    }
  }, []);

  // Function to clear scores
  const clearScores = () => {
    const confirmClear = window.confirm("Are you sure you want to clear all scores?");
    if (confirmClear) {
      localStorage.removeItem("topScores");     // Clear top scores list
      localStorage.removeItem("highScore");     // Clear high score
      setScores([]);                            // Clear table state
    }
  };

  return (
    <>
      <div className="scoreboard-container">

        {/* Header */}
        <div className="scoreboard-header">
          <h1 className="scoreboard-title">Scoreboard</h1>
          <div className="scoreboard-actions">
            <button className="btn-clear-scores" onClick={clearScores}>Clear Scores</button>
            <button className="btn-help">Help</button>
          </div>

        </div>

        {/* Table Container */}
        <div className="scoreboard-table-wrapper">
          <table>
            <thead>
              <tr>
                <th className="col-index">Index</th>
                <th className="col-mode">Mode</th>
                <th className="col-rank">Rank</th>
                <th className="col-score">Score</th>
                <th className="col-date">Date</th>
              </tr>
            </thead>

            <tbody>
              {scores.length > 0 ? (
                scores.map((entry, i) => (
                  <tr key={i}>
                    <td className="cell-index">{i + 1}</td>
                    <td className="cell-mode">{entry.mode}</td>
                    <td className={`rank ${entry.rank.toLowerCase()}`}>{entry.rank}</td>
                    <td className="cell-score">{entry.score}</td>
                    <td className="cell-date">{entry.date}</td>
                  </tr>
                ))
              ) : (
                <tr className="scoreboard-empty-row">
                  <td colSpan="5">No scores available</td>
                </tr>
              )}
            </tbody>

          </table>

        </div>

      </div>
    </>
  );
};

export default Scoreboard;
