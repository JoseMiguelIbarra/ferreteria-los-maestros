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
        return dominiosPermitidos.some(function(dominio) {
            return correo.toLowerCase().endsWith(dominio);
        });
    }

    function validarRun(run) {
        const runLimpio = run.toUpperCase();
        if (!/^[0-9]{6,8}[0-9K]$/.test(runLimpio)) return false;

        const cuerpo = runLimpio.slice(0, -1);
        const digitoVerificador = runLimpio.slice(-1);
        let suma = 0;
        let multiplicador = 2;

        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += Number(cuerpo[i]) * multiplicador;
            multiplicador++;
            if (multiplicador > 7) multiplicador = 2;
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
            const region = document.getElementById("region");
            const comuna = document.getElementById("comuna");
            const direccion = document.getElementById("direccion");

            let formularioValido = true;

            limpiarError("error-run");
            limpiarError("error-nombre");
            limpiarError("error-apellidos");
            limpiarError("error-email");
            limpiarError("error-region");
            limpiarError("error-comuna");
            limpiarError("error-direccion");

            if (run.value.trim() === "") {
                mostrarError("error-run", "El RUN es obligatorio.");
                formularioValido = false;
            } else if (!validarRun(run.value.trim())) {
                mostrarError("error-run", "Ingresa un RUN válido, sin puntos ni guion.");
                formularioValido = false;
            }

            if (nombre.value.trim() === "") {
                mostrarError("error-nombre", "El nombre es obligatorio.");
                formularioValido = false;
            }

            if (apellidos.value.trim() === "") {
                mostrarError("error-apellidos", "Los apellidos son obligatorios.");
                formularioValido = false;
            }

            if (email.value.trim() === "") {
                mostrarError("error-email", "El correo electrónico es obligatorio.");
                formularioValido = false;
            } else if (!validarCorreo(email.value.trim())) {
                mostrarError("error-email", "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.");
                formularioValido = false;
            }

            if (region.value === "") {
                mostrarError("error-region", "Selecciona una región.");
                formularioValido = false;
            }

            if (comuna.value === "") {
                mostrarError("error-comuna", "Selecciona una comuna.");
                formularioValido = false;
            }

            if (direccion.value.trim() === "") {
                mostrarError("error-direccion", "La dirección es obligatoria.");
                formularioValido = false;
            }

            if (formularioValido) {
                alert("Registro realizado correctamente.");
                formularioRegistro.reset();
            }
        });
    }

    const formLogin = document.getElementById("form-login");
    if (formLogin) {
        formLogin.addEventListener("submit", function(evento) {
            evento.preventDefault(); 
            
            const correo = document.getElementById("login-correo").value.trim();
            const password = document.getElementById("login-password").value.trim();
            
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
            
            const nombre = document.getElementById("contacto-nombre").value.trim();
            const correo = document.getElementById("contacto-correo").value.trim();
            const mensaje = document.getElementById("contacto-mensaje").value.trim();
            
            if (nombre === "") {
                alert("Error: El nombre es obligatorio.");
                return;
            }
            
            if (correo.length > 100) {
                alert("Error: El correo no puede exceder los 100 caracteres.");
                return;
            }
            
            if (mensaje.length > 300) {
                alert("Error: El mensaje no puede exceder los 300 caracteres.");
                return;
            }
            
            if (mensaje === "") {
                alert("Error: Debes escribir un mensaje.");
                return;
            }
            
            alert("¡Mensaje enviado correctamente! Te contactaremos pronto.");
            formContacto.reset();
        });
    }
});