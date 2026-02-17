import { Button } from "@/components/button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useLayout } from "./use-layout";

export function Header() {
    const { toggleSidebar, sidebarCollapsed, headerData } = useLayout();

    return (
        <div className="flex items-center justify-between px-2 py-3 gap-1">
            <div className="flex items-center gap-2">
                <Button variant="ghost" mode="icon" onClick={toggleSidebar} className="hidden lg:inline-flex">
                    {sidebarCollapsed ? <PanelLeftOpen/> : <PanelLeftClose/>}
                </Button>
                {headerData?.title && (
                    <h1 className="text-lg font-semibold">{headerData.title}</h1>
                )}
            </div>
            {headerData?.actions && (
                <div className="flex items-center gap-2">
                    {headerData.actions}
                </div>
            )}
        </div>
    );
}