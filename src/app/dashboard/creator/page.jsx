"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { FaCoins, FaLayerGroup, FaHourglassHalf, FaCheckCircle } from "react-icons/fa";

export default function CreatorDashboardHome() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // backend to data fetch
    fetch("http://localhost:5000/api/creator-analytics")
      .then((res) => res.json())
      .then((data) => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching analytics:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-slate-400">
        Loading Dashboard Analytics...
      </div>
    );
  }

  const stats = analytics?.stats || { totalPrompts: 0, pendingPrompts: 0, approvedPrompts: 0, totalEarnings: 0 };
  const chartData = analytics?.chartData || [];

  return (
    <div className="space-y-8 p-6 max-w-6xl mx-auto">
      {/*  Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-wide">Creator Analytics</h1>
        <p className="text-sm text-slate-400">Welcome back! Here is your prompt performance overview.</p>
      </div>

      {/*  Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Prompts */}
        <div className="bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border border-slate-800 flex items-center justify-between shadow-lg">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Prompts</p>
            <h3 className="text-2xl font-bold text-white mt-1">{stats.totalPrompts}</h3>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 text-xl">
            <FaLayerGroup />
          </div>
        </div>

        {/* Card 2: Approved Prompts */}
        <div className="bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border border-slate-800 flex items-center justify-between shadow-lg">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Approved</p>
            <h3 className="text-2xl font-bold text-emerald-400 mt-1">{stats.approvedPrompts}</h3>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 text-xl">
            <FaCheckCircle />
          </div>
        </div>

        {/* Card 3: Pending Prompts */}
        <div className="bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border border-slate-800 flex items-center justify-between shadow-lg">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending</p>
            <h3 className="text-2xl font-bold text-amber-400 mt-1">{stats.pendingPrompts}</h3>
          </div>
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 text-xl">
            <FaHourglassHalf />
          </div>
        </div>

        {/* Card 4: Total Earnings */}
        <div className="bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border border-slate-800 flex items-center justify-between shadow-lg">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Value ($)</p>
            <h3 className="text-2xl font-bold text-purple-400 mt-1">${stats.totalEarnings}</h3>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 text-xl">
            <FaCoins />
          </div>
        </div>
      </div>

      {/* 📊 Recharts Graph Section (Defended on Copy Count) */}
      <div className="bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white">Prompt Popularity</h2>
          <p className="text-xs text-slate-400">Based on how many times users copied your prompts</p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#f8fafc" }}
                cursor={{ fill: "#1e293b", opacity: 0.4 }}
              />
             
              <Bar dataKey="copied" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Times Copied" barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}