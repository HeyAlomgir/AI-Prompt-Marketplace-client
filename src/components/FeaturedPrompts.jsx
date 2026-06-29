"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaAngleRight } from "react-icons/fa6";
import Link from "next/link";
import PromptCard from "./PromptCard";



export default function FeaturedPrompts() {
    const [prompts, setPrompts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/featured-prompts")
            .then((res) => res.json())
            .then((data) => {

                if (Array.isArray(data)) {
                    setPrompts(data);
                } else {
                    console.error("Backend did not return an array:", data);
                    setPrompts([]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching featured prompts:", err);
                setPrompts([]);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-6 py-16 text-center text-slate-500 text-sm animate-pulse">
                Loading trending architectures...
            </div>
        );
    }

    return (
        <section className="bg-[#040408] w-full py-20 px-6 border-t border-slate-900/40">
            <div className="container  mx-auto">

                {/* section header */}
                <div className="flex flex-col sm:flex-row   justify-between items-start sm:items-end mb-12 gap-4">
                    <div className="">
                        <h2 className="text-xl md:text-3xl font-extrabold text-slate-100 tracking-tight py-5">
                            Featured & Trending Prompts
                        </h2>
                        <p className="text-xs md:text-sm text-slate-500 mt-1.5 my-5">
                            Handpicked high-performance engineering blueprints inside the marketplace.
                        </p>
                    </div>
                    <Link
                        href="/prompts"
                        className="flex items-center gap-1 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors group py-5"
                    >
                        Explore All <FaAngleRight className="transform group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
                {/* six card grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {prompts.length > 0 ? (
                        prompts.map((prompt, index) => (
                            <motion.div
                                key={prompt._id || index}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, duration: 0.5 }}
                            >
                             
                                <PromptCard prompt={prompt} />
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-sm text-slate-600 col-span-full text-center">No featured prompts found.</p>
                    )}
                </div>

            </div>
        </section>
    );
}