import { useEffect } from 'react';
import { useLayout } from "../../../layout/components/use-layout";
import { ContentView } from "../../../layout/components/content";
import { Button } from "@/components/button";
import { Download, Settings } from "lucide-react";

export function DynamicsOverviewPage() {
    const { setHeaderData } = useLayout();

    useEffect(() => {
        setHeaderData({
            title: 'Team Dynamics',
            actions: (
                <>
                    <Button variant="outline" size="sm">
                        <Download />
                        Export
                    </Button>
                    <Button variant="ghost" mode="icon" size="sm">
                        <Settings />
                    </Button>
                </>
            ),
        });

        return () => setHeaderData(undefined);
    }, [setHeaderData]);

    return <ContentView />;
}
