"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const habitData = [
  { day: "Mon", sleep: 7, water: 6, screen: 3 },
  { day: "Tue", sleep: 8, water: 7, screen: 4 },
  { day: "Wed", sleep: 6, water: 8, screen: 5 },
  { day: "Thu", sleep: 7, water: 6, screen: 4 },
  { day: "Fri", sleep: 6.5, water: 7, screen: 6 },
  { day: "Sat", sleep: 8, water: 9, screen: 3 },
  { day: "Sun", sleep: 7.5, water: 8, screen: 4 },
];

type HabitCheckIn = {
  sleep: number;
  water: number;
  screen: number;
};

export default function HabitTrackerDashboard() {
  const [checkIn, setCheckIn] = useState<HabitCheckIn>({
    sleep: 7,
    water: 8,
    screen: 3,
  });
  const [streak, setStreak] = useState<number>(5);

  const handleSliderChange = (habit: keyof HabitCheckIn, value: number) => {
    setCheckIn((prev) => ({ ...prev, [habit]: value }));
  };

  const handleSubmit = () => {
    const allGoalsMet =
      checkIn.sleep >= 7 && checkIn.water >= 8 && checkIn.screen <= 4;
    setStreak((prev) => (allGoalsMet ? prev + 1 : 0));
    alert(
      allGoalsMet
        ? "Great job! Streak increased! 🔥"
        : "Goals not met today. Streak reset."
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 p-6 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto space-y-10"
      >
        <h1 className="text-4xl font-extrabold text-center text-indigo-800">
          Personal Habit Tracker
        </h1>

        {/* Weekly Chart */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
            📊 Weekly Progress
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={habitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sleep"
                stroke="#4F46E5"
                name="Sleep (hrs)"
              />
              <Line
                type="monotone"
                dataKey="water"
                stroke="#06B6D4"
                name="Water (cups)"
              />
              <Line
                type="monotone"
                dataKey="screen"
                stroke="#F59E0B"
                name="Screen (hrs)"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Streak */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl shadow-xl p-6 flex items-center justify-between"
        >
          <h2 className="text-2xl font-semibold text-indigo-700">🔥 Streak</h2>
          <motion.div
            key={streak}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-4xl font-bold text-orange-500"
          >
            {streak} Days
          </motion.div>
        </motion.div>

        {/* Check-In */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl shadow-xl p-6 space-y-6"
        >
          <h2 className="text-2xl font-semibold text-indigo-700">
            Daily Check-In
          </h2>
          {/* Goals Summary */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">
              🎯 Today’s Goals
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>
                <span className="font-medium">Sleep:</span> ≥ 7 hours
              </li>
              <li>
                <span className="font-medium">Water:</span> ≥ 8 cups
              </li>
              <li>
                <span className="font-medium">Screen Time:</span> ≤ 4 hours
              </li>
            </ul>
          </div>
          {(["sleep", "water", "screen"] as (keyof HabitCheckIn)[]).map(
            (habit) => (
              <div key={habit}>
                <label className="block font-medium text-gray-700 capitalize mb-1">
                  {habit === "screen" ? "Screen Time" : `${habit}`}
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={habit === "screen" ? 0 : 4}
                    max={habit === "screen" ? 10 : 10}
                    step="0.5"
                    value={checkIn[habit]}
                    onChange={(e) =>
                      handleSliderChange(habit, parseFloat(e.target.value))
                    }
                    className="w-full accent-indigo-500"
                  />
                  <span className="text-sm font-medium text-gray-600 w-12 text-right">
                    {checkIn[habit]} {habit === "water" ? "cups" : "hrs"}
                  </span>
                </div>
              </div>
            )
          )}

          <button
            onClick={handleSubmit}
            className="w-full mt-4 py-3 px-6 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
          >
            Submit Today’s Check-In
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
