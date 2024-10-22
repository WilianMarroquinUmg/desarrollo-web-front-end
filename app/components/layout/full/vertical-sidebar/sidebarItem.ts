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
                        title: 'Tipos Adquisición',
                        icon: 'mdi-book-plus-multiple',
                        value: 'TipoAdquisicion',
                        to: '/tipoadquisiciones',
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
        title: 'Movimientos',
        icon: 'mdi-water-outline',
        value: 'pruebas',
        children: [
            {
                title: 'Pajas de Agua',
                icon: 'mdi-water-outline',
                value: 'PajaAgua',
                to: '/pajas/',
            },
        ],
    },
];


export default sidebarItem;
