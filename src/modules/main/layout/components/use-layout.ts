import { createContext, useContext, type CSSProperties, type ReactNode } from 'react';

export interface HeaderData {
    title?: string;
    actions?: ReactNode;
    breadcrumbs?: Array<{ label: string; path?: string }>;
}

export interface LayoutState {
    style: CSSProperties;
    bodyClassName: string;
    isMobile: boolean;
    sidebarCollapsed: boolean;
    isMailViewExpanded: boolean;
    headerData?: HeaderData;
    showMailView: () => void;
    hideMailView: () => void;
    toggleMailView: () => void;
    toggleSidebar: () => void;
    setHeaderData: (data: HeaderData | undefined) => void;
}

export const LayoutContext = createContext<LayoutState | undefined>(undefined);

export const useLayout = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
};