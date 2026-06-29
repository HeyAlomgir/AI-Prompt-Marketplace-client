"use client";

import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import PromptCard from "@/components/PromptCard";

export default function AllPromptsPage() {
  const router = useRouter();
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [aiTool, setAiTool] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const fetchPrompts = () => {
    setLoading(true);
    const queryParams = new URLSearchParams({ search, category, aiTool, difficulty, sortBy }).toString();

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

  const handleCopyPrompt = async (prompt) => {
    try {
      await navigator.clipboard.writeText(prompt.promptContent || "");
      toast.success("Prompt copied to clipboard!");
      
      const res = await fetch(`http://localhost:5000/api/prompts/copy/${prompt._id || prompt.id}`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (data.modifiedCount > 0) {
        setPrompts((prevPrompts) => prevPrompts.map(p => (p._id === prompt._id || p.id === prompt.id)
          ? { ...p, copyCount: (p.copyCount || 0) + 1 }
          : p));
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#070710] text-slate-100 p-4 md:p-8 pt-24 w-full">
      <div className="container mx-auto">

        {/* Filters Section */}
        <div className="bg-[#0d0d21] border border-slate-800/60 rounded-2xl p-4 mb-10 shadow-xl space-y-4">
          <form onSubmit={(e) => { e.preventDefault(); fetchPrompts(); }} className="flex gap-2">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-3.5 text-slate-500 text-sm" />
              <input
                type="text"
                placeholder="Search by Title, Tags, or AI Tool..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#070710] border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <button type="submit" className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-sm rounded-xl font-medium transition-colors">
              Search
            </button>
          </form>

          {/* Select Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-[#070710] border border-slate-800 rounded-xl p-2.5 text-slate-300">
              <option value="">All Categories</option>
              <option value="coding">Coding</option>
              <option value="writing">Writing</option>
              <option value="marketing">Marketing</option>
              <option value="graphics">Graphics</option>
            </select>
            <select value={aiTool} onChange={(e) => setAiTool(e.target.value)} className="bg-[#070710] border border-slate-800 rounded-xl p-2.5 text-slate-300">
              <option value="">All AI Tools</option>
              <option value="chatgpt">ChatGPT</option>
              <option value="gemini">Gemini</option>
              <option value="midjourney">Midjourney</option>
            </select>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="bg-[#070710] border border-slate-800 rounded-xl p-2.5 text-slate-300">
              <option value="">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="pro">Pro</option>
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-[#070710] border border-slate-800 rounded-xl p-2.5 text-amber-400 font-medium">
              <option value="latest">Sort by: Latest</option>
              <option value="popular">Sort by: Most Popular</option>
            </select>
          </div>
        </div>

        {/* Grid Using Component */}
        {loading ? (
          <div className="text-center p-20 text-slate-400">Loading Market Prompts...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {prompts.map((prompt) => (
              <PromptCard
                key={prompt._id || prompt.id}
                prompt={prompt}
                onCopy={handleCopyPrompt}
                onViewDetails={(id) => router.push(`/prompts/${id}`)}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}