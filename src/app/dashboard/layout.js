import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default function DashBoardLayout({ children }) {
    return (
        <div className="flex h-screen w-screen bg-background overflow-hidden">
            {/* 📊 ১. সাইডবার সেকশন */}
            <DashboardSidebar />

            {/* 🖥️ ২. ডানপাশের পুরো মেইন এরিয়া */}
            <div className="flex flex-col flex-1 h-full overflow-hidden">
                
                {/* 🧭 ড্যাশবোর্ড টপ নেভবার */}
                <header className="border-b border-divider w-full p-4 flex items-center justify-between bg-content1/50 backdrop-blur-md">
                    <div className="font-semibold text-sm">Dashboard</div>
                    {/* এখানে চাইলে পরে নোটিফিকেশন আইকন বা ইউজারের প্রোফাইল ড্রপডাউন বসাতে পারবে */}
                </header>

                {/* 📄 ডাইনামিক কন্টেন্ট এরিয়া (যা স্ক্রল হবে) */}
                <main className="flex-1 overflow-y-auto p-6 bg-background">
                    {children}
                </main>
            </div>
        </div>
    );
}