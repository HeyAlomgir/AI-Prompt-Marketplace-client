"use client";

import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { FaFlag } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ReportModal({ promptId, promptTitle, userEmail, isOpen, onClose }) {
    const [reportReason, setReportReason] = useState("Inappropriate Content");
    const [reportDescription, setReportDescription] = useState("");
    const [submittingReport, setSubmittingReport] = useState(false);

    const handleReportSubmit = async (e) => {
        e.preventDefault();
        setSubmittingReport(true);

        try {
            const res = await fetch(`http://localhost:5000/api/reports`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    promptId,
                    userEmail: userEmail || "anonymous@user.com",
                    promptTitle,
                    reason: `${reportReason}${reportDescription ? ` - ${reportDescription}` : ""}`
                })
            });

            if (res.ok) {
                toast.success("Prompt reported successfully.");
                setReportDescription("");
                onClose();
            } else {
                toast.error("Failed to submit report");
            }
        } catch (err) {
            toast.error("Failed to submit report");
        } finally {
            setSubmittingReport(false);
        }
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onOpenChange={onClose}
            backdrop="blur"
            classNames={{
                base: "bg-[#0c0d19] border border-slate-800 max-w-md w-full",
                header: "border-b border-slate-900",
                footer: "border-t border-slate-900"
            }}
        >
     
            <form onSubmit={handleReportSubmit}>
                <ModalHeader className="flex items-center gap-2 text-red-500">
                    <FaFlag className="text-sm" />
                    <span className="text-sm font-bold text-slate-100">Report Prompt Template</span>
                </ModalHeader>
                
                <ModalBody className="py-6 space-y-4">
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Help us maintain community standards. If this prompt contains malicious instructions, plagiarized files, or spam content, report it below.
                    </p>

                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">REASON</label>
                        <select 
                            value={reportReason} 
                            onChange={(e) => setReportReason(e.target.value)}
                            className="w-full bg-[#131426] border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-600 cursor-pointer"
                        >
                            <option value="Inappropriate Content" className="bg-[#0c0d19]">Inappropriate Content</option>
                            <option value="Plagiarism/Copied Content" className="bg-[#0c0d19]">Plagiarism/Copied Content</option>
                            <option value="Malicious Instructions" className="bg-[#0c0d19]">Malicious Instructions</option>
                            <option value="Spam or Misleading" className="bg-[#0c0d19]">Spam or Misleading</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">ADDITIONAL DESCRIPTION (OPTIONAL)</label>
                        <textarea 
                            value={reportDescription}
                            onChange={(e) => setReportDescription(e.target.value)}
                            placeholder="Provide more context about your report..."
                            rows={4}
                            className="w-full bg-[#131426] border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-red-600 resize-none leading-relaxed"
                        />
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button 
                        size="sm" 
                        variant="flat" 
                        className="bg-slate-800 text-slate-300 font-semibold"
                        onPress={onClose}  // onCloseModal → onClose
                    >
                        Cancel
                    </Button>
                    <Button 
                        size="sm" 
                        type="submit" 
                        isLoading={submittingReport}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold"
                    >
                        Submit Report
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
}