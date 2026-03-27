
import React, { useState } from "react";

const user = {
  startWeight: 73.15,
  targetWeight: 57,
  dailyCalories: 1200,
  tdee: 2000,
};

function getAverageWeight(log) {
  const sum = log.reduce((a, b) => a + b, 0);
  return (sum / log.length).toFixed(2);
}

function getTrend(log) {
  const first = log.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
  const last = log.slice(-3).reduce((a, b) => a + b, 0) / 3;
  const diff = last - first;

  if (diff > 0.3) return "gaining";
  if (diff > -0.2) return "plateau";
  if (diff < -1) return "too_fast";
  return "losing";
}

function autoAdjust(trend, currentCalories) {
  switch (trend) {
    case "gaining":
      return { calories: currentCalories - 150, cardio: "+25 min" };
    case "plateau":
      return { calories: currentCalories - 100, cardio: "+20 min" };
    case "too_fast":
      return { calories: currentCalories + 100, cardio: "reduce cardio" };
    default:
      return { calories: currentCalories, cardio: "same" };
  }
}

export default function App() {
  const [weights] = useState([73.5, 73.3, 73.4, 73.2, 73.1, 73.2, 73.15]);

  const avg = getAverageWeight(weights);
  const trend = getTrend(weights);
  const adjust = autoAdjust(trend, user.dailyCalories);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>AI Diet Coach</h1>
      <p>Average Weight: {avg} kg</p>
      <p>Trend: {trend}</p>
      <p>Calories: {adjust.calories}</p>
      <p>Cardio: {adjust.cardio}</p>
    </div>
  );
}
