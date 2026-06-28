"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaExternalLinkAlt, FaCheck, FaTimes, FaTrashAlt, FaStar } from "react-icons/fa";

export default function AdminAllPrompts() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // রিজেকশন ফিডব্যাকের জন্য স্টেট
  const [rejectingPromptId, setRejectingPromptId] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  // ডাটা লোড করার ফাংশন
  const loadPrompts = () => {
    fetch("http://localhost:5000/api/admin/prompts")
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setPrompts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading prompts:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadPrompts();
  }, []);

  // স্ট্যাটাস আপডেট করার ফাংশন (Approve বা Reject)
  const handleUpdateStatus = async (id, status, feedback = "") => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/prompts/status/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, feedback }),
      });
      const data = await response.json();

      if (data.modifiedCount > 0) {
        toast.success(`Prompt ${status} successfully!`);
        setRejectingPromptId(null);
        setFeedbackText("");
        loadPrompts(); // ডাটা রিফ্রেশ
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // 🌟 প্রম্পট ফিচারড করার ফাংশন
  const handleToggleFeatured = async (id, currentFeatured, status) => {
    // যদি প্রম্পট অ্যাপ্রুভড না হয়, তাহলে ফিচারড করতে দেবে না
    if (status !== "approved" && !currentFeatured) {
      toast.error("Only approved prompts can be featured!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/admin/prompts/featured/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !currentFeatured }),
      });
      const data = await response.json();

      if (data.modifiedCount > 0) {
        toast.success(!currentFeatured ? "Prompt marked as Featured!" : "Removed from Featured!");
        loadPrompts(); // ডাটা রিফ্রেশ
      }
    } catch (error) {
      toast.error("Failed to update featured status");
    }
  };

  // প্রম্পট ডিলিট করার ফাংশন
  const handleDeletePrompt = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/prompts/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Prompt deleted successfully!");
        loadPrompts(); // ডাটা রিফ্রেশ
      }
    } catch (error) {
      toast.error("Failed to delete prompt!");
    }
  };

  if (loading) {
    return <div className="text-center p-10 text-slate-400">Loading Prompts...</div>;
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">All Prompts</h1>
        <p className="text-xs md:text-sm text-slate-400">View and manage marketplace prompts.</p>
      </div>

      {/* 📱 ১. মোবাইল ভিউ (কার্ড ফরম্যাট) */}
      <div className="block md:hidden space-y-4">
        {prompts.map((prompt) => (
          <div key={prompt._id || prompt.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
            <div className="flex justify-between items-start gap-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-slate-200 text-base truncate max-w-[150px]">{prompt.title}</h3>
                  <a href={`/prompts/${prompt._id || prompt.id}`} target="_blank" className="text-purple-400">
                    <FaExternalLinkAlt size={11} />
                  </a>
                  {/* মোবাইল ফিচারড ব্যাজ */}
                  {prompt.isFeatured && (
                    <span className="text-amber-400 flex items-center text-xs gap-0.5 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded-md border border-amber-400/20">
                      <FaStar size={10} /> Get
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 capitalize mt-0.5">{prompt.category || "N/A"}</p>
              </div>
              <span className="font-bold text-emerald-400 text-base">
                {prompt.price === 0 || !prompt.price ? "Free" : `$${prompt.price}`}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-slate-800/60 pt-2.5 mt-1 relative">
              <div className="flex flex-col gap-0.5">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase inline-block w-max ${
                  prompt.status === "approved" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : 
                  prompt.status === "rejected" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : 
                  "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}>
                  {prompt.status || "pending"}
                </span>
                {prompt.status === "rejected" && prompt.feedback && (
                  <span className="text-[11px] text-rose-400/80 italic max-w-[140px] block truncate">
                    Reason: {prompt.feedback}
                  </span>
                )}
              </div>

              {/* অ্যাকশন বাটনসমূহ (ফিচারড সহ) */}
              <div className="flex items-center gap-2">
                {/* 🌟 Feature Button */}
                <button
                  onClick={() => handleToggleFeatured(prompt._id || prompt.id, prompt.isFeatured, prompt.status)}
                  className={`p-2 rounded-xl transition-colors ${
                    prompt.isFeatured 
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" 
                      : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700"
                  }`}
                  title={prompt.isFeatured ? "Unfeature Prompt" : "Feature Prompt"}
                >
                  <FaStar size={11} />
                </button>

                <button onClick={() => handleUpdateStatus(prompt._id || prompt.id, "approved")} className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl">
                  <FaCheck size={11} />
                </button>
                <button onClick={() => { setRejectingPromptId(prompt._id || prompt.id); setFeedbackText(""); }} className="p-2 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl">
                  <FaTimes size={11} />
                </button>
                <button onClick={() => handleDeletePrompt(prompt._id || prompt.id)} className="p-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl">
                  <FaTrashAlt size={11} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 💻 ২. ডেক্সটপ ভিউ (টেবিল ফরম্যাট) */}
      <div className="hidden md:block w-full overflow-x-auto bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 text-xs uppercase font-semibold">
              <th className="p-4">Prompt Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Current Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-sm text-slate-200">
            {prompts.map((prompt) => (
              <tr key={prompt._id || prompt.id} className="hover:bg-slate-800/20 transition-colors">
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium truncate max-w-[180px] block" title={prompt.title}>{prompt.title}</span>
                    <a href={`/prompts/${prompt._id || prompt.id}`} target="_blank" className="text-purple-400 hover:text-purple-300">
                      <FaExternalLinkAlt size={12} />
                    </a>
                  </div>
                </td>
                <td className="p-4 text-slate-400 capitalize">{prompt.category || "N/A"}</td>
                <td className="p-4 font-semibold text-emerald-400">
                  {prompt.price === 0 || !prompt.price ? "Free" : `$${prompt.price}`}
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase inline-block w-max ${
                        prompt.status === "approved" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : 
                        prompt.status === "rejected" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : 
                        "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        {prompt.status || "pending"}
                      </span>
                      {/* ডেক্সটপ ফিচারড ইন্ডিকেটর ব্যাজ */}
                      {prompt.isFeatured && (
                        <span className="text-[10px] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded-md font-bold uppercase flex items-center gap-1">
                          <FaStar size={8} /> Featured
                        </span>
                      )}
                    </div>
                    {prompt.status === "rejected" && prompt.feedback && (
                      <span className="text-[11px] text-rose-400/80 italic max-w-[150px] block truncate" title={prompt.feedback}>
                        Reason: {prompt.feedback}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2 relative">
                    
                    {/* 🌟 Feature/Unfeature Button */}
                    <button 
                      onClick={() => handleToggleFeatured(prompt._id || prompt.id, prompt.isFeatured, prompt.status)} 
                      className={`p-2 rounded-xl transition-colors ${
                        prompt.isFeatured 
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30" 
                          : "bg-slate-800 text-slate-500 border border-slate-700/60 hover:bg-slate-700 hover:text-slate-300"
                      }`}
                      title={prompt.isFeatured ? "Unfeature" : "Feature"}
                    >
                      <FaStar size={12} />
                    </button>

                    <button onClick={() => handleUpdateStatus(prompt._id || prompt.id, "approved")} className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl transition-colors">
                      <FaCheck size={12} />
                    </button>
                    <button onClick={() => { setRejectingPromptId(prompt._id || prompt.id); setFeedbackText(""); }} className="p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-xl transition-colors">
                      <FaTimes size={12} />
                    </button>
                    <button onClick={() => handleDeletePrompt(prompt._id || prompt.id)} className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl transition-colors">
                      <FaTrashAlt size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {prompts.length === 0 && (
        <div className="text-center p-10 text-slate-500">No prompts found in database.</div>
      )}
    </div>
  );
}