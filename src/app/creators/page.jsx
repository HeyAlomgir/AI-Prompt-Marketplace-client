"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaAward,
  FaCheckCircle,
  FaSpinner,
  FaCopy,
} from "react-icons/fa";

export default function TopCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/top-creators");

        const data = await res.json();

        if (Array.isArray(data)) {
          setCreators(data);
        } else {
          setCreators([]);
        }
      } catch (error) {
        console.log(error);
        setCreators([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#040408] py-20 flex justify-center">
        <FaSpinner className="text-4xl text-purple-500 animate-spin" />
      </section>
    );
  }

  return (
    <section className="bg-[#040408] py-16 px-6 border-t border-slate-900">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="text-center mb-12 py-5">
          <h2 className="text-3xl py-5 font-extrabold text-white flex justify-center items-center gap-2">
            <FaAward className="text-purple-500" />
            Top Prompt Creators
          </h2>

          <p className="text-slate-400 mt-3">
            Ranked by total copied prompts.
          </p>
        </div>

        {creators.length === 0 ? (
          <div className="text-center text-slate-500 py-16">
            No creator found.
          </div>
        ) : (
          <div className="py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {creators.map((creator, index) => (

              <motion.div
                key={creator.userEmail}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: .4,
                  delay: index * .08
                }}
                className=" bg-[#0d0d21] border border-slate-800 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300"
              >

                {/* Avatar */}

                <div className="w-16 h-16 rounded-full bg-purple-900 flex items-center justify-center text-2xl mx-auto mb-4">
                  👤
                </div>

                {/* Name */}

                <h3 className="text-center text-lg font-bold text-white flex justify-center items-center gap-1">
                  {creator.creatorName}

                  <FaCheckCircle className="text-cyan-400 text-xs" />
                </h3>

                {/* Email */}

                <p className="text-center text-xs text-slate-500 mt-1 truncate">
                  {creator.userEmail}
                </p>

                {/* Stats */}

                <div className="mt-6 border-t border-slate-800 pt-5 grid grid-cols-2 gap-4">

                  <div className="text-center">

                    <h4 className="text-2xl font-bold text-purple-400">
                      {creator.totalPrompts}
                    </h4>

                    <p className="uppercase text-[10px] tracking-widest text-slate-500 mt-1">
                      Prompts
                    </p>

                  </div>

                  <div className="text-center">

                    <h4 className="text-2xl font-bold text-cyan-400 flex justify-center items-center gap-1">
                      <FaCopy className="text-sm" />
                      {creator.totalCopies}
                    </h4>

                    <p className="uppercase text-[10px] tracking-widest text-slate-500 mt-1">
                      Copies
                    </p>

                  </div>

                </div>

                {/* Rank */}

                <div className="mt-5 text-center">

                  <span className="inline-block px-3 py-1 rounded-full bg-purple-900/30 text-purple-300 text-xs font-semibold">

                    #{index + 1} Top Creator

                  </span>

                </div>

              </motion.div>

            ))}

          </div>
        )}

      </div>
    </section>
  );
}