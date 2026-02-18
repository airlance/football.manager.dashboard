import { ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {type MenuConfig, type MenuItem} from './types';
import { cn } from '@/lib/utils';
import { useMenu } from './use-menu';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from '@/components/menubar';
import { useLayout } from "./use-layout";

const getEmptyItems = (): MenuItem => {
    return {
        children: []
    }
}

export function NavbarMenu() {
    const { pathname } = useLocation();
    const { hasActiveChild } = useMenu(pathname);
    const { menu } = useLayout();
    const currentMenu = menu ?? getEmptyItems();

    // Точное совпадение для пунктов без дочерних элементов
    const isExactActive = (path: string | undefined): boolean => {
        if (!path) return false;
        return pathname === path;
    };

    const buildMenu = (items: MenuConfig) => {
        return items.map((item, index) => {
            if (item.children) {
                const isHere = hasActiveChild(item.children);
                return (
                    <MenubarMenu key={index}>
                        <MenubarTrigger
                            className={cn(
                                'flex items-center gap-1.5 px-2 py-2.5 text-sm text-secondary-foreground text-nowrap',
                                'rounded-none border-b-2 bg-transparent!',
                                'hover:text-foreground hover:bg-transparent',
                                'focus:text-foreground focus:bg-transparent',
                                'data-[state=open]:bg-transparent data-[state=open]:text-foreground',
                                isHere
                                    ? 'border-primary text-foreground'
                                    : 'border-transparent',
                            )}
                            data-here={isHere || undefined}
                        >
                            {item.title}
                            <ChevronDown className="ms-auto size-3.5" />
                        </MenubarTrigger>
                        <MenubarContent className="min-w-[175px]" sideOffset={0}>
                            {buildSubMenu(item.children)}
                        </MenubarContent>
                    </MenubarMenu>
                );
            } else {
                const active = isExactActive(item.path);
                return (
                    <MenubarMenu key={index}>
                        <MenubarTrigger
                            asChild
                            className={cn(
                                'flex items-center px-2 py-2.5 text-sm text-secondary-foreground text-nowrap',
                                'rounded-none border-b-2 bg-transparent!',
                                'hover:text-foreground hover:bg-transparent',
                                'focus:text-foreground focus:bg-transparent',
                                active
                                    ? 'border-primary text-foreground'
                                    : 'border-transparent',
                            )}
                        >
                            <Link
                                to={item.path || ''}
                                data-active={active || undefined}
                            >
                                {item.title}
                            </Link>
                        </MenubarTrigger>
                    </MenubarMenu>
                );
            }
        });
    };

    const buildSubMenu = (items: MenuConfig) => {
        return items.map((item, index) => {
            if (item.children) {
                return (
                    <MenubarSub key={index}>
                        <MenubarSubTrigger
                            data-here={hasActiveChild(item.children) || undefined}
                        >
                            <span>{item.title}</span>
                        </MenubarSubTrigger>
                        <MenubarSubContent className="min-w-[175px]">
                            {buildSubMenu(item.children)}
                        </MenubarSubContent>
                    </MenubarSub>
                );
            } else {
                return (
                    <MenubarItem
                        key={index}
                        asChild
                        data-active={isExactActive(item.path) || undefined}
                    >
                        <Link to={item.path || ''}>{item.title}</Link>
                    </MenubarItem>
                );
            }
        });
    };

    return (
        <div className="grid">
            <div className="kt-scrollable-x-auto">
                <Menubar className="flex items-stretch border-none bg-transparent p-0 h-auto">
                    {buildMenu(currentMenu.children as MenuConfig)}
                </Menubar>
            </div>
        </div>
    );
}