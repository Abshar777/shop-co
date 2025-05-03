import { NavItem } from "@/types";

export const AdminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/admin/dashboard',
        icon: 'dashboard',
        isActive: false,
        shortcut: ['d', 'd'],
        items: [] // Empty array as there are no child items for Dashboard
    },


    {
        title: 'Users',
        url: '/admin/superAdmin/users',
        icon: 'user2',
        shortcut: ['u', 'u'],
        isActive: false,

    },
    {
        title: 'Delivery Boys',
        url: '/admin/superAdmin/deliveryBoys',
        icon: 'deliveryBoy',
        shortcut: ['b', 'b'],
        isActive: false,
    },
    {
        title: 'Orders',
        url: '/admin/orders',
        icon: 'box',
        shortcut: ['o', 'o'],
        isActive: false,
    },




];

export const DeliveryBoyNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/admin/dashboard',
        icon: 'dashboard',
        shortcut: ['d', 'd'],
        isActive: false,
    },
    {
        title: 'Orders',
        url: '/admin/orders',
        icon: 'box',
        shortcut: ['o', 'o'],
        isActive: false,
    },
    {
        title: 'My Orders',
        url: '/admin/myOrders',
       
        shortcut: ['o', 'o'],
        isActive: false,
    }
]

export const roleByNavItems = (role: string) => {
    if (role === 'admin') {
        return AdminNavItems
    } else  {
        return DeliveryBoyNavItems
    }
}
