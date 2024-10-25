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
        title: 'Pajas de Agua',
        icon: 'mdi-water-outline',
        value: 'PajaAgua',
        to: '/pajas/',
    },
    {
        title: 'Admin',
        icon: 'mdi-account-cog',
        value: '',
        children: [
            {
                title: 'Usuarios',
                icon: 'mdi-account-multiple',
                value: 'User',
                to: '/users',
            },
            {
                title: 'Residentes',
                icon: 'mdi-account-group',
                value: 'Residente',
                to: '/residentes',
            },

            {
                title: 'Catalogos',
                icon: 'mdi-view-list',
                value: '',
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

];


export default sidebarItem;
