import readline  from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Preguntar al usuario cuántos campos quiere ingresar
rl.question('¿Cuántos campos quieres ingresar? ', (numCampos) => {
    const campos = [];
    let count = 0;

    const askFieldName = () => {
        if (count < numCampos) {
            rl.question(`Ingresa el nombre del campo ${count + 1}: `, (campo) => {
                campos.push(campo);
                count++;
                askFieldName(); // Repetir hasta que se ingresen todos los campos
            });
        } else {
            rl.close();

            // Mostrar el resultado final
            const result = campos.reduce((obj, campo) => {
                obj[campo] = null; // Inicializar con valor nulo o como gustes
                return obj;
            }, {});

            console.log('Campos ingresados:', result);
        }
    };

    askFieldName(); // Iniciar el ciclo de preguntas
});

rl.on('close', () => {
    console.log('Proceso terminado.');
    process.exit(0);
});
