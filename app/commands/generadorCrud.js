import fs from 'fs';
import path from 'path';
import readline from 'readline';

const __dirname = path.resolve(); // Ruta base del proyecto

// Configura readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = (query) => {
    return new Promise((resolve) => rl.question(query, resolve));
};

const askQuestions = async () => {
    try {
        const modelo = await question('Ingrese el nombre del modelo: (Ej: User) ');
        if (!modelo) throw new Error("El nombre del modelo no puede estar vacío.");

        const modeloMinusculas = modelo.toLowerCase(); // Convertir el nombre del modelo a minúsculas
        const directory = `./app/pages/${modeloMinusculas}`; // Ruta de la carpeta del modelo

        // Crea la carpeta si no existe
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        // Leer las plantillas desde los archivos
        const listTemplate = fs.readFileSync(path.join(__dirname + '/app/generatorCrud/', 'template', 'indexTemplate.vue'), 'utf-8').replace(/{{ model }}/g, modelo);
        const createTemplate = fs.readFileSync(path.join(__dirname + '/app/generatorCrud/', 'template', 'createTemplate.vue'), 'utf-8').replace(/{{ model }}/g, modelo);
        const editTemplate = fs.readFileSync(path.join(__dirname + '/app/generatorCrud/', 'template', 'editTemplate.vue'), 'utf-8').replace(/{{ model }}/g, modelo);
        const showTemplate = fs.readFileSync(path.join(__dirname + '/app/generatorCrud/', 'template', 'showTemplate.vue'), 'utf-8').replace(/{{ model }}/g, modelo);

        // Crear los archivos en la carpeta del modelo
        fs.writeFileSync(path.join(directory, 'index.vue'), listTemplate);
        fs.writeFileSync(path.join(directory, 'create.vue'), createTemplate);

        // Crear la carpeta edit si no existe y luego crear el archivo [id].vue
        const editDir = path.join(directory, 'edit');
        if (!fs.existsSync(editDir)) {
            fs.mkdirSync(editDir, { recursive: true });
        }
        fs.writeFileSync(path.join(editDir, '[id].vue'), editTemplate);

        // Crear la carpeta show si no existe y luego crear el archivo [id].vue
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

// Inicia el flujo de preguntas
askQuestions();
