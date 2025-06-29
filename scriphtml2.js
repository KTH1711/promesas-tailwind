
        // Configuración de simulaciones
        const simulations = {
            'control-errores': {
                title: 'Control de Errores',
                description: 'Ejemplo clásico de manejo de errores usando .catch() al final de una cadena de promesas.',
                inputs: [
                    { type: 'text', label: 'Nombre del archivo', id: 'filename', value: 'inexistente.txt' }
                ],
                execute: (inputs) => {
                    const filename = inputs.filename;
                    log('Iniciando simulación de control de errores...', 'info');
                    
                    // Simular la función leerArchivo
                    function leerArchivo(path) {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (path && path !== 'inexistente.txt') {
                                    resolve("Contenido del archivo: " + path);
                                } else {
                                    reject("Error: Archivo no encontrado - " + path);
                                }
                            }, 1000);
                        });
                    }

                    leerArchivo(filename)
                        .then(contenido => {
                            log("Contenido: " + contenido, 'success');
                        })
                        .catch(err => {
                            log("Error: " + err, 'error');
                        });
                }
            },
            'sensores': {
                title: 'Sensores',
                description: 'Simula la lectura de un sensor (temperatura) que devuelve su valor tras un pequeño retardo.',
                inputs: [],
                execute: () => {
                    log('Iniciando simulación de sensores...', 'info');
                    
                    function leerSensor() {
                        return new Promise(resolve => {
                            setTimeout(() => resolve("35°C"), 1000);
                        });
                    }

                    leerSensor().then(temp => {
                        log("Temperatura: " + temp, 'success');
                    });
                }
            },
            'inicia-promesa': {
                title: 'Inicia Promesa',
                description: 'Se inicia una promesa con un valor inicial, y cada .then() transforma el resultado anterior. Ideal para procesos en cadena.',
                inputs: [
                    { type: 'number', label: 'Valor inicial', id: 'initialValue', value: '2' }
                ],
                execute: (inputs) => {
                    const initialValue = parseInt(inputs.initialValue);
                    log('Iniciando cadena de promesas...', 'info');
                    
                    Promise.resolve(initialValue)
                        .then(v => {
                            log(`Valor inicial: ${v}`, 'info');
                            return v * 2;
                        })
                        .then(v => {
                            log(`Después de multiplicar por 2: ${v}`, 'info');
                            return v + 1;
                        })
                        .then(v => {
                            log("Resultado final: " + v, 'success');
                        });
                }
            },
            'rechaza': {
                title: 'Rechaza',
                description: 'Ejecuta una promesa que se comporta diferente según el valor recibido. Muy útil para flujos condicionales.',
                inputs: [
                    { type: 'number', label: 'Valor a verificar', id: 'valor', value: '12' }
                ],
                execute: (inputs) => {
                    const valor = parseInt(inputs.valor);
                    log('Verificando valor...', 'info');
                    
                    function verificarValor(valor) {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (valor > 10) {
                                    resolve("Valor válido");
                                } else {
                                    reject("Valor demasiado bajo");
                                }
                            }, 1000);
                        });
                    }

                    verificarValor(valor)
                        .then(msg => {
                            log(msg, 'success');
                        })
                        .catch(err => {
                            log(err, 'error');
                        });
                }
            },
            'formulario': {
                title: 'Validación de Formulario',
                description: 'Cada campo de un formulario se valida individualmente con una promesa. El envío solo se realiza si todas las validaciones se cumplen.',
                inputs: [
                    { type: 'text', label: 'Nombre', id: 'nombre', value: 'Juan' },
                    { type: 'text', label: 'Correo', id: 'correo', value: 'juan@email.com' }
                ],
                execute: (inputs) => {
                    log('Iniciando validación de formulario...', 'info');
                    
                    function validarNombre(nombre) {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                nombre ? resolve() : reject("Nombre requerido");
                            }, 500);
                        });
                    }

                    function validarCorreo(correo) {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                correo.includes("@") ? resolve() : reject("Correo inválido");
                            }, 500);
                        });
                    }

                    Promise.all([
                        validarNombre(inputs.nombre),
                        validarCorreo(inputs.correo)
                    ])
                        .then(() => {
                            log("Formulario válido", 'success');
                        })
                        .catch(err => {
                            log("Error de validación: " + err, 'error');
                        });
                }
            },
            'secuecias': {
                title: 'Secuencias',
                description: 'Ejecuta varias funciones asíncronas en orden. Cada paso depende del anterior, lo cual es muy común en flujos de procesamiento.',
                inputs: [],
                execute: () => {
                    log('Iniciando secuencia de pasos...', 'info');
                    
                    function paso1() {
                        return new Promise(resolve => {
                            setTimeout(() => resolve("Paso 1 completado"), 1000);
                        });
                    }

                    function paso2() {
                        return new Promise(resolve => {
                            setTimeout(() => resolve("Paso 2 completado"), 1000);
                        });
                    }

                    function paso3() {
                        return new Promise(resolve => {
                            setTimeout(() => resolve("Paso 3 completado"), 1000);
                        });
                    }

                    paso1()
                        .then(res1 => {
                            log(res1, 'info');
                            return paso2();
                        })
                        .then(res2 => {
                            log(res2, 'info');
                            return paso3();
                        })
                        .then(res3 => {
                            log(res3, 'success');
                        })
                        .catch(err => {
                            log(err, 'error');
                        });
                }
            },
            'tiempodiferentes': {
                title: 'Tiempo Diferentes',
                description: 'Simula operaciones que toman diferentes tiempos de ejecución.',
                inputs: [],
                execute: () => {
                    log('Iniciando operaciones con diferentes tiempos...', 'info');
                    
                    const promesa1 = new Promise(resolve => setTimeout(() => resolve("Rápida (500ms)"), 500));
                    const promesa2 = new Promise(resolve => setTimeout(() => resolve("Media (1000ms)"), 1000));
                    const promesa3 = new Promise(resolve => setTimeout(() => resolve("Lenta (2000ms)"), 2000));

                    Promise.all([promesa1, promesa2, promesa3])
                        .then(resultados => {
                            log("Todas las operaciones completadas:", 'success');
                            resultados.forEach((resultado, index) => {
                                log(`Operación ${index + 1}: ${resultado}`, 'info');
                            });
                        });
                }
            },
            'json': {
                title: 'JSON',
                description: 'Simula el procesamiento de datos JSON.',
                inputs: [
                    { type: 'text', label: 'JSON de entrada', id: 'jsonInput', value: '{"nombre": "Juan", "edad": 25}' }
                ],
                execute: (inputs) => {
                    log('Procesando JSON...', 'info');
                    
                    try {
                        const datos = JSON.parse(inputs.jsonInput);
                        log("JSON válido", 'success');
                        log("Datos: " + JSON.stringify(datos, null, 2), 'info');
                    } catch (error) {
                        log("Error al procesar JSON: " + error.message, 'error');
                    }
                }
            },
            'simuacion_database': {
                title: 'Simulación Database',
                description: 'Simula operaciones de base de datos.',
                inputs: [
                    { type: 'text', label: 'Consulta SQL', id: 'query', value: 'SELECT * FROM usuarios' }
                ],
                execute: (inputs) => {
                    log('Ejecutando consulta de base de datos...', 'info');
                    
                    function ejecutarQuery(query) {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (query.toLowerCase().includes('select')) {
                                    resolve([
                                        { id: 1, nombre: 'Juan', email: 'juan@email.com' },
                                        { id: 2, nombre: 'María', email: 'maria@email.com' }
                                    ]);
                                } else {
                                    reject("Consulta no válida");
                                }
                            }, 1500);
                        });
                    }

                    ejecutarQuery(inputs.query)
                        .then(resultados => {
                            log("Consulta ejecutada exitosamente", 'success');
                            log("Resultados: " + JSON.stringify(resultados, null, 2), 'info');
                        })
                        .catch(err => {
                            log("Error en la consulta: " + err, 'error');
                        });
                }
            },
            'espera': {
                title: 'Espera',
                description: 'Simula operaciones que requieren esperar.',
                inputs: [
                    { type: 'number', label: 'Tiempo de espera (ms)', id: 'waitTime', value: '2000' }
                ],
                execute: (inputs) => {
                    const waitTime = parseInt(inputs.waitTime);
                    log(`Esperando ${waitTime}ms...`, 'info');
                    
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve("Espera completada");
                        }, waitTime);
                    })
                    .then(resultado => {
                        log(resultado, 'success');
                    });
                }
            },
            'reintetar': {
                title: 'Reintentar',
                description: 'Simula reintentos de operaciones fallidas.',
                inputs: [
                    { type: 'number', label: 'Número de intentos', id: 'attempts', value: '3' }
                ],
                execute: (inputs) => {
                    const maxAttempts = parseInt(inputs.attempts);
                    let currentAttempt = 0;
                    
                    function intentarOperacion() {
                        currentAttempt++;
                        log(`Intento ${currentAttempt} de ${maxAttempts}...`, 'info');
                        
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (Math.random() > 0.5) {
                                    resolve("Operación exitosa");
                                } else {
                                    reject("Operación fallida");
                                }
                            }, 1000);
                        });
                    }

                    function reintentar() {
                        return intentarOperacion()
                            .then(resultado => {
                                log(resultado, 'success');
                            })
                            .catch(error => {
                                log(error, 'error');
                                if (currentAttempt < maxAttempts) {
                                    log("Reintentando...", 'info');
                                    return reintentar();
                                } else {
                                    throw new Error("Máximo número de intentos alcanzado");
                                }
                            });
                    }

                    reintentar();
                }
            },
            'cancelacion': {
                title: 'Cancelación',
                description: 'Simula la cancelación de operaciones.',
                inputs: [],
                execute: () => {
                    log('Iniciando operación cancelable...', 'info');
                    
                    let cancelada = false;
                    
                    const operacion = new Promise((resolve, reject) => {
                        const timeout = setTimeout(() => {
                            if (!cancelada) {
                                resolve("Operación completada");
                            }
                        }, 3000);
                        
                        // Simular cancelación después de 1.5 segundos
                        setTimeout(() => {
                            if (!cancelada) {
                                cancelada = true;
                                clearTimeout(timeout);
                                reject("Operación cancelada");
                            }
                        }, 1500);
                    });

                    operacion
                        .then(resultado => {
                            log(resultado, 'success');
                        })
                        .catch(error => {
                            log(error, 'error');
                        });
                }
            },
            'img_multipl': {
                title: 'Imágenes Múltiples',
                description: 'Simula la carga de múltiples imágenes.',
                inputs: [
                    { type: 'text', label: 'URLs de imágenes (separadas por coma)', id: 'imageUrls', value: 'img1.jpg,img2.jpg,img3.jpg' }
                ],
                execute: (inputs) => {
                    const urls = inputs.imageUrls.split(',').map(url => url.trim());
                    log(`Cargando ${urls.length} imágenes...`, 'info');
                    
                    const promesas = urls.map((url, index) => {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (Math.random() > 0.2) {
                                    resolve(`Imagen ${index + 1} cargada: ${url}`);
                                } else {
                                    reject(`Error al cargar imagen ${index + 1}: ${url}`);
                                }
                            }, Math.random() * 2000 + 500);
                        });
                    });

                    Promise.allSettled(promesas)
                        .then(resultados => {
                            log("Proceso de carga completado", 'success');
                            resultados.forEach((resultado, index) => {
                                if (resultado.status === 'fulfilled') {
                                    log(resultado.value, 'success');
                                } else {
                                    log(resultado.reason, 'error');
                                }
                            });
                        });
                }
            },
            'verificacionseec': {
                title: 'Verificación',
                description: 'Simula procesos de verificación.',
                inputs: [
                    { type: 'text', label: 'Código de verificación', id: 'code', value: '123456' }
                ],
                execute: (inputs) => {
                    log('Verificando código...', 'info');
                    
                    function verificarCodigo(codigo) {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (codigo === '123456') {
                                    resolve("Código verificado correctamente");
                                } else {
                                    reject("Código incorrecto");
                                }
                            }, 1000);
                        });
                    }

                    verificarCodigo(inputs.code)
                        .then(resultado => {
                            log(resultado, 'success');
                        })
                        .catch(error => {
                            log(error, 'error');
                        });
                }
            },
            'simulacion_compras': {
                title: 'Simulación de Compras',
                description: 'Simula un proceso de compra donde primero se valida si hay stock disponible y luego se procesa el pago.',
                inputs: [
                    { type: 'text', label: 'Producto', id: 'producto', value: 'Laptop' },
                    { type: 'text', label: 'Tarjeta', id: 'tarjeta', value: '1234-5678-9012-3456' }
                ],
                execute: (inputs) => {
                    log('Iniciando simulación de compra...', 'info');
                    
                    function validarStock(producto) {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (producto) {
                                    log("Stock validado para: " + producto, 'info');
                                    resolve();
                                } else {
                                    reject("Producto no disponible");
                                }
                            }, 1000);
                        });
                    }

                    function procesarPago(tarjeta) {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (tarjeta && tarjeta.length > 10) {
                                    log("Pago procesado con tarjeta: " + tarjeta.substring(0, 4) + "****", 'info');
                                    resolve();
                                } else {
                                    reject("Error en el procesamiento del pago");
                                }
                            }, 1500);
                        });
                    }

                    validarStock(inputs.producto)
                        .then(() => procesarPago(inputs.tarjeta))
                        .then(() => {
                            log("Compra exitosa", 'success');
                        })
                        .catch(err => {
                            log("Error en la compra: " + err, 'error');
                        });
                }
            },
            'operacions': {
                title: 'Operaciones',
                description: 'Simula operaciones matemáticas asíncronas.',
                inputs: [
                    { type: 'number', label: 'Número 1', id: 'num1', value: '10' },
                    { type: 'number', label: 'Número 2', id: 'num2', value: '5' }
                ],
                execute: (inputs) => {
                    const num1 = parseInt(inputs.num1);
                    const num2 = parseInt(inputs.num2);
                    log('Realizando operaciones matemáticas...', 'info');
                    
                    Promise.all([
                        new Promise(resolve => setTimeout(() => resolve(num1 + num2), 500)),
                        new Promise(resolve => setTimeout(() => resolve(num1 - num2), 500)),
                        new Promise(resolve => setTimeout(() => resolve(num1 * num2), 500)),
                        new Promise(resolve => setTimeout(() => resolve(num1 / num2), 500))
                    ])
                    .then(([suma, resta, multiplicacion, division]) => {
                        log(`Suma: ${suma}`, 'success');
                        log(`Resta: ${resta}`, 'success');
                        log(`Multiplicación: ${multiplicacion}`, 'success');
                        log(`División: ${division}`, 'success');
                    });
                }
            },
            'leer_archv': {
                title: 'Leer Archivo',
                description: 'Simula la lectura de archivos.',
                inputs: [
                    { type: 'text', label: 'Nombre del archivo', id: 'filename', value: 'documento.txt' }
                ],
                execute: (inputs) => {
                    log('Leyendo archivo...', 'info');
                    
                    function leerArchivo(nombre) {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (nombre.endsWith('.txt')) {
                                    resolve(`Contenido del archivo ${nombre}: Lorem ipsum dolor sit amet`);
                                } else {
                                    reject("Formato de archivo no soportado");
                                }
                            }, 1000);
                        });
                    }

                    leerArchivo(inputs.filename)
                        .then(contenido => {
                            log(contenido, 'success');
                        })
                        .catch(error => {
                            log(error, 'error');
                        });
                }
            },
            'obtener_prefil': {
                title: 'Obtener Perfil',
                description: 'Simula la obtención de perfiles de usuario.',
                inputs: [
                    { type: 'text', label: 'ID de usuario', id: 'userId', value: '123' }
                ],
                execute: (inputs) => {
                    log('Obteniendo perfil de usuario...', 'info');
                    
                    function obtenerPerfil(id) {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (id && id !== '0') {
                                    resolve({
                                        id: id,
                                        nombre: 'Usuario ' + id,
                                        email: 'usuario' + id + '@email.com',
                                        edad: 25 + parseInt(id) % 20
                                    });
                                } else {
                                    reject("Usuario no encontrado");
                                }
                            }, 1000);
                        });
                    }

                    obtenerPerfil(inputs.userId)
                        .then(perfil => {
                            log("Perfil obtenido", 'success');
                            log("Datos: " + JSON.stringify(perfil, null, 2), 'info');
                        })
                        .catch(error => {
                            log(error, 'error');
                        });
                }
            },
            'localizacion_usuario': {
                title: 'Localización Usuario',
                description: 'Simula la obtención de la ubicación del usuario.',
                inputs: [],
                execute: () => {
                    log('Obteniendo ubicación del usuario...', 'info');
                    
                    function obtenerUbicacion() {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (navigator.geolocation) {
                                    resolve({
                                        latitud: 40.7128,
                                        longitud: -74.0060,
                                        ciudad: 'Nueva York'
                                    });
                                } else {
                                    reject("Geolocalización no disponible");
                                }
                            }, 1500);
                        });
                    }

                    obtenerUbicacion()
                        .then(ubicacion => {
                            log("Ubicación obtenida", 'success');
                            log(`Latitud: ${ubicacion.latitud}`, 'info');
                            log(`Longitud: ${ubicacion.longitud}`, 'info');
                            log(`Ciudad: ${ubicacion.ciudad}`, 'info');
                        })
                        .catch(error => {
                            log(error, 'error');
                        });
                }
            },
            'envia_form': {
                title: 'Enviar Formulario',
                description: 'Simula el envío de formularios.',
                inputs: [
                    { type: 'text', label: 'Nombre', id: 'nombre', value: 'Juan Pérez' },
                    { type: 'text', label: 'Email', id: 'email', value: 'juan@email.com' },
                    { type: 'text', label: 'Mensaje', id: 'mensaje', value: 'Hola mundo' }
                ],
                execute: (inputs) => {
                    log('Enviando formulario...', 'info');
                    
                    function enviarFormulario(datos) {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (datos.nombre && datos.email && datos.mensaje) {
                                    resolve("Formulario enviado exitosamente");
                                } else {
                                    reject("Datos incompletos");
                                }
                            }, 2000);
                        });
                    }

                    enviarFormulario(inputs)
                        .then(resultado => {
                            log(resultado, 'success');
                        })
                        .catch(error => {
                            log(error, 'error');
                        });
                }
            },
            'cargas_img': {
                title: 'Cargar Imágenes',
                description: 'Simula la carga de imágenes.',
                inputs: [
                    { type: 'text', label: 'URL de la imagen', id: 'imageUrl', value: 'https://ejemplo.com/imagen.jpg' }
                ],
                execute: (inputs) => {
                    log('Cargando imagen...', 'info');
                    
                    function cargarImagen(url) {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (url.includes('http')) {
                                    resolve("Imagen cargada: " + url);
                                } else {
                                    reject("URL inválida");
                                }
                            }, 1500);
                        });
                    }

                    cargarImagen(inputs.imageUrl)
                        .then(resultado => {
                            log(resultado, 'success');
                        })
                        .catch(error => {
                            log(error, 'error');
                        });
                }
            },
            'validacion_Login': {
                title: 'Validación Login',
                description: 'Simula la validación de credenciales de login.',
                inputs: [
                    { type: 'text', label: 'Usuario', id: 'usuario', value: 'admin' },
                    { type: 'password', label: 'Contraseña', id: 'password', value: '123456' }
                ],
                execute: (inputs) => {
                    log('Validando credenciales...', 'info');
                    
                    function validarLogin(usuario, password) {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (usuario === 'admin' && password === '123456') {
                                    resolve("Login exitoso");
                                } else {
                                    reject("Credenciales incorrectas");
                                }
                            }, 1000);
                        });
                    }

                    validarLogin(inputs.usuario, inputs.password)
                        .then(resultado => {
                            log(resultado, 'success');
                        })
                        .catch(error => {
                            log(error, 'error');
                        });
                }
            },
            'api': {
                title: 'API',
                description: 'Simula llamadas a APIs.',
                inputs: [
                    { type: 'text', label: 'Endpoint', id: 'endpoint', value: '/api/usuarios' }
                ],
                execute: (inputs) => {
                    log('Llamando a la API...', 'info');
                    
                    function llamarAPI(endpoint) {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (endpoint.includes('/api/')) {
                                    resolve({
                                        status: 200,
                                        data: [
                                            { id: 1, nombre: 'Usuario 1' },
                                            { id: 2, nombre: 'Usuario 2' }
                                        ]
                                    });
                                } else {
                                    reject("Endpoint no válido");
                                }
                            }, 1500);
                        });
                    }

                    llamarAPI(inputs.endpoint)
                        .then(response => {
                            log("API llamada exitosamente", 'success');
                            log("Respuesta: " + JSON.stringify(response, null, 2), 'info');
                        })
                        .catch(error => {
                            log(error, 'error');
                        });
                }
            },
            'setTimeout': {
                title: 'SetTimeout',
                description: 'Simula operaciones con setTimeout.',
                inputs: [
                    { type: 'number', label: 'Tiempo (ms)', id: 'time', value: '2000' }
                ],
                execute: (inputs) => {
                    const tiempo = parseInt(inputs.time);
                    log(`Ejecutando setTimeout de ${tiempo}ms...`, 'info');
                    
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve("Operación completada después de " + tiempo + "ms");
                        }, tiempo);
                    })
                    .then(resultado => {
                        log(resultado, 'success');
                    });
                }
            },
            'Macroalgoritmo': {
                title: 'Macro Algoritmo',
                description: 'Simula la lectura de un archivo local, como si fuera una operación asincrónica que puede tardar o fallar.',
                inputs: [
                    { type: 'text', label: 'Ruta del archivo', id: 'filepath', value: 'documento.txt' }
                ],
                execute: (inputs) => {
                    log('Iniciando macro algoritmo...', 'info');
                    
                    function leerArchivo(path) {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (path) {
                                    resolve("Contenido leído del archivo: " + path);
                                } else {
                                    reject("Error al leer archivo");
                                }
                            }, 1000);
                        });
                    }

                    leerArchivo(inputs.filepath)
                        .then(contenido => {
                            log(contenido, 'success');
                        })
                        .catch(err => {
                            log("Error: " + err, 'error');
                        });
                }
            }
        };

        // Variables globales
        let currentSimulation = null;
        let originalConsoleLog = console.log;
        let originalConsoleError = console.error;

        // Elementos del DOM
        const simulationTitle = document.getElementById('simulation-title');
        const simulationDescription = document.getElementById('simulation-description');
        const controlInputs = document.getElementById('control-inputs');
        const runButton = document.getElementById('run-simulation');
        const outputArea = document.getElementById('output-area');
        const clearButton = document.getElementById('clear-output');

        // Función para mostrar logs en el área de salida
        function log(message, type = 'info') {
            const outputLine = document.createElement('div');
            outputLine.className = `output-line ${type}`;
            outputLine.innerHTML = `<span class="status-indicator status-${type}"></span>${message}`;
            outputArea.appendChild(outputLine);
            outputArea.scrollTop = outputArea.scrollHeight;
        }

        // Función para limpiar el área de salida
        function clearOutput() {
            outputArea.innerHTML = '';
        }

        // Función para crear controles de entrada
        function createInputs(inputs) {
            if (!inputs || inputs.length === 0) {
                return '<p>Esta simulación no requiere parámetros de entrada</p>';
            }

            let html = '';
            inputs.forEach(input => {
                html += `
                    <div class="input-group">
                        <label for="${input.id}">${input.label}:</label>
                        <input type="${input.type}" id="${input.id}" value="${input.value || ''}" />
                    </div>
                `;
            });
            return html;
        }

        // Función para obtener valores de entrada
        function getInputValues() {
            const inputs = {};
            const inputElements = controlInputs.querySelectorAll('input, select');
            inputElements.forEach(input => {
                inputs[input.id] = input.value;
            });
            return inputs;
        }

        // Función para cambiar simulación
        function changeSimulation(simulationId) {
            // Remover clase active de todos los botones
            document.querySelectorAll('.simulation-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Agregar clase active al botón seleccionado
            document.querySelector(`[data-sim="${simulationId}"]`).classList.add('active');

            // Actualizar información de la simulación
            const simulation = simulations[simulationId];
            if (simulation) {
                currentSimulation = simulationId;
                simulationTitle.textContent = simulation.title;
                simulationDescription.textContent = simulation.description;
                controlInputs.innerHTML = createInputs(simulation.inputs);
                runButton.disabled = false;
                runButton.textContent = `▶️ Ejecutar ${simulation.title}`;
            }
        }

        // Event listeners
        document.querySelectorAll('.simulation-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const simulationId = btn.getAttribute('data-sim');
                changeSimulation(simulationId);
                clearOutput();
                log(`Simulación seleccionada: ${simulations[simulationId]?.title}`, 'info');
            });
        });

        runButton.addEventListener('click', () => {
            if (currentSimulation && simulations[currentSimulation]) {
                clearOutput();
                const inputs = getInputValues();
                try {
                    simulations[currentSimulation].execute(inputs);
                } catch (error) {
                    log('Error al ejecutar la simulación: ' + error.message, 'error');
                }
            }
        });

        clearButton.addEventListener('click', clearOutput);

        // Interceptar console.log y console.error para mostrar en el área de salida
        console.log = function(...args) {
            originalConsoleLog.apply(console, args);
            log(args.join(' '), 'info');
        };

        console.error = function(...args) {
            originalConsoleError.apply(console, args);
            log(args.join(' '), 'error');
        };

        // Inicialización
        log('Panel de Simulaciones JavaScript inicializado', 'success');
        log('Selecciona una simulación del menú lateral para comenzar', 'info');
  