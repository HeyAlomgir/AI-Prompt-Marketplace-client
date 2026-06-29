"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FaCopy, FaBookmark, FaFlag, FaStar, FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

import ReportModal from "@/components/ReportModal";

export default function PromptDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const [prompt, setPrompt] = useState(null);
    const [loading, setLoading] = useState(true);
    
    //  Review States
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [submittingReview, setSubmittingReview] = useState(false);

    //  Report State
    const [isReportOpen, setIsReportOpen] = useState(false);

    const searchParams = useSearchParams();
    const initialSearch = searchParams.get("search") || "";

  useEffect(() => {
  // initialSearch 
  fetch(`http://localhost:5000/api/prompts?search=${initialSearch}`)
    .then(res => res.json())
    .then(data => setPrompt(data));
}, [initialSearch]);

    const user = session?.user;

    // Fetch Prompt Details & Reviews
    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:5000/api/prompts/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPrompt(data);
                setLoading(false);
            })
           
            .catch((err) => {
                console.error("Error fetching prompt details:", err);
                setLoading(false);
            });

        fetch(`http://localhost:5000/api/reviews/${id}`)
            .then((res) => res.json())
            .then((data) => setReviews(data || []))
            .catch((err) => console.error("Error fetching reviews:", err));
    }, [id]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(prompt?.promptContent || "");
            toast.success("Prompt Template copied!");
            await fetch(`http://localhost:5000/api/prompts/copy/${id}`, { method: "PATCH" });
            setPrompt(prev => prev ? { ...prev, copyCount: (prev.copyCount || 0) + 1 } : null);
        } catch (err) {
            toast.error("Failed to copy prompt");
        }
    };

    const handleBookmark = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/bookmarks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    promptId: id,
                    userEmail: user?.email || "anonymous@user.com",
                    promptTitle: prompt?.title
                })
            });
            if (res.ok) {
                toast.success("Prompt bookmarked successfully!");
            } else {
                const data = await res.json();
                toast.error(data.message || "Already bookmarked!");
            }
        } catch (err) {
            toast.error("Failed to bookmark");
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return toast.error("Please write a comment!");

        setSubmittingReview(true);
        try {
            const res = await fetch(`http://localhost:5000/api/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    promptId: id,
                    userName: user?.name || "Anonymous User",
                    userEmail: user?.email || "anonymous@user.com",
                    rating,
                    comment
                })
            });

            if (res.ok) {
                const newReview = await res.json();
                setReviews((prev) => [newReview, ...prev]);
                setComment("");
                setRating(5);
                toast.success("Review submitted successfully!");
            } else {
                toast.error("Failed to submit review");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-[#070710] flex items-center justify-center text-slate-400 font-medium">Loading details...</div>;
    }

    if (!prompt) {
        return <div className="min-h-screen bg-[#070710] flex items-center justify-center text-slate-400 font-medium">Prompt not found!</div>;
    }

    return (
        <div className="min-h-screen bg-[#070710] text-slate-100 p-4 md:p-8 pt-24">
            <div className="w-full container mx-auto space-y-8">

                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                    <FaArrowLeft /> Back to previous page
                </button>

                {/*  Grid Layout - Left: Prompt Content, Right: Specs */}
                <div className="w-full md:flex gap-6 items-start">

                    {/*  Left Side Content */}
                    <div className="w-full lg:col-span-2 bg-[#0c0d19] border border-slate-900 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
                        <div className="flex justify-between items-start gap-4">
                            <div className="space-y-2">
                                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide leading-tight capitalize">
                                    {prompt.title}
                                </h1>
                                <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                                    {prompt.description || "Creates optimal database schemas and corresponding backend route templates with security validations."}
                                </p>
                            </div>
                            
                            {/* f bookmark */}
                            <div className="flex gap-2 shrink-0 relative">
                                <button onClick={handleBookmark} className="p-2.5 bg-[#141526] border border-slate-800 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all">
                                    <FaBookmark size={13} />
                                </button>
                                
                                {/* reported flag btn */}
                                <button 
                                    onClick={() => setIsReportOpen(!isReportOpen)} 
                                    className={`p-2.5 bg-[#141526] border border-slate-800 rounded-lg transition-all ${isReportOpen ? "text-red-500 bg-slate-800" : "text-slate-300 hover:text-red-500 hover:bg-slate-800"}`}
                                >
                                    <FaFlag size={13} />
                                </button>

                                {/* conditonl */}
                                {isReportOpen && (
                                    <ReportModal 
                                        promptId={id}
                                        promptTitle={prompt?.title}
                                        userEmail={user?.email}
                                        isOpen={isReportOpen}
                                        onClose={() => setIsReportOpen(false)}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="space-y-3 pt-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-bold text-white tracking-wide">Prompt Template</h3>
                                <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141526] border border-slate-800 hover:bg-slate-800 text-xs font-semibold rounded-lg transition-colors text-slate-200">
                                    <FaCopy size={12} /> Copy
                                </button>
                            </div>
                            <div className="bg-[#060712] p-5 rounded-xl border border-slate-950 font-mono text-xs md:text-sm text-purple-400 leading-relaxed whitespace-pre-wrap select-all min-h-36">
                                {prompt.promptContent || "Act as a Principal Software Architect..."}
                            </div>
                        </div>
                    </div>

                    {/*  Right Side Content */}
                    <div className="w-full bg-[#0c0d19] border border-slate-900 rounded-2xl p-6 shadow-2xl space-y-6">
                        <div>
                            <h2 className="text-sm font-bold text-white tracking-wide border-b border-slate-900 pb-3">Prompt Details</h2>
                            <div className="space-y-4 text-xs mt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 font-medium">AI Engine</span>
                                    <span className="bg-[#1b1233] text-purple-300 px-3 py-1 rounded font-bold text-[10px] uppercase">{prompt.aiTool || "CLAUDE"}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 font-medium">Category</span>
                                    <span className="bg-[#112429] text-cyan-300 px-3 py-1 rounded font-bold text-[10px] uppercase">{prompt.category || "CODING"}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 font-medium">Difficulty</span>
                                    <span className="text-slate-300 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800 text-[10px] font-bold uppercase">{prompt.difficulty || "PRO"}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 font-medium">Visibility</span>
                                    <span className="text-slate-300 font-semibold uppercase">{prompt.visibility || "PUBLIC"}</span>
                                </div>
                                <div className="border-t border-slate-900 my-2"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 font-medium">Copies Made</span>
                                    <span className="text-slate-200 font-bold">{prompt.copyCount || 0}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 font-medium">Bookmarks</span>
                                    <span className="text-slate-200 font-bold">0</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 font-medium">Community Rating</span>
                                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                                        <FaStar size={11} /> 5 <span className="text-slate-500 font-normal">({reviews.length})</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-900 pt-4 mt-2">
                            <h4 className="text-xs font-bold text-white mb-3 tracking-wide">Creator Information</h4>
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-[#141526] border border-slate-800 flex items-center justify-center text-sm text-purple-300 font-bold">👤</div>
                                <div className="truncate text-left">
                                    <p className="text-xs font-bold text-slate-200">{prompt.creatorName || "Prompt Engineer"}</p>
                                    <p className="text-[10px] text-slate-500 truncate">{prompt?.userEmail}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  Community Reviews Layout */}
                <div className="w-full bg-[#0c0d19] border border-slate-900 rounded-2xl p-6 md:p-8 shadow-2xl">
                    <h2 className="text-lg font-bold text-white tracking-wide border-b border-slate-900 pb-4 mb-6">
                        Community Reviews ({reviews.length})
                    </h2>

                    <div className="w-full md:flex gap-8 items-start">
                        {/* Left Side: Submit Review Box */}
                        <form onSubmit={handleReviewSubmit} className="bg-[#070710] border border-slate-900 p-5 rounded-xl space-y-4">
                            <h3 className="text-sm font-bold text-slate-200">Submit a Review</h3>
                            
                            <div className="space-y-1.5">
                                <label className="text-xs text-slate-400 font-medium">Your Rating</label>
                                <div className="flex gap-1.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            type="button"
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className={`transition-colors ${star <= rating ? "text-amber-400" : "text-slate-700"}`}
                                        >
                                            <FaStar size={18} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs text-slate-400 font-medium">Comment</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write your experience with this prompt template..."
                                    rows={4}
                                    className="w-full bg-[#0c0d19] border border-slate-800 rounded-lg p-3 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-purple-600 transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submittingReview}
                                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white text-xs font-bold rounded-lg transition-colors tracking-wide"
                            >
                                {submittingReview ? "Submitting..." : "Submit Review"}
                            </button>
                        </form>

                        {/* Right Side: Display List of Reviews */}
                        <div className=" w-full flex-1 space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                            {reviews.length === 0 ? (
                                <div className="h-full flex items-center justify-center text-slate-500 text-sm py-12">
                                    No reviews yet. Be the first to share your thoughts!
                                </div>
                            ) : (
                                reviews.map((rev) => (
                                    <div key={rev._id} className="bg-[#070710] border border-slate-900 p-4 rounded-xl space-y-2.5">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-7 h-7 rounded-full bg-purple-950/50 border border-purple-900 flex items-center justify-center text-xs text-purple-300 font-bold">
                                                    {rev.userName ? rev.userName[0].toUpperCase() : "U"}
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-200">{rev.userName}</h4>
                                                    <p className="text-[10px] text-slate-500">{new Date(rev.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-0.5 text-amber-400">
                                                {Array.from({ length: rev.rating }).map((_, i) => (
                                                    <FaStar key={i} size={11} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed pl-9 font-sans italic">
                                            "{rev.comment}"
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}