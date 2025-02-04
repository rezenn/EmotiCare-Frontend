import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MoodLineChart = ({ moods }) => {
  if (!moods || moods.length === 0) {
    return <p>No mood data available</p>; // Handle empty data case
  }

  const data = {
    labels: moods.map((mood) => mood.date), // Extract dates
    datasets: [
      {
        label: "Mood Tracker",
        data: moods.map((mood) => mood.mood), // Extract emoji
        fill: false,
        borderColor: "rgb(6, 103, 248)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Mood Tracker - Line Graph",
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => value, // Display emoji directly
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default MoodLineChart;
