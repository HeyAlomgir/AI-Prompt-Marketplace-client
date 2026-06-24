'use client'; 

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@heroui/react'; // তোমার প্রজেক্টের HeroUI বাটন ব্যবহার করা হলো

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4 overflow-hidden relative">

            {/* 🔮 Background Decorative Blobs (AI PromptVerse Theme) */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary rounded-full filter blur-[130px] opacity-20 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600 rounded-full filter blur-[130px] opacity-20 animate-pulse delay-700"></div>

            {/* Main Content Container */}
            <div className="flex flex-col items-center max-w-xl text-center z-10">

                {/* 🚀 BRAND LOGO AREA */}
                <div className="flex items-center gap-2.5 text-foreground font-bold text-xl tracking-tight select-none mb-8">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary via-purple-500 to-indigo-600 text-white shadow-md shadow-primary/20">
                        <Image
                            src="https://i.ibb.co.com/M5P07f7t/image-removebg-preview.png"
                            width={40}
                            height={40}
                            className="object-cover scale-110"
                            alt="AI PromptVerse"
                        />
                    </div>
                    <div className="flex flex-col justify-center text-left leading-none">
                        <div className="flex items-center text-lg md:text-xl font-extrabold tracking-tight">
                            <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">AI</span>
                            <span className="ml-1 text-primary">
                                Prompt<span className="bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent font-black">Verse</span>
                            </span>
                        </div>
                        <span className="text-[10px] font-medium text-neutral-500 tracking-widest uppercase mt-0.5">Marketplace</span>
                    </div>
                </div>

                {/* Animated Loop Visual with 404 */}
                <div className="relative flex items-center justify-center h-48 w-48 mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-dashed border-primary/40 animate-[spin_20s_linear_infinite]"></div>
                    <div className="absolute inset-3 rounded-full border-4 border-t-primary border-r-purple-500 border-b-transparent border-l-transparent animate-[spin_3s_linear_infinite]"></div>
                    <div className="absolute inset-10 bg-gradient-to-tr from-primary via-purple-500 to-indigo-600 rounded-full blur-md opacity-70"></div>
                    <h1 className="text-5xl font-black tracking-tighter text-white z-10 drop-shadow-md">
                        404
                    </h1>
                </div>

                {/* Badge */}
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 mb-4">
                    Matrix Compilation Failed
                </span>

                {/* Error Messages */}
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                    Lost in the PromptVerse!
                </h2>

                <p className="text-neutral-400 text-sm md:text-base mb-8 max-w-md leading-relaxed">
                    The prompt matrix or page you are looking for has been moved or does not exist. Let's get you back to the <span className="text-primary font-semibold">Marketplace</span>.
                </p>

                {/* Action Buttons using HeroUI component for consistency */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link href="/" className="w-full sm:w-auto">
                        <Button
                            radius="xl"
                            className="w-full sm:w-40 font-bold bg-gradient-to-r from-primary to-indigo-600 text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:scale-[1.03]"
                        >
                            Back to Home
                        </Button>
                    </Link>
                    
                    <Button
                        radius="xl"
                        variant="bordered"
                        onClick={() => router.back()}
                        className="w-full sm:w-40 font-bold border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition-transform duration-300 hover:scale-[1.03]"
                    >
                        Go Back
                    </Button>
                </div>
            </div>

            {/* Footer Branding */}
            <div className="absolute bottom-6 text-center w-full left-0 z-10">
                <p className="text-xs text-neutral-600 tracking-wide">
                    Powered by <span className="font-semibold text-neutral-400">AI PromptVerse</span> Next-Gen Marketplace
                </p>
            </div>
        </div>
    );
}