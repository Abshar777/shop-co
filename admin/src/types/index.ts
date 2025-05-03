import { Icons } from '@/components/global/icons';
import { ZodObject } from 'zod';
import { ZodString } from 'zod';
import { ZodTypeAny } from 'zod';

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}


export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;


export interface IAuthSchema extends ZodObject<{
  email: ZodString;
  password: ZodString;
}, "strip", ZodTypeAny, {
  email: string;
  password: string;
  name: string;
}, {
  email: string;
  password: string;
  name: string;
}> {}


