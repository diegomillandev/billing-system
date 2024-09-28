import {
    LayoutDashboard,
    Receipt,
    Sheet,
    ShoppingCart,
    Tag,
    UsersRound,
} from 'lucide-react'

export const dataSiderbarRoutes = [
    {
        href: '/',
        title: 'Dashboard',
        icon: LayoutDashboard,
    },
    {
        href: '/categories',
        title: 'Categories',
        icon: Tag,
    },
    {
        href: '/stock',
        title: 'Stock',
        icon: Sheet,
    },
    {
        href: '/clients',
        title: 'Clients',
        icon: UsersRound,
    },
    {
        href: '/sales',
        title: 'Sales',
        icon: ShoppingCart,
    },
    {
        href: '/purchases',
        title: 'Purchases',
        icon: Receipt,
    },
]
