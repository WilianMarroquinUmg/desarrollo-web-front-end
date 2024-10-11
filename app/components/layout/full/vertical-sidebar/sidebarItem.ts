

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
        title: 'Users',
        icon: 'mdi-account-circle',
        value: 'users',
        children: [
            {
                title: 'Listar Usuarios',
                icon: 'mdi-account-multiple',
                value: 'admin',
                to: '/users',
            },
            {
                title: 'Crear Usuario',
                icon: 'mdi-account-plus',
                value: 'actions',
                to: '/users/create',
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
        title: 'Prueba',
        icon: 'iconsminds-three-arrow-fork',
        value: 'prueba',
        to: '/prueba',
    }

];




export default sidebarItem;
