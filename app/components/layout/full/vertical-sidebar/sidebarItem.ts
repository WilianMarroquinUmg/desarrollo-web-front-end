

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
    value?: string;
}


const sidebarItem: menu[] = [
    {
        title: 'Home',
        icon: 'mdi-home',
        value: 'home',
        to: '/',
    },
    {
        title: 'Admin',
        icon: 'mdi-account-circle',
        value: 'users',
        children: [
            {
                title: 'Users',
                icon: 'mdi-account-multiple',
                value: 'User',
                to: '/users',
            },
        ],
    },
    {
        title: 'icons',
        icon: 'iconsminds-three-arrow-fork',
        value: 'icons',
        to: '/icons',
    },
    {
        title: 'Direcciones',
        icon: 'iconsminds-three-arrow-fork',
        value: 'Direccion',
        to: '/direcciones',
    }

];




export default sidebarItem;
