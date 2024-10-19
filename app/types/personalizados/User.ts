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



