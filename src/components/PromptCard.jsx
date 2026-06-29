"use client";

import Image from "next/image";
import { useRouter } from "next/navigation"; 
import { FaCopy, FaEye, FaStar } from "react-icons/fa";

export default function PromptCard({ prompt, onCopy }) {
    const router = useRouter(); 
    const promptId = prompt._id?.$oid || prompt._id?.toString() || prompt.id;

    const handleViewDetailsRedirect = () => {
        if (promptId) {
            router.push(`/prompts/${promptId}`);
        }
    };

    return (
        <div className="bg-[#0d0d21] border border-slate-800/50 hover:border-purple-500/30 rounded-2xl p-4 shadow-xl flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 w-full relative overflow-hidden">
            <div>
                {/* img */}
                <div className="w-full h-48 relative rounded-xl overflow-hidden mb-4 bg-white flex items-center justify-center">
                    <Image
                        src={prompt.image || "/placeholder.png"}
                        width={34}
                        height={45}
                        alt={prompt.title || "Prompt Image"}
                        className="w-full h-full object-contain p-2"
                    />
                </div>

                {/* bedge */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest bg-purple-950/80 text-purple-300 border border-purple-800/40 px-2 py-0.5 rounded">
                        {prompt.aiTool || "CHATGPT"}
                    </span>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded">
                        {prompt.difficulty || "BEGINNER"}
                    </span>
                </div>

                {/* title */}
                <h3 className="font-bold text-slate-100 text-base leading-snug line-clamp-1 capitalize group-hover:text-purple-400 transition-colors">
                    {prompt.title}
                </h3>

                {/* description */}
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 min-h-8">
                    {prompt.description || "No description available for this prompt."}
                </p>

                {/* category */}
                <div className="flex items-center gap-1 text-[10px] font-bold text-cyan-400 tracking-wider uppercase mt-2 mb-3">
                    <span className="text-xs">⚡</span> {prompt.category || "CODING"}
                </div>
            </div>

            {/* button */}
            <div className="border-t border-slate-800/60 pt-3 mt-1 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                    <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-purple-900/50 flex items-center justify-center text-[10px]">👤</div>
                        <span className="truncate max-w-28 text-slate-300 text-xs">{prompt.creatorName || "Creator"}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* copy btn */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onCopy && onCopy(prompt);
                            }}
                            className="flex items-center gap-1 hover:text-purple-400 transition-colors"
                            title="Copy Prompt"
                        >
                            <FaCopy size={11} className="text-slate-500" />
                            <span className="text-xs">{prompt.copyCount || 0}</span>
                        </button>

                        {/* rating */}
                        <div className="flex items-center gap-0.5 text-amber-400">
                            <FaStar size={11} />
                            <span className="text-xs">4.8</span>
                        </div>
                    </div>
                </div>

            
                <button
                    onClick={handleViewDetailsRedirect}
                    className="w-full flex items-center justify-center gap-1.5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-bold text-xs transition-all shadow-md tracking-wide"
                >
                    <FaEye size={12} /> View Details
                </button>
            </div>
        </div>
    );
}