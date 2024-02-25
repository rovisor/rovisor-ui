export interface SidebarItem {
    label: string;
    icon: string;
    route: string;
    expanded?: boolean;
    children?: SidebarItem[];
}