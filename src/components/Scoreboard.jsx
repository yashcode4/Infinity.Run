import React, { useState, useEffect } from "react";

const Scoreboard = () => {
  // State for scores
  const [scores, setScores] = useState([]);
  const [confirmingDelete, setConfirmingDelete] = useState(false);


  useEffect(() => {
    const stored = localStorage.getItem("topScores");
    if (stored) {
      setScores(JSON.parse(stored));
    }
  }, []);

  // Function to clear scores
  const deleteScores = () => {
    if (!confirmingDelete) {
      setConfirmingDelete(true); // First click: ask for confirmation
      // Revert back to normal after 3 seconds (optional)
      setTimeout(() => setConfirmingDelete(false), 3000);
    } else {
      // Second click: actually delete scores
      localStorage.removeItem("topScores"); // delete top scores list
      localStorage.removeItem("highScore"); // delete high score
      setScores([]);                        // delete table state
      setConfirmingDelete(false); // Reset button
    }
  };

  return (
    <>
      <div className="scoreboard-container">

        {/* Header */}
        <div className="scoreboard-header">
          <h1 className="scoreboard-title">Scoreboard</h1>

          <button className="btn-clear-scores" onClick={deleteScores}>
            {confirmingDelete ? "Are You Sure ?" : "Delete Scores"}
          </button>
        </div>

        {/* Table Container */}
        <div className="scoreboard-table-wrapper">
          <table>
            <colgroup>
              <col style={{ width: "18%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "22%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
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
