"use client";

import { useSession } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRocket, FaCloudUploadAlt } from "react-icons/fa";

export default function AddPrompt() {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const {data:session}=useSession();

  // ImgBB API Key 
  const IMGBB_API_KEY = "7d5904092bde09d938904cccd157874b";

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    const promptData = Object.fromEntries(formData.entries());

    try {
      let imageUrl = "";

      if (imageFile) {
        const imgFormData = new FormData();
        imgFormData.append("image", imageFile);

        const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
          method: "POST",
          body: imgFormData,
        });

        const imgbbData = await imgbbResponse.json();

        if (imgbbData.success) {
          imageUrl = imgbbData.data.display_url;
        } else {
          throw new Error("ImgBB Upload Failed");
        }
      }

  

      const finalPromptData = {
        title: promptData.title,
        description: promptData.description,
        promptContent: promptData.promptContent, 
        category: promptData.category,
        aiTool: promptData.aiTool,             
        tags: promptData.tags ? promptData.tags.split(",").map(tag => tag.trim()) : [],
        difficulty: promptData.difficulty,    
        image: imageUrl,                       
        visibility: promptData.visibility,    
        price: parseFloat(promptData.price) || 0, 
        copyCount: 0,                          
        status: "pending",                     
        bookmarks: 0,
        createdAt: new Date().toISOString(),
        userEmail:session?.user?.email,
        creatorName: session.user.name,
      };

      // Backend API
      const response = await fetch("http://localhost:5000/api/prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalPromptData),
      });

      const data = await response.json();

      if (data.acknowledged || data.success) {
        toast.success("🎯 Prompt submitted successfully!");
        form.reset();
        setImageFile(null);
      } else {
        toast.error("❌ Something went wrong!");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("❌ Process failed! Check console or Image API.");
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

        {/* Category & AI Tool */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Category
            </label>
            <select
              name="category"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-slate-100 transition-colors"
            >
              <option value="CODING">CODING</option>
              <option value="GRAPHICS & IMAGE">GRAPHICS & IMAGE</option>
              <option value="MARKETING">MARKETING</option>
              <option value="WRITING">WRITING</option>
              <option value="IDEA GENERATION">IDEA GENERATION</option>
            </select>
          </div>

          <div>

            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              AI Tool
            </label>
            <select
              name="aiTool"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-slate-100 transition-colors"
            >
              <option value="CHATGPT">CHATGPT</option>
              <option value="CLAUDE">CLAUDE</option>
              <option value="MIDJOURNEY">MIDJOURNEY</option>
              <option value="STABLE DIFFUSION">STABLE DIFFUSION</option>
              <option value="GEMINI">GEMINI</option>
            </select>
          </div>
        </div>

        {/* Difficulty & Visibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Difficulty Level
            </label>
            <select
              name="difficulty"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-slate-100 transition-colors"
            >
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="PRO">Pro</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Visibility
            </label>
            <select
              name="visibility"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-slate-100 transition-colors"
            >
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
            </select>
          </div>
        </div>

        {/* Price & Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              placeholder="e.g., 5"
              min="0"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-slate-100 placeholder-slate-600 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Tags (Comma Separated)
            </label>
            <input
              type="text"
              name="tags"
              placeholder="SEO, Writing, Blog"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-slate-100 placeholder-slate-600 transition-colors"
            />
          </div>
        </div>

        {/* Thumbnail Image (ImgBB) */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Thumbnail Image
          </label>
          <div className="relative w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between cursor-pointer hover:border-slate-700 transition-colors">
            <div className="flex items-center space-x-3 text-slate-400">
              <FaCloudUploadAlt className="text-xl text-blue-500" />
              <span className="text-sm truncate">
                {imageFile ? imageFile.name : "Choose a square template image..."}
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Prompt Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Prompt Description
          </label>
          <textarea
            name="description"
            placeholder="Describe what this prompt does..."
            rows="3"
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-slate-100 placeholder-slate-600 transition-colors resize-none"
            required
          />
        </div>

        {/* Prompt Content */}
        <div>
        
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Prompt Content
          </label>
          <textarea
            name="promptContent"
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
          {loading ? "Publishing & Uploading..." : "Publish Prompt"}
        </button>
      </form>
    </div>
  );
}