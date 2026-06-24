"use client";

import { useEffect } from "react";
import { Button } from "@heroui/react";
import { BiSolidErrorCircle } from "react-icons/bi";
import { IoRefresh } from "react-icons/io5";

export default function Error({ error, reset }) {
  useEffect(() => {
    // তুমি চাইলে কনসোলে এররটা লগ করে রাখতে পারো ট্র্যাক করার জন্য
    console.error("Application Crash Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center bg-black text-white px-4 relative overflow-hidden">
      {/* 🔮 ব্যাকগ্রাউন্ড রেড/পার্পল এআই গ্লো ইফেক্ট */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[450px] sm:h-[450px] bg-gradient-to-tr from-red-500/10 via-transparent to-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="z-10 flex flex-col items-center text-center max-w-md gap-4">
        {/* 🚨 এরর আইকন */}
        <div className="text-red-500 text-6xl animate-bounce">
          <BiSolidErrorCircle />
        </div>

        {/* টেক্সট সেকশন */}
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-red-400 via-neutral-200 to-purple-400 bg-clip-text text-transparent">
          Something Went Wrong!
        </h2>
        
        <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed px-4">
          An unexpected error occurred while syncing with the Matrix. Don't worry, your data is safe. Let's try reloading the section.
        </p>

        {/* ডাইনামিক এরর মেসেজ (ডেভলপমেন্টের সুবিধার জন্য) */}
        {error?.message && (
          <div className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-[11px] font-mono text-red-400/80 break-all max-h-24 overflow-y-auto">
            Code: {error.message}
          </div>
        )}

        {/* 🚀 হিরো-ইউআই রিসেট বাটন */}
        <Button
          color="danger"
          variant="flat"
          radius="lg"
          size="md"
          className="mt-2 font-medium tracking-wide gap-2 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all duration-300"
          onClick={() => reset()} // 👈 এটি পেজের ক্র্যাশ হওয়া অংশকে আবার রি-রেন্ডার করার চেষ্টা করবে
        >
          <IoRefresh className="text-lg" />
          Try Again
        </Button>
      </div>
    </div>
  );
}