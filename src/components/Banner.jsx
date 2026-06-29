"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaArrowRight,
  FaHandSparkles,
} from "react-icons/fa";
import Link from "next/link";

export default function Banner() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const trendingTags = [
    "SEO Optimize",
    "React",
    "Copywriter",
    "Midjourney V6",
    "Gemini",
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    router.push(
      `/prompts?search=${encodeURIComponent(searchQuery.trim())}`
    );
  };

  return (
    <section className="relative w-full bg-[#040408] overflow-hidden pt-20 pb-16 md:pt-24 md:pb-20 px-4 sm:px-6 md:px-8">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[550px] sm:h-[550px] md:w-[700px] md:h-[700px] bg-gradient-to-tr from-purple-600/10 via-transparent to-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center gap-6">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-purple-950/30 border border-purple-500/20 text-purple-300 text-xs uppercase tracking-wider px-4 py-2 rounded-full backdrop-blur-md"
        >
          <FaHandSparkles className="text-purple-400 animate-pulse" />
          The Ultimate Prompt Hub
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white"
        >
          Unlock the True Potential of
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Generative AI
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl text-slate-400 text-sm sm:text-base leading-8"
        >
          Discover, bookmark, and run engineering-grade prompts for ChatGPT,
          Gemini, Claude, and Midjourney. Boost your productivity today.
        </motion.p>

        {/* Search */}
        <motion.form
          onSubmit={handleSearchSubmit}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-xl flex items-center bg-[#0d0d15] border border-slate-800 rounded-xl p-2"
        >
          <FaSearch className="text-slate-500 ml-2 mr-3" />

          <input
            type="text"
            placeholder="Search by title, tag, or AI tool..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500 text-sm"
          />

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 transition px-5 py-2 rounded-lg text-white text-sm font-semibold"
          >
            Explore
          </button>
        </motion.form>

        {/* Trending */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs text-slate-500 uppercase tracking-widest">
            Trending
          </span>

          <div className="flex flex-wrap justify-center gap-2">
            {trendingTags.map((tag, index) => (
              <Link
                key={index}
                href={`/prompts?search=${tag}`}
                className="px-3 py-1 rounded-md border border-slate-800 hover:border-purple-500 text-slate-400 hover:text-purple-300 transition text-xs"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 pt-2"
        >
          <Link
            href="/prompts"
            className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-7 py-3 rounded-full transition"
          >
            Explore All Prompts
            <FaArrowRight size={12} />
          </Link>

          <Link
            href="/dashboard/creator"
            className="inline-flex items-center justify-center border border-slate-700 hover:border-purple-500 bg-[#11111b] text-slate-300 px-9 py-3 rounded-full transition"
          >
            Become a Creator
          </Link>
        </motion.div>

      </div>
    </section>
  );
}