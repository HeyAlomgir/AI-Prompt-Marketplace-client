"use client";

import { authClient } from "@/lib/auth-client";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Label
} from "@heroui/react";
import Link from "next/link";
import React, { useState } from "react";
import { BiLogOut, BiLogOut as LogOutIcon } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import Image from "next/image";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // better-auth 
    const sessionHook = authClient.useSession();
    const session = sessionHook?.data;
    const user = session?.user;

    console.log(user);

    const handleSignOut = async () => {
        await authClient.signOut();
    };

    return (
        <div>
            {/* 📢 AI PROMPT MARKETPLACE BANNER TICKER */}
            <div className="bg-black py-1.5 text-xs text-white/90">
                <marquee className="cursor-pointer" scrollamount="5">
                    <span className="mx-6">🔥 Trending: "Act as a Senior Full-Stack Developer" prompt copied 500+ times today!</span>
                    <span className="mx-6">🚀 Platform Update: Integrated direct support for Claude 3.5 Sonnet & Gemini 1.5 Pro matrices.</span>
                    <span className="mx-6">💎 Premium Pass: Upgrade today to unlock 300+ vetted engineering prompts.</span>
                </marquee>
            </div>

            {/* 🎯 NAVBAR CONTAINER */}
            <nav className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-background/70 backdrop-blur-lg">
                <header className="flex h-16 items-center justify-between px-4 container mx-auto">
                    <div className="flex items-center gap-4">
                        {/* Mobile Hamburger Toggle */}
                        <button
                            className="md:hidden text-foreground"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>

                        {/* 🚀 BRAND LOGO AREA */}
                        <Link href="/" className="flex items-center gap-2.5 text-foreground font-bold text-xl tracking-tight select-none group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary via-purple-500 to-indigo-600 text-white shadow-md shadow-primary/20 transition-transform duration-300 group-hover:scale-105 overflow-hidden">
                                {/* <Image
                                    src="https://i.ibb.co.com/M5P07f7t/image-removebg-preview.png"
                                    width={40}
                                    height={40}
                                    className="object-cover scale-110"
                                    alt="AI PromptVerse"
                                /> */}
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                                    AI
                                </div>
                            </div>
                            <div className="flex flex-col justify-center leading-none">
                                <div className="flex items-center text-lg md:text-xl font-extrabold tracking-tight">
                                    <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">AI</span>
                                    <span className="ml-1 text-primary">
                                        Prompt<span className="bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent font-black">Verse</span>
                                    </span>
                                </div>
                                <span className="text-[10px] font-medium text-neutral-500 tracking-widest uppercase mt-0.5">Marketplace</span>
                            </div>
                        </Link>
                    </div>

                    {/* 🎯 DESKTOP MENU LINKS */}
                    <ul className="hidden items-center gap-6 md:flex text-sm font-medium">
                        <li>
                            <Link href="/prompts" className="text-neutral-400 hover:text-primary transition-colors">All Prompts</Link>
                        </li>
                        <li>
                            <Link href="/creators" className="text-neutral-400 hover:text-primary transition-colors">Top Creators</Link>
                        </li>
                    </ul>

                    {/* 🔒 AUTH SECTION */}
                    <div className="hidden md:flex items-center gap-4">
                        {!user ? (
                            <>
                                <Link href="/signin" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Login</Link>
                                <Link href="/signup">
                                    <Button color="primary" radius="xl" size="sm" className="font-semibold bg-gradient-to-r from-primary to-indigo-600">Sign Up</Button>
                                </Link>
                            </>
                        ) : (
                            <div className="hidden items-center gap-4 md:flex">
                                <Dropdown>
                                    <Dropdown.Trigger className="rounded-full">
                                        <Avatar size="sm" aria-label="Menu">
                                            <Avatar.Image
                                                referrerPolicy="no-referrer"
                                                alt="John Doe"
                                                src={user?.image}
                                            />
                                            <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                                        </Avatar>
                                    </Dropdown.Trigger>
                                    <Dropdown.Popover>
                                        <div className="px-3 pt-3 pb-1">
                                            <div className="flex items-center gap-2">
                                                <Avatar size="sm">
                                                    <Avatar.Image alt={user?.name} src={user?.image} />
                                                    <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                                                </Avatar>
                                                <div className="flex flex-col gap-0">
                                                    <p className="text-sm leading-5 font-medium">
                                                        {user?.name}
                                                    </p>
                                                    <p className="text-xs leading-none text-muted">
                                                        {user?.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <Dropdown.Menu
                                            onAction={(key) => console.log(`Selected: ${key}`)}
                                        >
                                            <Dropdown.Item id="new-file" textValue="New file">
                                                <Link
                                                    className="flex items-center gap-2"
                                                    href={`/dashboard/${user?.role}`}
                                                >
                                                    <MdDashboard />
                                                    <Label>Dashboard</Label>
                                                </Link>
                                            </Dropdown.Item>

                                            <Dropdown.Item id="copy-link" textValue="Copy link">
                                                <CgProfile />
                                                <Label>Profile</Label>
                                            </Dropdown.Item>

                                            <Dropdown.Item
                                                id="delete-file"
                                                textValue="Delete file"
                                                variant="danger"
                                                onClick={handleSignOut}
                                            >
                                                <BiLogOut />
                                                <Label>Logout</Label>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Popover>
                                </Dropdown>
                            </div>
                        )}
                    </div>
                </header>

                {/* 📱 MOBILE RESPONSIVE MENU */}
                {isMenuOpen && (
                    <div className="border-t border-neutral-800 bg-background md:hidden">
                        <ul className="flex flex-col gap-2 p-4 text-base font-medium">
                            <li>
                                <Link href="/prompts" className="block py-2 text-neutral-400" onClick={() => setIsMenuOpen(false)}>All Prompts</Link>
                            </li>
                            <li>
                                <Link href="/creators" className="block py-2 text-neutral-400" onClick={() => setIsMenuOpen(false)}>Top Creators</Link>
                            </li>
                            {!user ? (
                                <li className="mt-4 flex flex-col gap-2 border-t border-neutral-800 pt-4">
                                    <Link href="/signin" className="block py-2 text-neutral-400" onClick={() => setIsMenuOpen(false)}>Login</Link>
                                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                                        <Button color="primary" className="w-full bg-gradient-to-r from-primary to-indigo-600">Sign Up</Button>
                                    </Link>
                                </li>
                            ) : (
                                <li className="mt-4 flex flex-col gap-2 border-t border-neutral-800 pt-4">
                                    <Link href="/dashboard" className="block py-2 text-neutral-400" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                                    <button onClick={() => { handleSignOut(); setIsMenuOpen(false); }} className="block py-2 text-danger text-left font-medium">Logout</button>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;