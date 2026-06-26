"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaRocket } from "react-icons/fa";

export default function AddPrompt() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    const promptData = Object.fromEntries(formData.entries());
    console.log(promptData)

    try {
    
      const response = await fetch("http://localhost:5000/api/prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promptData),
      });

      const data = await response.json();

      if (data.acknowledged || data.success) {
        toast.success("🎯 Prompt submitted successfully!");
        form.reset(); 
      } else {
        toast.error("❌ Something went wrong!");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("❌ Server connection failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-900 bg-opacity-60 backdrop-blur-md p-8 rounded-2xl border border-slate-800 shadow-2xl my-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 border-b border-slate-800 pb-4">
        <span className="text-2xl"> <FaRocket className="text-blue-500" /> </span>
        <h2 className="text-xl font-bold text-white tracking-wide">
          Add New AI Prompt
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Prompt Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Prompt Title
          </label>
          <input
            type="text"
            name="title" 
            placeholder="e.g., Ultimate SEO Article Writer"
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-slate-100 placeholder-slate-600 transition-colors"
            required
          />
        </div>

        {/* Category & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Category
            </label>
            <select
              name="category"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-slate-100 transition-colors"
            >
              <option value="ChatGPT">ChatGPT</option>
              <option value="Midjourney">Midjourney</option>
              <option value="Stable Diffusion">Stable Diffusion</option>
              <option value="Claude">Claude</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              placeholder="e.g., 15"
              min="0"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-slate-100 placeholder-slate-600 transition-colors"
              required
            />
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Short Description
          </label>
          <textarea
            name="description"
            placeholder="Describe what this prompt does..."
            rows="3"
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-slate-100 placeholder-slate-600 transition-colors resize-none"
            required
          />
        </div>

        {/* The AI Prompt Text */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            The AI Prompt Text
          </label>
          <textarea
            name="promptText"
            placeholder="Act as a professional blogger..."
            rows="5"
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 font-mono text-emerald-400 placeholder-slate-700 transition-colors"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition duration-200 disabled:bg-slate-800 disabled:text-slate-500 shadow-lg shadow-blue-900/20"
        >
          {loading ? "Publishing..." : "Publish Prompt"}
        </button>
      </form>
    </div>
  );
}