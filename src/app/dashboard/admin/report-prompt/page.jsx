"use client";

import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ReportedPromptsPage() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
      const { data: session } = useSession();

    // report fetch
    useEffect(() => {
        fetch("http://localhost:5000/api/admin/reports")
            .then((res) => res.json())
            .then((data) => {
                setReports(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // remove
    const handleRemovePrompt = async (promptId, reportId) => {
       
        toast.success("Remove prompt successfuly!")
        try {
            const res = await fetch(`http://localhost:5000/api/admin/prompts/${promptId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                toast.success("Prompt removed successfully!");
                // list tho reprot dismis
                setReports(prev => prev.filter(r => r._id !== reportId));
            }
        } catch (err) {
            toast.error("Failed to remove prompt");
        }
    };

    //  (Warn Creator)
    const handleWarnCreator = async (creatorEmail) => {
        try {
           
            toast.success(`Warning sent to ${creatorEmail}`);
        } catch (err) {
            toast.error("Failed to send warning");
        }
    };

    // (Dismiss Report)
    const handleDismissReport = async (reportId) => {
        try {
    
            setReports(prev => prev.filter(r => r._id !== reportId));
            toast.success("Report dismissed.");
        } catch (err) {
            toast.error("Failed to dismiss report");
        }
    };

    if (loading) return <div className="text-white p-8">Loading reports...</div>;

    return (
        <div className="p-6 bg-[#070710] min-h-screen text-slate-100">
            <h1 className="text-2xl font-bold mb-6">Reported Prompts</h1>

            <div className="overflow-x-auto bg-[#0c0d19] border border-slate-900 rounded-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-850 text-slate-400 text-sm">
                            <th className="p-4">Prompt Title</th>
                            <th className="p-4">Reason</th>
                            <th className="p-4">Reported By</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report._id} className="border-b border-slate-900 text-sm hover:bg-slate-950/40">
                                <td className="p-4 font-semibold text-purple-300">{report.promptTitle}</td>
                                <td className="p-4">
                                    <span className="text-red-400 block font-medium">{report.reason}</span>
                                    <span className="text-xs text-slate-400">{report.description}</span>
                                </td>
                                <td className="p-4 text-slate-400">{report?.session?.user?.email}</td>
                                <td className="p-4 flex gap-2 justify-center">
                                    {/* Action Buttons */}
                                    <button 
                                        onClick={() => handleRemovePrompt(report.promptId, report._id)}
                                        className="bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded text-xs font-semibold transition-all"
                                    >
                                        Remove Prompt
                                    </button>
                                    <button 
                                        onClick={() => handleWarnCreator(report.creatorEmail)}
                                        className="bg-amber-650/20 text-amber-400 hover:bg-amber-600 hover:text-white px-3 py-1.5 rounded text-xs font-semibold transition-all"
                                    >
                                        Warn Creator
                                    </button>
                                    <button 
                                        onClick={() => handleDismissReport(report._id)}
                                        className="bg-slate-800 text-slate-300 hover:bg-slate-700 px-3 py-1.5 rounded text-xs font-semibold transition-all"
                                    >
                                        Dismiss
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}