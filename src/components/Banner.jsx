"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaSearch, FaArrowRight, FaHandSparkles } from "react-icons/fa";
import Link from "next/link";

export default function Banner() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const trendingTags = ["SEO Optimize", "React", "Copywriter", "Midjourney V6", "Gemini"];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/prompts?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 overflow-hidden bg-[#040408] pt-16 pb-10">

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] bg-gradient-to-tr from-purple-600/10 via-transparent to-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-3xl mx-auto z-10 flex flex-col items-center gap-5 sm:gap-6">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-purple-950/30 border border-purple-500/20 text-purple-300 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full backdrop-blur-md"
        >
          <FaHandSparkles className="text-purple-400 animate-pulse text-[12px]" />
          The Ultimate Prompt Hub
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-tight"
        >
          Unlock the True Potential of{" "}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Generative AI
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed"
        >
          Discover, bookmark, and run engineering-grade prompts for ChatGPT, Gemini, Claude, and Midjourney. Boost your productivity today.
        </motion.p>

        {/* Search Bar */}
        <motion.form
          onSubmit={handleSearchSubmit}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full max-w-xl flex items-center bg-[#0d0d15]/90 border border-slate-800/80 focus-within:border-purple-500 rounded-xl p-1.5 pl-3.5 shadow-2xl transition-all duration-300"
        >
          <FaSearch className="text-slate-500 mr-2 shrink-0 text-xs sm:text-sm" />
          <input
            type="text"
            placeholder="Search by title, tag, or AI tool..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none pr-2"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white text-[11px] sm:text-xs font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-colors shrink-0 active:scale-95"
          >
            Explore
          </button>
        </motion.form>

        {/* Trending Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col items-center gap-2 w-full"
        >
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 tracking-wider">Trending:</span>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-xl px-2">
            {trendingTags.map((tag, idx) => (
              <Link
                href={`/prompts?search=${tag}`}
                key={idx}
                className="bg-[#0b0c16] border border-slate-900 text-slate-400 hover:border-purple-500/50 hover:text-purple-300 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md transition-all text-[9px] sm:text-[10px] font-medium whitespace-nowrap"
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
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full pt-1"
        >
          <Link
            href="/prompts"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-6 py-3 rounded-full shadow-lg shadow-purple-950/50 transition-all active:scale-95 group"
          >
            Explore All Prompts
            <FaArrowRight size={10} className="transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/dashboard/creator"
            className="w-full sm:w-auto text-center bg-[#12121a] hover:bg-[#161622] text-slate-300 font-bold text-xs px-6 py-3 rounded-full border border-slate-800 transition-colors active:scale-95"
          >
            Become a Creator
          </Link>
        </motion.div>

      </div>
    </section>
  );
}