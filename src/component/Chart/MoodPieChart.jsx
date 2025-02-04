import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const MoodPieChart = ({ moods }) => {
  // Count moods
  const moodCounts = {
    Happy: 0,
    Excited: 0,
    Blank: 0,
    Relaxed: 0,
    Surprised: 0,
    Tired: 0,
    Indifferent: 0,
    Overwhelmed: 0,
    Nervous: 0,
    Enraged: 0,
    Annoyed: 0,
    Confused: 0,
    Disappointed: 0,
    Angry: 0,
    Gloomy: 0,
  };

  Object.values(moods).forEach((mood) => {
    moodCounts[mood]++;
  });

  const data = {
    labels: moods ? Object.keys(moodCounts) : [],
    datasets: [
      {
        data: Object.values(moodCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#F7464A",
          "#46BFBD",
          "#FDB45C",
          "#B3E3B2",
          "#FF7C80",
          "#A9D0F5",
          "#B9D2F0",
          "#F0B9D9",
          "#F9D2B4",
          "#FBD49D",
          "#F9A9C5",
        ],
        hoverBackgroundColor: "#D6D6D6",
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
        text: "Mood Distribution - Pie Chart",
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default MoodPieChart;
