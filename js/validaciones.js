document.addEventListener("DOMContentLoaded", () => {

    function mostrarError(id, mensaje) {
        const elementoError = document.getElementById(id);
        if (elementoError) {
            elementoError.textContent = mensaje;
        }
    }

    function limpiarError(id) {
        const elementoError = document.getElementById(id);
        if (elementoError) {
            elementoError.textContent = "";
        }
    }

    function validarCorreo(correo) {
        const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
        return dominiosPermitidos.some(dominio => correo.toLowerCase().endsWith(dominio));
    }

    function validarRun(run) {
        const runLimpio = run.toUpperCase().replace(/\./g, "").replace("-", "");
        if (!/^[0-9]{7,8}[0-9K]$/.test(runLimpio)) return false;

        const cuerpo = runLimpio.slice(0, -1);
        const digitoVerificador = runLimpio.slice(-1);
        let suma = 0;
        let multiplicador = 2;

        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += Number(cuerpo[i]) * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }

        const resto = 11 - (suma % 11);
        let digitoCalculado;
        if (resto === 11) digitoCalculado = "0";
        else if (resto === 10) digitoCalculado = "K";
        else digitoCalculado = String(resto);

        return digitoVerificador === digitoCalculado;
    }

    const formularioRegistro = document.getElementById("form-registro");
    if (formularioRegistro) {
        formularioRegistro.addEventListener("submit", function(event) {
            event.preventDefault();

            const run = document.getElementById("run");
            const nombre = document.getElementById("nombre");
            const apellidos = document.getElementById("apellidos");
            const email = document.getElementById("email");
            const fechaNacimiento = document.getElementById("fecha-nacimiento");
            const region = document.getElementById("region");
            const comuna = document.getElementById("comuna");
            const direccion = document.getElementById("direccion");
            const password = document.getElementById("password");
            const confirmPassword = document.getElementById("confirm-password");

            let formularioValido = true;

            ["error-run", "error-nombre", "error-apellidos", "error-email", "error-fecha-nacimiento", "error-region", "error-comuna", "error-direccion", "error-password", "error-confirm-password"].forEach(limpiarError);

            if (!run || run.value.trim() === "") {
                mostrarError("error-run", "El RUN es obligatorio.");
                formularioValido = false;
            } else if (!validarRun(run.value.trim())) {
                mostrarError("error-run", "Ingresa un RUN válido, sin puntos ni guion.");
                formularioValido = false;
            }

            if (!nombre || nombre.value.trim() === "") {
                mostrarError("error-nombre", "El nombre es obligatorio.");
                formularioValido = false;
            }

            if (!apellidos || apellidos.value.trim() === "") {
                mostrarError("error-apellidos", "Los apellidos son obligatorios.");
                formularioValido = false;
            }


            if (!email || email.value.trim() === "") {
                mostrarError("error-email", "El correo electrónico es obligatorio.");
                formularioValido = false;
            } else if (!validarCorreo(email.value.trim())) {
                mostrarError("error-email", "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.");
                formularioValido = false;
            }

            if (!fechaNacimiento || fechaNacimiento.value === "") {
                mostrarError("error-fecha-nacimiento", "La fecha de nacimiento es obligatoria.");
                formularioValido = false;
            }

            if (!region || region.value === "") {
                mostrarError("error-region", "Selecciona una región.");
                formularioValido = false;
            }

            if (!comuna || comuna.value === "") {
                mostrarError("error-comuna", "Selecciona una comuna.");
                formularioValido = false;
            }

            if (!direccion || direccion.value.trim() === "") {
                mostrarError("error-direccion", "La dirección es obligatoria.");
                formularioValido = false;
            }

            if (!password || password.value.trim() === "") {
                mostrarError("error-password", "La contraseña es obligatoria.");
                formularioValido = false;
            } else if (password.value.length < 6) {
                mostrarError("error-password", "La contraseña debe tener al menos 6 caracteres.");
                formularioValido = false;
            }

            if (!confirmPassword || confirmPassword.value.trim() === "") {
                mostrarError("error-confirm-password", "Debes confirmar la contraseña.");
                formularioValido = false;
            } else if (password && password.value !== confirmPassword.value) {
                mostrarError("error-confirm-password", "Las contraseñas no coinciden.");
                formularioValido = false;
            }

            if (formularioValido) {
                alert("¡Registro realizado correctamente!");
                formularioRegistro.reset();

                const selectComuna = document.getElementById('comuna');
                if (selectComuna) {
                    selectComuna.innerHTML = '<option value="">Seleccione primero una región</option>';
                    selectComuna.disabled = true;
                }
            }
        });
    }


    const formLogin = document.getElementById("form-login");
    if (formLogin) {
        formLogin.addEventListener("submit", function(evento) {
            evento.preventDefault(); 
            
            const correo = document.getElementById("login-correo")?.value.trim() || "";
            const password = document.getElementById("login-password")?.value.trim() || "";
            
            if (!validarCorreo(correo)) {
                alert("Error: El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com");
                return;
            }
            
            if (correo.length > 100) {
                alert("Error: El correo no puede exceder los 100 caracteres.");
                return;
            }
            
            if (password.length < 4 || password.length > 10) {
                alert("Error: La contraseña debe tener entre 4 y 10 caracteres.");
                return;
            }
            
            alert("¡Inicio de sesión exitoso!");
            formLogin.reset();
        });
    }

    const formContacto = document.getElementById("form-contacto");
    if (formContacto) {
        formContacto.addEventListener("submit", function(evento) {
            evento.preventDefault(); 
            
            const nombre = document.getElementById("contacto-nombre")?.value.trim() || "";
            const correo = document.getElementById("contacto-correo")?.value.trim() || "";
            const mensaje = document.getElementById("contacto-mensaje")?.value.trim() || "";
            
            if (nombre === "") {
                alert("Error: El nombre es obligatorio.");
                return;
            }

            if (!validarCorreo(correo)) {
                alert("Error: El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com");
                return;
            }
            
            if (correo.length > 100) {
                alert("Error: El correo no puede exceder los 100 caracteres.");
                return;
            }
            
            if (mensaje === "") {
                alert("Error: Debes escribir un mensaje.");
                return;
            }

            if (mensaje.length > 300) {
                alert("Error: El mensaje no puede exceder los 300 caracteres.");
                return;
            }
            
            alert("¡Mensaje enviado correctamente! Te contactaremos pronto.");
            formContacto.reset();
        });
    }

    const datosRegiones = {
        "Metropolitana": ["Santiago", "Maipú", "Puente Alto", "San Bernardo", "La Florida", "Las Condes"],
        "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Concón"],
        "Biobío": ["Concepción", "Talcahuano", "San Pedro de la Paz", "Los Ángeles", "Chillán"],
        "Araucanía": ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"]
    };

    const selectRegion = document.getElementById('region');
    const selectComuna = document.getElementById('comuna');

    if (selectRegion && selectComuna) {
        selectRegion.innerHTML = '<option value="">Seleccione una región</option>';
        Object.keys(datosRegiones).forEach(region => {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            selectRegion.appendChild(option);
        });

        selectComuna.innerHTML = '<option value="">Seleccione primero una región</option>';
        selectComuna.disabled = true;

        selectRegion.addEventListener('change', (e) => {
            const regionSeleccionada = e.target.value;

            selectComuna.innerHTML = '';

            if (regionSeleccionada && datosRegiones[regionSeleccionada]) {
                selectComuna.disabled = false;
                selectComuna.innerHTML = '<option value="">Seleccione una comuna</option>';

                datosRegiones[regionSeleccionada].forEach(comuna => {
                    const option = document.createElement('option');
                    option.value = comuna;
                    option.textContent = comuna;
                    selectComuna.appendChild(option);
                });
            } else {
                selectComuna.disabled = true;
                selectComuna.innerHTML = '<option value="">Seleccione primero una región</option>';
            }
        });
    }
});