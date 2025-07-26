export const RANK_THRESHOLDS = [
  { min: 1000, rank: "Conqueror" },
  { min: 900, rank: "Master" },
  { min: 800, rank: "Lethal" },
  { min: 700, rank: "Elite" },
  { min: 600, rank: "Pro" },
  { min: 500, rank: "Skilled" },
  { min: 400, rank: "Average" },
  { min: 300, rank: "Amateur" },
  { min: 200, rank: "Learner" },
  { min: 0, rank: "Noob" },
];

// Get rank based on score
export function getRankFromScore(score) {
  const threshold = RANK_THRESHOLDS.find(th => score >= th.min);
  return threshold ? threshold.rank : "Unknown";
}