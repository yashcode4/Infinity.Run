import React, { useState } from "react";

const Scoreboard = () => {
  // State for scores
  const [scores, setScores] = useState([
    { index: 1, mode: "Binary", rank: 'Noob', score: 1000, date: '2025-07-24' },
    { index: 2, mode: "Netflix", rank: 'Learner', score: 2000, date: '2025-07-24' },
    { index: 3, mode: "PiMode", rank: 'Amateur', score: 3000, date: '2025-07-23' },
    { index: 4, mode: "PiMode", rank: 'Average', score: 4000, date: '2025-07-23' },
    { index: 5, mode: "Characters", rank: 'Skilled', score: 5000, date: '2025-07-22' },
    { index: 6, mode: "CharNum", rank: 'Pro', score: 6000, date: '2025-07-22' },
    { index: 7, mode: "SpecChar", rank: 'Elite', score: 7000, date: '2025-07-21' },
    { index: 8, mode: "DCMode", rank: 'Lethal', score: 8000, date: '2025-07-21' },
    { index: 9, mode: "Anime", rank: 'Master', score: 9000, date: '2025-07-20' },
    { index: 10, mode: "Marvel", rank: 'Conqueror', score: 10000, date: '2025-07-20' },
    { index: 11, mode: "PiMode", rank: 'Noob', score: 1000, date: '2025-07-19' },
    { index: 12, mode: "Binary", rank: 'Learner', score: 2000, date: '2025-07-19' },
    { index: 13, mode: "Binary", rank: 'Amateur', score: 3000, date: '2025-07-18' },
    { index: 14, mode: "CharNum", rank: 'Average', score: 4000, date: '2025-07-18' },
    { index: 15, mode: "Characters", rank: 'Skilled', score: 5000, date: '2025-07-17' },
    { index: 16, mode: "PiMode", rank: 'Pro', score: 6000, date: '2025-07-17' },
    { index: 17, mode: "Marvel", rank: 'Elite', score: 7000, date: '2025-07-16' },
    { index: 18, mode: "PiMode", rank: 'Lethal', score: 8000, date: '2025-07-16' },
    { index: 19, mode: "CharNum", rank: 'Master', score: 9000, date: '2025-07-15' },
    { index: 20, mode: "DCMode", rank: 'Conqueror', score: 10000, date: '2025-07-15' }
  ]);

    // Function to clear scores
  const clearScores = () => {
    const confirmClear = window.confirm("Are you sure you want to clear all scores?");
    if (confirmClear) {
      setScores([]);
    }
  };

  return (
    <>
      <div className="scorecontainer">

        {/* Heading */}
        <div className="scoreHeading">
          <h1 className="scoreTitle">Scoreboard</h1>

          <div className="scoreActions">
            <button className="clearBtn" onClick={clearScores}>Clear Scores</button>
            <button className="helpBtn">Help</button>
          </div>
        </div>

        {/* Table Container */}
        <div className="table-wrapper">

          <table>

            <thead id="thead">
              <tr>
                <th className="Index">Index</th>
                <th className="Mode">Mode</th>
                <th className="Rank">Rank</th>
                <th className="Score">Score</th>
                <th className="Date">Date</th>
              </tr>
            </thead>

            <tbody tbody id="tbody" >
              {scores.map((player, index) => (
                <tr key={index}>
                  <td>{player.index}</td>
                  <td>{player.mode}</td>
                  {/* <td>{player.rank}</td> */}
                  <td className={`rank ${player.rank.toLowerCase()}`}>{player.rank}</td>
                  <td>{player.score}</td>
                  <td>{player.date}</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </>
  );
};

export default Scoreboard;
