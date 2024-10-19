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
        icon: 'mdi-account-cog',
        value: 'users',
        children: [
            {
                title: 'Users',
                icon: 'mdi-account-multiple',
                value: 'User',
                to: '/users',
            },
            {
                title: 'Catalogos',
                icon: 'mdi-view-list',
                value: 'Role',
                children: [
                    {
                        title: 'Pendiente',
                        icon: 'mdi-account-group',
                        value: 'Role',
                        to: '/roles',
                    },
                    {
                        title: 'Direcciones',
                        icon: 'mdi-home-group-minus',
                        value: 'Direccion',
                        to: '/direcciones',
                    },
                ],
            },
        ],
    },
    {
        title: 'Pajas De Agua',
        icon: 'mdi-water-outline',
        value: 'pruebas',
        children: [
            {
                title: 'Nuevo Traslado',
                icon: 'mdi-file-document-edit',
                value: 'nuevoTraslado',
                to: '/pajas/trasladar',
            },
            {
                title: 'Nueva',
                icon: 'mdi-plus',
                value: 'PajaNueva',
                to: '/pajas/nueva',
            },
            {
                title: 'Buscador',
                icon: 'mdi-file-search',
                value: 'PajasBuscador',
                to: '/pajas/buscador',
            },
        ],
    },
];


export default sidebarItem;
