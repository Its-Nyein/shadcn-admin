import { LinkProps } from "next/link";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role?: string;
}

interface Team {
  name: string;
  logo: React.ElementType;
  plan: string;
}

interface BaseNavItem {
  title: string;
  badge?: string;
  badgeColor?: "violet" | "green";
  icon?: React.ElementType;
}

type NavLink = BaseNavItem & {
  url: LinkProps["href"];
  items?: never;
};

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps["href"] })[];
  url?: never;
};

type NavItem = NavCollapsible | NavLink;

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface SidebarData {
  user?: User;
  teams: Team[];
  navGroups: NavGroup[];
}

interface ThemePreset {
  label?: string;
  styles: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

interface ColorTheme {
  name: string;
  value: string;
  preset: ThemePreset;
}

interface SidebarVariant {
  name: string;
  value: "sidebar" | "floating" | "inset";
  description: string;
}

interface SidebarCollapsibleOption {
  name: string;
  value: "offcanvas" | "icon" | "none";
  description: string;
}

interface SidebarSideOption {
  name: string;
  value: "left" | "right";
}

interface RadiusOption {
  name: string;
  value: string;
}

interface BrandColor {
  name: string;
  cssVar: string;
}

interface ImportedTheme {
  light: Record<string, string>;
  dark: Record<string, string>;
}

export type {
  BrandColor,
  ColorTheme,
  ImportedTheme,
  NavCollapsible,
  NavGroup,
  NavItem,
  NavLink,
  RadiusOption,
  SidebarCollapsibleOption,
  SidebarData,
  SidebarSideOption,
  SidebarVariant,
  Team,
  ThemePreset,
  User,
};
