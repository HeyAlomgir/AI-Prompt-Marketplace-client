"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalPrompts: 0,
        totalReviews: 0,
        totalCopies: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/admin/analytics")
            .then((res) => res.json())
            .then((data) => {
                setStats(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading analytics:", err);
                setLoading(false);
            });
    }, []);

    // Recharts- formaet
    const chartData = [
        { name: "Users", count: stats.totalUsers, fill: "#3b82f6" },
        { name: "Prompts", count: stats.totalPrompts, fill: "#a855f7" },
        { name: "Reviews", count: stats.totalReviews, fill: "#eab308" },
        { name: "Copies", count: stats.totalCopies, fill: "#10b981" }
    ];

    if (loading) {
        return <div className="p-8 text-slate-400">Loading Analytics...</div>;
    }

    return (
        <div className="p-6 bg-[#070710] min-h-screen text-slate-100 space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-wide">Admin Analytics</h1>
                <p className="text-xs text-slate-400 mt-1">Overview of your system performance and metrics.</p>
            </div>

            {/*status*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Users Card */}
                <div className="bg-[#0c0d19] border border-slate-900 p-5 rounded-xl shadow-lg">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Users</p>
                    <h3 className="text-3xl font-extrabold text-blue-500 mt-2">{stats.totalUsers}</h3>
                </div>
                {/* Prompts Card */}
                <div className="bg-[#0c0d19] border border-slate-900 p-5 rounded-xl shadow-lg">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Prompts</p>
                    <h3 className="text-3xl font-extrabold text-purple-500 mt-2">{stats.totalPrompts}</h3>
                </div>
                {/* Reviews Card */}
                <div className="bg-[#0c0d19] border border-slate-900 p-5 rounded-xl shadow-lg">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Reviews</p>
                    <h3 className="text-3xl font-extrabold text-amber-500 mt-2">{stats.totalReviews}</h3>
                </div>
                {/* Copies Card */}
                <div className="bg-[#0c0d19] border border-slate-900 p-5 rounded-xl shadow-lg">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Copies</p>
                    <h3 className="text-3xl font-extrabold text-emerald-500 mt-2">{stats.totalCopies}</h3>
                </div>
            </div>

            {/*  ২. Recharts  */}
            <div className="bg-[#0c0d19] border border-slate-900 p-6 rounded-xl shadow-2xl">
                <h2 className="text-sm font-bold text-slate-200 mb-6 uppercase tracking-wider">Metrics Chart Visual</h2>
                
                <div className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#16182e" />
                            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                            <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: "#0c0d19", borderColor: "#1e293b", borderRadius: "8px" }}
                                itemStyle={{ color: "#fff" }}
                            />
                            {/* dynamic fill */}
                            <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={45}>
                                {chartData.map((entry, index) => (
                                    <Bar key={`cell-${index}`} fill={entry.fill} dataKey="count" />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}