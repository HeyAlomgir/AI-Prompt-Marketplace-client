"use client";

import { Link } from "@heroui/react";
import { usePathname } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";


export default function Footer() {

  const pathName = usePathname();

  if (pathName.includes("dashboard")) {
    return null;
  };

  return (
    <footer className="w-full  bg-black/60 border-t border-zinc-900 text-zinc-400 py-12 px-6 sm:px-12  md:px-24">
      <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">


        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              AI
            </div>
            <span className="text-white font-bold text-lg tracking-wider">
              PromptVerse
            </span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Discover, create, and manage high-quality AI prompts for ChatGPT, Midjourney, Claude, and more.
          </p>
        </div>

        {/* Explore link */}
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-semibold text-xs tracking-widest uppercase mb-1">Explore</h4>
          <Link href="/" size="sm" color="foreground" className="hover:text-purple-400 text-zinc-400 transition-colors">
            Home
          </Link>
          <Link href="/prompts" size="sm" color="foreground" className="hover:text-purple-400 text-zinc-400 transition-colors">
            All Prompts
          </Link>
          <Link href="/creators" size="sm" color="foreground" className="hover:text-purple-400 text-zinc-400 transition-colors">
            Top Creators
          </Link>
        </div>

        {/* legal policy*/}
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-semibold text-xs tracking-widest uppercase mb-1">Legal</h4>
          <Link href="/privacy" size="sm" color="foreground" className="hover:text-purple-400 text-zinc-400 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" size="sm" color="foreground" className="hover:text-purple-400 text-zinc-400 transition-colors">
            Terms & Conditions
          </Link>
        </div>

        {/* social */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold text-xs tracking-widest uppercase">Follow Us</h4>
          <div className="flex items-center gap-3">

            <Link
              isExternal
              href="https://www.linkedin.com/in/alomgir-hossain-web/"
              className="p-2 bg-zinc-900 rounded-lg hover:bg-zinc-800 text-white transition-all hover:scale-105 text-lg"
            >
              <LiaLinkedin />
            </Link>


            <Link
              isExternal
              href="https://github.com/HeyAlomgir"
              className="p-2 bg-zinc-900 rounded-lg hover:bg-zinc-800 text-white transition-all hover:scale-105 text-lg"
            >
              <FaGithub />
            </Link>
          </div>
        </div>

      </div>


      <div className="w-full h-[1px] bg-zinc-900 my-6" />


      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[11px] text-zinc-600 gap-2">
        <p>© {new Date().getFullYear()} AI PromptVerse. All rights reserved.</p>
        <p className="tracking-wide">Designed for Recruitment Assessment</p>
      </div>
    </footer>
  );
}