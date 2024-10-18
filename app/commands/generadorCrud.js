import fs from 'fs';
import path from 'path';
import readline from 'readline';

const __dirname = path.resolve();

// Configura readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = (query) => {
    return new Promise((resolve) => rl.question(query, resolve));
};

const formatearCamposTable = (campos) => {
    return campos.map(campo => {
        return {
            label: formatearCampoLabel(campo),
            field: campo,
        };
    });
};
// const formatearCamposFormCreate = (campos) => {
//
//     let state = {};
//
//     campos.forEach(campo => {
//         state[campo] = 'undefined';
//     });
//
//     const stateText = `{ ${Object.entries(state).map(([key, value]) => `${key}: ${value}`).join(', ')} }`;
//     return stateText;
//
// }

const formatearCamposFormCreate = (campos) => {

    let state = {};

    campos.forEach(campo => {
        state[campo] = 'undefined';
    });

    const stateText = `{ ${Object.entries(state).map(([key, value]) => `${key}: ${value}`).join(',\n')} }`; // Agrega un salto de línea aquí
    return stateText;

}


// const objectSchema = (campos) => {
//     let esquema = {};
//
//     campos.forEach(campo => {
//         esquema[campo] = 'string().required("Este campo es requerido")';
//     });
//
//     const schemaText = `object({ ${Object.entries(esquema).map(([key, value]) => `${key}: ${value}`).join(', ')} })`;
//     return schemaText;
// }

const objectSchema = (campos) => {
    let esquema = {};

    campos.forEach(campo => {
        esquema[campo] = 'string().required("Este campo es requerido")';
    });

    const schemaText = `object({ ${Object.entries(esquema).map(([key, value]) => `${key}: ${value}`).join(',\n')} })`; // Agrega un salto de línea aquí
    return schemaText;
}

const askQuestions = async () => {
    try {
        const modelo = await question('Ingrese el nombre del modelo: (Ej: User) ');
        if (!modelo) throw new Error("El nombre del modelo no puede estar vacío.");

        const camposInput = await question('Ingrese los nombres de los campos separados por coma (Ej: nombre,apellido,segundo_nombre): ');
        if (!camposInput) throw new Error("Los campos no pueden estar vacíos.");

        const url = await question('Ingrese la url de la API (Ejemplo: /api/users): ');
        if (!url) throw new Error("La url no puede estar vacía.");

        const campos = camposInput.split(',').map(campo => campo.trim());

        const modeloMinusculas = modelo.toLowerCase();

        const directory = `./app/pages/${pluralizar(modeloMinusculas)}`;

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        const columnas = formatearCamposTable(campos);
        const columnasJSON = JSON.stringify(columnas, null, 2);

        const listTemplate = fs.readFileSync(path.join(__dirname + '/app/generatorCrud/', 'template', 'indexTemplate.vue'), 'utf-8')
            .replace(/{{ model }}/g, modelo)
            .replace(/{{ fields }}/g, columnasJSON)
            .replace(/{{ url }}/g, url)
            .replace(/{{ directory }}/g, directory.split('pages/')[1] );

        const createTemplate = fs.readFileSync(path.join(__dirname + '/app/generatorCrud/', 'template', 'createTemplate.vue'), 'utf-8')
            .replace(/{{ model }}/g, modelo)
            .replace(/{{ camposCreate }}/g, formatearCamposFormCreate(campos))
            .replace(/{{ validacionesCreate }}/g, objectSchema(campos))
            .replace(/{{ url }}/g, url)
            .replace(/{{ fields }}/g, columnasJSON)
            .replace(/{{ directory }}/g, directory.split('pages/')[1] );

        const editTemplate = fs.readFileSync(path.join(__dirname + '/app/generatorCrud/', 'template', 'editTemplate.vue'), 'utf-8')
            .replace(/{{ model }}/g, modelo)
            .replace(/{{ camposCreate }}/g, formatearCamposFormCreate(campos))
            .replace(/{{ validacionesCreate }}/g, objectSchema(campos))
            .replace(/{{ url }}/g, url)
            .replace(/{{ fields }}/g, columnasJSON)
            .replace(/{{ directory }}/g, directory.split('pages/')[1] );

        const showTemplate = fs.readFileSync(path.join(__dirname + '/app/generatorCrud/', 'template', 'showTemplate.vue'), 'utf-8')
            .replace(/{{ model }}/g, modelo)
            .replace(/{{ fields }}/g, columnasJSON)
            .replace(/{{ directory }}/g, directory.split('pages/')[1] )
            .replace(/{{ url }}/g, url);


        fs.writeFileSync(path.join(directory, 'index.vue'), listTemplate);
        fs.writeFileSync(path.join(directory, 'create.vue'), createTemplate);

        const editDir = path.join(directory, 'edit');
        if (!fs.existsSync(editDir)) {
            fs.mkdirSync(editDir, { recursive: true });
        }
        fs.writeFileSync(path.join(editDir, '[id].vue'), editTemplate);

        const showDir = path.join(directory, 'show');
        if (!fs.existsSync(showDir)) {
            fs.mkdirSync(showDir, { recursive: true });
        }
        fs.writeFileSync(path.join(showDir, '[id].vue'), showTemplate);

        console.log(`Archivos creados en ${directory}:`);
        console.log('- index.vue');
        console.log('- create.vue');
        console.log('- edit/[id].vue');
        console.log('- show/[id].vue');

    } catch (error) {
        console.error(`Error: ${error.message}`);
    } finally {
        rl.close();
    }
};

function pluralizar(palabra) {
    if (!palabra) return "";

    const vocales = ['a', 'e', 'i', 'o', 'u'];
    const ultimaLetra = palabra.slice(-1).toLowerCase();
    const penultimaLetra = palabra.slice(-2, -1).toLowerCase();

    if (vocales.includes(ultimaLetra)) {
        return palabra + 's';
    } else if (ultimaLetra === 'z') {
        return palabra.slice(0, -1) + 'ces';
    } else if (ultimaLetra === 'n' || ultimaLetra === 'r') {
        return palabra + 'es';
    } else if (ultimaLetra === 'l' && penultimaLetra === 'e') {
        return palabra + 'es';
    } else {
        return palabra + 'es';
    }
}

askQuestions();


function formatearCampoLabel(str){

    return str
        .split('_')
        .filter(word => word.toLowerCase() !== 'id')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

}
