import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./piechart.css";
ChartJS.register(ArcElement, Tooltip, Legend);

const MoodPieChart = ({ moods }) => {
  if (!moods || moods.length === 0) {
    return (
      <p style={{ marginLeft: "200px", margin: "200px" }}>
        No mood data available.
      </p>
    );
  }

  // Count occurrences of each mood
  const moodCounts = moods.reduce((acc, { mood }) => {
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(moodCounts),
    datasets: [
      {
        data: Object.values(moodCounts),
        backgroundColor: [
          "#F57C00",
          "#36A2EB",
          "#DEBB99",
          "#4BC0C0",
          "#F7464A",
          "#46BFBD",
          "#FDB45C",
          "#F3F3B2",
          "#FF7C80",
          "#CAB8E4",
          "#B9D2F0",
          "#F0B9D9",
          "#B5EAD7",
          "#A7E8F2",
          "#FFD699",
        ],
        hoverBackgroundColor: "#ccc",
      },
    ],
  };

  return (
    <div className="pieChartContainer">
      <Pie className="pieChart" data={data} />
    </div>
  );
};

export default MoodPieChart;
