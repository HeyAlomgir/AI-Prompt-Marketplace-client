import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";


export default function DashBoardLayout({ children }) {
    return (
        <div className="flex h-screen bg-background">
            <div className="flex flex-1 overflow-hidden">
                {/* sidebar */}
                <div>
                    <DashboardSidebar />
                </div>

                {/* main content */}

                <main className="p-5">
                    {/* navbar */}
                    <div className="border border-b-1 w-full p-3">Navbar</div>
                    {children}
                </main>
            </div>

        </div>
    );
}