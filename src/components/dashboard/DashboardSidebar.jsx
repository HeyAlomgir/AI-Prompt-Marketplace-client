

import { auth } from "@/lib/auth";
import { Bars, Bell, ChartAreaStacked, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
// import { ChartArea } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { BiMoney } from "react-icons/bi";
import { GiAnatomy } from "react-icons/gi";
import { GoReport } from "react-icons/go";
import { IoIosAddCircle } from "react-icons/io";
import { SiSpringCreators } from "react-icons/si";
import { TbAsset } from "react-icons/tb";

export async function DashboardSidebar() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;
    const current = user?.role || "User"
    const currentRole = current.toLowerCase();
    const role = currentRole;

    console.log("Role:", role)
    console.log(user)

    const dashboardItems = {

        user: [
            { icon: ChartAreaStacked, label: "Overview", link: '/dashboard/user' },
            { icon: TbAsset, label: "My Purchases", link: '/dashboard/user/purchases' },
            { icon: Gear, label: "Bookmarks", link: '/dashboard/user/bookmarks' }
        ],
        creator: [

            { icon: SiSpringCreators, label: "Creator Dashboard Home", link: '/dashboard/creator' },
            { icon: IoIosAddCircle, label: "Add Prompt", link: '/dashboard/creator/add-prompt' },

            { icon: GiAnatomy, label: "My Prompts", link: '/dashboard/creator/my-prompts' },
        ],
        admin: [
            { icon: Person, label: "All User", link: '/dashboard/admin/all-user' },
            { icon: TbAsset, label: "All Prompts", link: '/dashboard/admin/all-prompts' },
            { icon: BiMoney, label: "All Payement", link: '/dashboard/admin/all-payment' },
            { icon: ChartAreaStacked, label: "Admin Analytics", link: '/dashboard/admin' },
            { icon: GoReport, label: "Report Prompt", link: '/dashboard/report-prompt' },
        ],
    };



    const navItems = dashboardItems[role] ?? dashboardItems["user"]



    return (

        <div className="flex flex-col h-full justify-between">

            {/* sm device */}
            <Drawer>
                <Button variant="secondary" className="lg:hidden m-3">
                    <Bars /> Menu
                </Button>

                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>
                                    <div className="w-72 h-32 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                                        AI
                                    </div>
                                </Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body className="flex flex-col justify-between h-full pb-6">
                                {/* sm menu */}
                                <nav className="flex flex-col gap-1">
                                    {navItems.map((item) => (
                                        <Link key={item.label} href={item.link} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default">
                                            <item.icon className="size-5 text-muted" />
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>

                                {/* sm device bk to home */}
                                <div className="border-t pt-3">
                                    <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-primary bg-primary/10 transition-colors hover:bg-primary/20">
                                        <House className="size-5" />
                                        Back to Home
                                    </Link>
                                </div>
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>

            {/* desktop sidebar */}
            <div className="hidden lg:flex flex-col justify-between w-56 h-screen border-r bg-background pt-3 pb-6 px-4">
                <div className="flex flex-col gap-4">
                    {/* logo area */}
                    <div className="border-b pb-3">
                        <Link href="/">

                            <div className="w-55 h-32 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                                AI
                            </div>
                        </Link>
                    </div>

                    {/* desktop menu item */}
                    <nav className="flex flex-col gap-1">
                        {navItems.map((item) => (
                            <Link key={item.label} href={item.link} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default">
                                <item.icon className="size-5 text-muted" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* desktop bk to home */}
                <div className="border-t pt-3">
                    <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-primary bg-primary/10 transition-colors hover:bg-primary/20">
                        <House className="size-5" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}