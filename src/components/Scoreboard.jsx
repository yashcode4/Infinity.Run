import { useState, useEffect } from "react";

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
      <div className="layout score-wrap">

        {/* Header */}
        <div className="score-head">
          <h1>Scoreboard</h1>

          <button className="clear-btn" onClick={deleteScores}>
            {confirmingDelete ? "Are You Sure ?" : "Delete Scores"}
          </button>
        </div>

        {/* Table Container */}
        {scores.length > 0 ? (
          <div className="table-wrap">
            <table className="table">
              <colgroup>
                <col style={{ width: "18%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "22%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>

              <thead>
                <tr>
                  <th>Index</th>
                  <th>Mode</th>
                  <th>Rank</th>
                  <th>Score</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {scores.map((entry, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{entry.mode}</td>
                    <td className={`rank ${entry.rank.toLowerCase()}`}>{entry.rank}</td>
                    <td>{entry.score}</td>
                    <td>{entry.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-scores-box">
            No scores available
          </div>
        )}
      </div>
    </>
  );
};

export default Scoreboard;
