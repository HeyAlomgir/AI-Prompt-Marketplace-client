"use client";

import { useEffect, useState } from "react";
import { FaSearch, FaCopy, FaEye, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import Image from "next/image";


export default function AllPromptsPage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  // search filter and sorted
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [aiTool, setAiTool] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const fetchPrompts = () => {
    setLoading(true);

    const queryParams = new URLSearchParams({
      search,
      category,
      aiTool,
      difficulty,
      sortBy
    }).toString();

    fetch(`http://localhost:5000/api/prompts?${queryParams}`)
      .then((res) => res.json())
      .then((data) => {
        const approvedOnly = data.filter(p => p.status === "approved");
        setPrompts(approvedOnly);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading prompts:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPrompts();
  }, [category, aiTool, difficulty, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchPrompts();
  };

  const handleCopyPrompt = async (id, content) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Prompt copied to clipboard!");
      const res = await fetch(`http://localhost:5000/api/prompts/copy/${id}`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (data.modifiedCount > 0) {
        setPrompts((prevPrompts) => prevPrompts.map(prompt => (prompt._id === id || prompt.id === id)
          ? { ...prompt, copyCount: (prompt.copyCount || 0) + 1 }
          : prompt));
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#070710] text-slate-100 p-4 md:p-8 pt-24">
      <div className="container mx-auto">

        {/* header secion */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">
            Explore All AI Prompts
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-2">
            Discover high-quality approved prompts for ChatGPT, Midjourney, Gemini and more.
          </p>
        </div>

        {/* search or filter */}
        <div className="bg-[#0d0d21] border border-slate-800/60 rounded-2xl p-4 mb-10 shadow-xl space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-3.5 text-slate-500 text-sm" />
              <input
                type="text"
                placeholder="Search by Title, Tags, or AI Tool..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#070710] border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 text-white placeholder-slate-500"
              />
            </div>
            <button type="submit" className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 font-medium text-sm rounded-xl transition-colors">
              Search
            </button>
          </form>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-[#070710] border border-slate-800 rounded-xl p-2.5 text-slate-300 focus:outline-none focus:border-purple-500 capitalize cursor-pointer">
              <option value="">All Categories</option>
              <option value="coding">Coding</option>
              <option value="writing">Writing</option>
              <option value="marketing">Marketing</option>
              <option value="graphics">Graphics</option>
            </select>

            <select value={aiTool} onChange={(e) => setAiTool(e.target.value)} className="bg-[#070710] border border-slate-800 rounded-xl p-2.5 text-slate-300 focus:outline-none focus:border-purple-500 capitalize cursor-pointer">
              <option value="">All AI Tools</option>
              <option value="chatgpt">ChatGPT</option>
              <option value="gemini">Gemini</option>
              <option value="midjourney">Midjourney</option>
              <option value="claude">Claude</option>
            </select>

            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="bg-[#070710] border border-slate-800 rounded-xl p-2.5 text-slate-300 focus:outline-none focus:border-purple-500 capitalize cursor-pointer">
              <option value="">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="pro">Pro</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-[#070710] border border-slate-800 rounded-xl p-2.5 text-amber-400 font-medium focus:outline-none focus:border-purple-500 cursor-pointer">
              <option value="latest">Sort by: Latest</option>
              <option value="popular">Sort by: Most Popular</option>
              <option value="copied">Sort by: Most Copied</option>
            </select>
          </div>
        </div>

        {/* prompts grid section */}
        {loading ? (
          <div className="text-center p-20 text-slate-400">Loading Market Prompts...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {prompts.map((prompt) => (
              <div
                key={prompt._id || prompt.id}
                className="bg-[#0d0d21] border border-slate-800/80 hover:border-slate-700/50 rounded-2xl p-4 shadow-2xl flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* img */}
                  <div className=" relative rounded-xl overflow-hidden mb-4 bg-slate-900">
                    <Image
                      src={prompt.image || "/placeholder.png"}
                      alt={prompt.title}
                      width={10}
                      height={10}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">


                    </Image>
                  </div>

                  {/* meta badge */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-950/60 text-purple-400 border border-purple-800/50 px-2 py-0.5 rounded-md">
                      {prompt.aiTool || "CLAUDE"}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                      {prompt.difficulty || "INTERMEDIATE"}
                    </span>
                  </div>

                  {/* title */}
                  <h3 className="font-bold text-slate-100 text-base leading-snug line-clamp-2 min-h-11">
                    {prompt.title}
                  </h3>

                  {/*  description */}
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 min-h-13 font-normal">
                    {prompt.description || "Creates optimal database schemas and corresponding backend route templates with security validations."}
                  </p>

                  {/* category */}
                  <div className="flex items-center gap-1 text-[11px] font-bold text-cyan-500 tracking-wider uppercase mt-3 mb-4">
                    <span>✨</span> {prompt.category || "CODING"}
                  </div>
                </div>

                {/* card button  */}
                <div className="border-t border-slate-800/60 pt-3 mt-2 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 text-[11px]">👤</span>
                      <span className="truncate max-w-32 text-slate-300">{prompt.creatorName || "Prompt Creator"}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* copy btn */}
                      <button
                        onClick={() => handleCopyPrompt(prompt._id || prompt.id, prompt.promptContent)}
                        className="flex items-center gap-1 hover:text-purple-400 transition-colors"
                        title="Copy Prompt Content"
                      >
                        <FaCopy size={11} className="text-slate-500" />
                        <span>{prompt.copyCount || 0}</span>
                      </button>

                      {/* rating */}
                      <div className="flex items-center gap-1 text-amber-400">
                        <FaStar size={11} />
                        <span>4.8</span>
                      </div>
                    </div>
                  </div>

                  {/* detaisl page */}
                  <a
                    href={`/dashboard/prompts/${prompt._id || prompt.id}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-xs transition-all shadow-lg shadow-purple-900/20"
                  >
                    <FaEye size={12} /> View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* faka prompt */}
        {!loading && prompts.length === 0 && (
          <div className="text-center p-20 bg-[#0d0d21]/40 border border-slate-800 rounded-2xl">
            <p className="text-slate-500 text-sm">No approved prompts available with current filters.</p>
          </div>
        )}

      </div>
    </div>
  );
}