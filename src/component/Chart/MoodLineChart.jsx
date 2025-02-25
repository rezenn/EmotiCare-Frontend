import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./lineChart.css";

function MoodLineChart({ moods }) {
  const moodOrder = [
    "Enraged",
    "Angry",
    "Disappointed",
    "Overwhelmed",
    "Nervous",
    "Annoyed",
    "Gloomy",
    "Tired",
    "Confused",
    "Indifferent",
    "Surprised",
    "Relaxed",
    "Excited",
    "Blessed",
    "Happy",
  ];

  const moodData = moods.map((mood) => ({
    date: mood.date,
    mood: moodOrder.indexOf(mood.mood),
  }));

  return (
    <div
      style={{
        width: "700px",
        height: "400px",
        border: "1px solid #ccc",
        padding: "0px",
        margin: "auto",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={moodData}
          margin={{ top: 10, right: 5, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="date" />
          <YAxis
            tickFormatter={(index) => moodOrder[index] || ""}
            domain={[0, moodOrder.length - 1]}
            tick={{ fontSize: 10 }}
          />
          <Tooltip formatter={(value) => moodOrder[value]} />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#8884d8"
            strokeWidth={2.5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MoodLineChart;
