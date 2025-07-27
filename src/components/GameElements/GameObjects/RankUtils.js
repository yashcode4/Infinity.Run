export const RANK_THRESHOLDS = [
  { min: 10000, rank: "Conqueror" },
  { min: 8000, rank: "Master" },
  { min: 7000, rank: "Lethal" },
  { min: 6000, rank: "Elite" },
  { min: 5000, rank: "Pro" },
  { min: 4000, rank: "Skilled" },
  { min: 3000, rank: "Average" },
  { min: 2000, rank: "Amateur" },
  { min: 1000, rank: "Learner" },
  { min: 0, rank: "Noob" },
];

// Get rank based on score
export function getRankFromScore(score) {
  const threshold = RANK_THRESHOLDS.find(th => score >= th.min);
  return threshold ? threshold.rank : "Unknown";
}