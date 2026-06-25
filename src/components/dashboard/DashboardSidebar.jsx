

import { auth } from "@/lib/auth";
import { Bars, Bell, ChartAreaStacked, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
// import { ChartArea } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { BiMoney } from "react-icons/bi";
import { TbAsset } from "react-icons/tb";

export async function DashboardSidebar() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;
    const role = user?.role || "user"

    console.log("Role:", role)
    console.log(user);
    const dashboardItems = {
        creator: [
            { icon: ChartAreaStacked, label: "Overview", link: '/dashboard/seller' },
            { icon: TbAsset, label: "Products", link: '/dashboard/seller/products' },
            { icon: BiMoney, label: "Transaction", link: '/dashboard/seller/transaction' }
        ],
        user: [
            { icon: ChartAreaStacked, label: "Overview", link: '/dashboard/buyer' },
            { icon: TbAsset, label: "Products", link: '/dashboard/buyer/products' },
            { icon: BiMoney, label: "Transaction", link: '/dashboard/buyer/transaction' }
        ],
        admin: [
            { icon: ChartAreaStacked, label: "Overview", link: '/dashboard/admin' },
            { icon: TbAsset, label: "User Manage", link: '/dashboard/adimin/user-manage' },
            { icon: BiMoney, label: "Transaction", link: '/dashboard/admin/transaction' }
        ],
    }


    const navItems = dashboardItems[role] ?? dashboardItems["user"]



    return (
        <Drawer>
            <Button variant="secondary" className={"lg:hidden"}>
                <Bars />
                Menu
            </Button>


            <nav className="flex flex-col gap-1 sm:hidden md:block lg:block w-56 h-full border-r-1 pt-3">
                <div className="border border-b py-2 ">
                    <Image
                        src={"/logo-xl.png"}
                        width={230}
                        height={130}
                        alt="logo"></Image>
                </div>
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                        type="button"
                    >
                        <item.icon className="size-5 text-muted" />
                        {item.label}
                    </button>
                ))}
            </nav>
            <Drawer.Backdrop>
                <Drawer.Content placement="left">
                    <Drawer.Dialog>
                        <Drawer.CloseTrigger />
                        <Drawer.Header>
                            <Drawer.Heading>Navigation</Drawer.Heading>
                        </Drawer.Header>
                        <Drawer.Body>
                            <nav className="flex flex-col gap-1">
                                {navItems.map((item) => (
                                    <button
                                        key={item.label}
                                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                                        type="button"
                                    >
                                        <item.icon className="size-5 text-muted" />
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </Drawer.Body>
                    </Drawer.Dialog>
                </Drawer.Content>
            </Drawer.Backdrop>
        </Drawer>
    );
}