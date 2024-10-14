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

const formatearCampos = (campos) => {
    return campos.map(campo => {
        return {
            label: campo,
            field: campo,
        };
    });
};

const askQuestions = async () => {
    try {
        const modelo = await question('Ingrese el nombre del modelo: (Ej: User) ');
        if (!modelo) throw new Error("El nombre del modelo no puede estar vacío.");

        const camposInput = await question('Ingrese los nombres de los campos separados por coma (Ej: nombre,apellido,segundo_nombre): ');
        if (!camposInput) throw new Error("Los campos no pueden estar vacíos.");

        const url = await question('Ingrese la url de la API (Ejemplo: /api/users): ');
        if (!url) throw new Error("La url no puede estar vacía.");

        const campos = camposInput.split(',').map(campo => campo.trim());

        console.log(campos);

        const modeloMinusculas = modelo.toLowerCase();
        const directory = `./app/pages/${modeloMinusculas}`;

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        const columnas = formatearCampos(campos);
        const columnasJSON = JSON.stringify(columnas, null, 2); // Convertir a formato JSON

        const listTemplate = fs.readFileSync(path.join(__dirname + '/app/generatorCrud/', 'template', 'indexTemplate.vue'), 'utf-8')
            .replace(/{{ model }}/g, modelo)
            .replace(/{{ Reemplazame }}/g, columnasJSON)
            .replace(/{{ url }}/g, url);

        const createTemplate = fs.readFileSync(path.join(__dirname + '/app/generatorCrud/', 'template', 'createTemplate.vue'), 'utf-8')
            .replace(/{{ model }}/g, modelo);

        const editTemplate = fs.readFileSync(path.join(__dirname + '/app/generatorCrud/', 'template', 'editTemplate.vue'), 'utf-8')
            .replace(/{{ model }}/g, modelo);

        const showTemplate = fs.readFileSync(path.join(__dirname + '/app/generatorCrud/', 'template', 'showTemplate.vue'), 'utf-8')
            .replace(/{{ model }}/g, modelo);

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

askQuestions();
