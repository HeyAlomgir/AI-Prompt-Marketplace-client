"use client";

import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function HomeReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/home-reviews")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setReviews(data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching home reviews:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return null; 
    if (reviews.length === 0) return null; 

    return (
        <section className="bg-[#040408]  w-full py-16 px-6 border-t border-slate-900/40">
            <div className="container mx-auto max-w-6xl">
                {/* section header */}
                <div className="text-center mb-12 py-5">
                    <h2 className="text-xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
                        What Our Community Says
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 mt-2">
                        Real feedback from engineers and creators around the world.
                    </p>
                </div>

                {/* review grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-5">
                    {reviews.map((rev, index) => (
                        <motion.div
                            key={rev._id || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="bg-[#0d0d21] border border-slate-800/50 rounded-2xl p-5 shadow-xl flex flex-col justify-between"
                        >
                            <div>
                                {/* rating star */}
                                <div className="flex items-center gap-0.5 text-amber-400 mb-3">
                                    {[...Array(rev.rating || 5)].map((_, i) => (
                                        <FaStar key={i} size={11} />
                                    ))}
                                </div>
                                {/* cmt */}
                                <p className="text-xs text-slate-300 italic leading-relaxed line-clamp-4">
                                    "{rev.comment}"
                                </p>
                            </div>

                            {/* user info */}
                            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800/40">
                                <div className="w-6 h-6 rounded-full bg-purple-900/40 flex items-center justify-center text-[10px] text-purple-300 font-bold">
                                    👤
                                </div>
                                <div className="truncate">
                                    <h4 className="text-[11px] font-bold text-slate-200 truncate">
                                        {rev.userName || "Anonymous Creator"}
                                    </h4>
                                    <span className="text-[9px] text-slate-500 block">
                                        {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : "Verified User"}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}