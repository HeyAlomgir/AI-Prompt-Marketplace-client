"use client";

import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white px-4 relative overflow-hidden">
  
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-[500px] sm:h-[500px] bg-gradient-to-tr from-primary/10 via-purple-500/5 to-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="z-10 flex flex-col items-center gap-4">
        
        <Spinner 
          size="xl" 
          color="primary" 
          className="scale-125"
        />
        
        {/* লোডিং টেক্সট */}
        <div className="flex flex-col items-center mt-2">
          <p className="text-sm font-semibold tracking-widest uppercase bg-gradient-to-r from-neutral-200 via-neutral-400 to-neutral-200 bg-clip-text text-transparent animate-pulse">
            Syncing Matrix...
          </p>
          <span className="text-[11px] text-neutral-600 mt-1">
            Loading PromptVerse Data
          </span>
        </div>
      </div>
    </div>
  );
}