"use client";

import { useEffect, useState } from "react";
import { Table, Chip, Spinner } from "@heroui/react"; 
import { HiHand } from "react-icons/hi";

export default function CreatorDashboard() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/prompts")
      .then((res) => res.json())
      .then((data) => {
        setPrompts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 flex items-center">Welcome Back, Creator! <HiHand className="text-yellow-400"/> </h1>
        <p className="text-slate-400 text-sm">Manage and track your submitted AI prompts here.</p>
      </div>

      {/* Mini Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-5 rounded-xl shadow-xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Submitted</p>
          <p className="text-2xl font-bold mt-1">{prompts.length}</p>
        </div>
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-5 rounded-xl shadow-xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending Approval</p>
          <p className="text-2xl font-bold text-amber-500 mt-1">
            {prompts.filter((p) => p.status === "pending").length}
          </p>
        </div>
      </div>

      {/* 🌟 Official HeroUI v3.2.1 Table Structure */}
      <div className="shadow-2xl rounded-xl overflow-hidden bg-slate-900/40 border border-slate-800">
        <Table className="dark text-slate-200">
          <Table.ScrollContainer>
            <Table.Content aria-label="Creator Prompts Table" className="min-w-[600px]">
              <Table.Header>
                <Table.Column isRowHeader className="bg-slate-950 text-slate-400 font-semibold py-4">TITLE</Table.Column>
                <Table.Column className="bg-slate-950 text-slate-400 font-semibold py-4">CATEGORY</Table.Column>
                <Table.Column className="bg-slate-950 text-slate-400 font-semibold py-4">PRICE</Table.Column>
                <Table.Column className="bg-slate-950 text-slate-400 font-semibold py-4">STATUS</Table.Column>
              </Table.Header>

              <Table.Body>
                {/* data loading state */}
                {loading && (
                  <Table.Row>
                    <Table.Cell colSpan={4} className="text-center py-10">
                      <Spinner color="primary" label="Loading prompts..." />
                    </Table.Cell>
                  </Table.Row>
                )}

              
                {!loading && prompts.length === 0 && (
                  <Table.Row>
                    <Table.Cell colSpan={4} className="text-center text-slate-500 py-10">
                      No prompts found. Add your first prompt!
                    </Table.Cell>
                  </Table.Row>
                )}

                {/* main data randaring */}
                {!loading && prompts.length > 0 && prompts.map((prompt) => (
                  <Table.Row key={prompt._id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <Table.Cell className="font-medium text-white py-4 max-w-xs truncate">
                      {prompt.title}
                    </Table.Cell>
                    <Table.Cell className="py-4">
                      <Chip size="sm" variant="flat" className="bg-slate-800 text-slate-300 border border-slate-700">
                        {prompt.category}
                      </Chip>
                    </Table.Cell>
                    <Table.Cell className="text-emerald-400 font-semibold py-4">
                      ${prompt.price}
                    </Table.Cell>
                    <Table.Cell className="py-4">
                      <Chip
                        size="sm"
                        variant="dot"
                        color={prompt.status === "pending" ? "warning" : "success"}
                        className="capitalize"
                      >
                        {prompt.status}
                      </Chip>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
}