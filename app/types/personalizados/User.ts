import * as Yup from 'yup';

export interface UserForm {
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export const validaciones = Yup.object({
    primer_nombre: Yup.string().required('Required'),
    segundo_nombre: Yup.string().required('Required'),
    primer_apellido: Yup.string().required('Required'),
    segundo_apellido: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
    password_confirmation: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Required')
});


