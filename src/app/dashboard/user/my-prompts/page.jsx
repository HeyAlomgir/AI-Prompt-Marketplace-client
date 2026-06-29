"use client";

import { useEffect, useState } from "react";
import { Table, Chip, Spinner } from "@heroui/react";
import {
    FaPlus,
    FaEye,
    FaEdit,
    FaChartBar,
    FaTrashAlt,
    FaStar,
    FaLock,
    FaGlobe
} from "react-icons/fa";
import Link from "next/link";

export default function MyPrompts() {
    const [prompts, setPrompts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/prompts")
            .then((res) => res.json())
            .then((data) => {
                setPrompts(data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this prompt?")) {
            console.log("Delete clicked for ID:", id);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto text-white">
            {/* Top Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-100 tracking-tight">My Prompt Templates</h1>
                    <p className="text-slate-400 text-sm mt-1">Review approval statuses, change details, and check analytics.</p>
                </div>
                <Link href={"/dashboard/creator/add-prompt"}>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl transition duration-200 shadow-lg shadow-purple-900/30">
                        <FaPlus className="text-sm" /> Create New Prompt
                    </button>
                </Link>
            </div>


            <div className="shadow-2xl rounded-xl overflow-hidden bg-slate-900/40 border border-slate-800">
                <Table className="dark text-slate-200">
                    <Table.ScrollContainer>
                        <Table.Content aria-label="My Prompt Templates Table" className="min-w-[600px]">
                            <Table.Header>
                                <Table.Column isRowHeader className="bg-slate-950 text-slate-400 font-semibold py-4 pl-6 text-left">TITLE</Table.Column>
                                <Table.Column className="bg-slate-950 text-slate-400 font-semibold py-4 text-center">AI ENGINE</Table.Column>
                                <Table.Column className="bg-slate-950 text-slate-400 font-semibold py-4 text-center">VISIBILITY</Table.Column>
                                <Table.Column className="bg-slate-950 text-slate-400 font-semibold py-4 text-center">STATUS</Table.Column>
                                <Table.Column className="bg-slate-950 text-slate-400 font-semibold py-4 text-center">COPIES</Table.Column>
                                <Table.Column className="bg-slate-950 text-slate-400 font-semibold py-4 text-center">RATING</Table.Column>
                                <Table.Column className="bg-slate-950 text-slate-400 font-semibold py-4 pr-6 text-right">ACTIONS</Table.Column>
                            </Table.Header>


                            <Table.Body
                                items={prompts}
                                loadingContent={<Spinner color="secondary" label="Loading templates..." />}
                                loadingState={loading ? "loading" : "idle"}
                                emptyContent={"No prompt templates found. Create one above!"}
                            >
                                {(prompt) => (
                                    <Table.Row key={prompt._id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">

                                        {/* 1. TITLE & CATEGORY */}
                                        <Table.Cell className="py-5 pl-6 max-w-sm text-left">
                                            <div className="font-semibold text-slate-100 text-base">{prompt.title}</div>
                                            <div className="text-slate-500 text-xs mt-0.5">Category: {prompt.category || "General"}</div>

                                            {prompt.status?.toLowerCase() === "rejected" && prompt.feedback && (
                                                <div className="mt-2 inline-block bg-rose-950/40 border border-rose-900/50 text-rose-400 text-xs px-3 py-1 rounded-md">
                                                    <span className="font-bold">Feedback:</span> {prompt.feedback}
                                                </div>
                                            )}
                                        </Table.Cell>

                                        {/* 2. AI ENGINE */}
                                        <Table.Cell className="py-5 text-center">
                                            <Chip size="sm" variant="flat" className="bg-purple-950/40 text-purple-400 border border-purple-800/40 font-bold uppercase">
                                                {prompt.aiTool || "CHATGPT"}
                                            </Chip>
                                        </Table.Cell>

                                        {/* 3. VISIBILITY */}
                                        <Table.Cell className="py-5 text-center">
                                            <div className="flex items-center justify-center gap-1.5 text-slate-300 text-sm capitalize">
                                                {prompt.visibility?.toLowerCase() === "private" ? (
                                                    <><FaLock className="text-xs text-slate-400" /> <span>Private</span></>
                                                ) : (
                                                    <><FaGlobe className="text-xs text-slate-400" /> <span>Public</span></>
                                                )}
                                            </div>
                                        </Table.Cell>

                                        {/* 4. STATUS */}
                                        <Table.Cell className="py-5 text-center">
                                            <Chip
                                                size="sm"
                                                variant="flat"
                                                color={
                                                    prompt.status?.toLowerCase() === "approved" ? "success" :
                                                        prompt.status?.toLowerCase() === "rejected" ? "danger" : "warning"
                                                }
                                                className="capitalize font-bold text-[11px]"
                                            >
                                                {prompt.status || "pending"}
                                            </Chip>
                                        </Table.Cell>

                                        {/* 5. COPIES */}
                                        <Table.Cell className="py-5 text-center font-medium text-slate-300">
                                            {prompt.copies || 0}
                                        </Table.Cell>

                                        {/* 6. RATING */}
                                        <Table.Cell className="py-5 text-center">
                                            <div className="flex items-center justify-center gap-1 text-slate-300 font-medium">
                                                <FaStar className="text-slate-400 text-xs" />
                                                <span>{prompt.rating ? prompt.rating.toFixed(1) : "0.0"}</span>
                                            </div>
                                        </Table.Cell>

                                        {/* 7. ACTIONS */}
                                        <Table.Cell className="py-5 pr-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button title="View" className="p-2 bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/50 rounded-lg text-slate-400 hover:text-white transition-colors">
                                                    <FaEye className="text-xs" />
                                                </button>
                                                <button title="Edit" className="p-2 bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/50 rounded-lg text-slate-400 hover:text-white transition-colors">
                                                    <FaEdit className="text-xs" />
                                                </button>
                                                <button title="Analytics" className="p-2 bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/50 rounded-lg text-slate-400 hover:text-white transition-colors">
                                                    <FaChartBar className="text-xs" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(prompt._id)}
                                                    title="Delete"
                                                    className="p-2 bg-rose-950/20 hover:bg-rose-900/40 border border-rose-900/30 rounded-lg text-rose-400 hover:text-rose-300 transition-colors"
                                                >
                                                    <FaTrashAlt className="text-xs" />
                                                </button>
                                            </div>
                                        </Table.Cell>

                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>
        </div>
    );
}