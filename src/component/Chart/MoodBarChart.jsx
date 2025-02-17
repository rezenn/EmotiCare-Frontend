import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import axios from "../../axios/axios";

const MoodBarChart = () => {
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get("/moodTracker", { headers: { token } });

      if (Array.isArray(response.data.moods)) {
        const moodCounts = {};
        response.data.moods.forEach((mood) => {
          moodCounts[mood.mood_label] = (moodCounts[mood.mood_label] || 0) + 1;
        });

        const formattedData = Object.entries(moodCounts).map(
          ([label, count]) => ({
            mood: label,
            count: count,
          })
        );

        setMoodData(formattedData);
      }
    } catch (error) {
      console.error("Failed to fetch mood data:", error.message);
    }
  };

  return (
    <div className="barChart">
      {" "}
      <ResponsiveContainer width="100%" height={480}>
        <BarChart
          data={moodData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            className="recharts-cartesian-grid"
          />
          <XAxis dataKey="mood" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="count"
            fill="#9EBE34"
            barSize={30}
            className="recharts-bar-rectangles"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodBarChart;
