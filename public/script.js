document.addEventListener("DOMContentLoaded", () => {
    // function cargarTiempos() {
    //     const ul = document.querySelector(".total ul");
    //     const tiempos = JSON.parse(localStorage.getItem("tiempos")) || [];

    //     ul.innerHTML = "";
    //     tiempos.forEach((tiempo) => {
    //         const li = document.createElement("li");
    //         li.textContent = tiempo;
    //         ul.appendChild(li);
    //     });
    // }

    calcularTotalMinutos();
    // cargarTiempos();

    const botonEmpezar = document.querySelector("#empezarBoton");
    const cronometro = document.querySelector("#cronometro");
    // const boton01 = document.querySelector("#boton01");
    // const boton02 = document.querySelector("#boton02");
    const boton15 = document.querySelector("#boton15");
    const boton30 = document.querySelector("#boton30");
    const boton45 = document.querySelector("#boton45");
    const boton60 = document.querySelector("#boton60");
    let intervalo;
    let minutos = 30;
    let botonPulsado;
    let contador;
    cronometro.innerHTML = `${minutos}:00`;
    const audio = new Audio("/audio/notificacion.mp3");

    // boton01.addEventListener("click", () => {
    //     elegirMinutos(1);
    // });
    // boton02.addEventListener("click", () => {
    //     elegirMinutos(2);
    // });
    boton15.addEventListener("click", () => {
        elegirMinutos(15);
    });
    boton30.addEventListener("click", () => {
        elegirMinutos(30);
    });
    boton45.addEventListener("click", () => {
        elegirMinutos(45);
    });
    boton60.addEventListener("click", () => {
        elegirMinutos(60);
    });

    function elegirMinutos(minutosElegidos) {
        botonPulsado = minutosElegidos;
        if (intervalo) {
            clearInterval(intervalo);
        }
        minutos = minutosElegidos;
        cronometro.innerHTML = `${minutos}:00`;
        //cronometro.innerHTML = `${minutos}`;
    }

    botonEmpezar.addEventListener("click", () => {
        if (intervalo) {
            clearInterval(intervalo);
        }
        //HE CAMBIADO ESTO contador = minutos * 60;
        contador = minutos;
        intervalo = setInterval(cuentaAtras, 1000); // 1 segundo = 1000 milisegundos
    });

    function cuentaAtras() {
        contador = contador - 1;
        if (contador <= 0) {
            clearInterval(intervalo);
            cronometro.innerHTML = "00:00";
            const ul = document.querySelector(".total ul");
            const li = document.createElement("li");
            li.textContent = `🌲 ¡Has elegido ${botonPulsado}:00 minutos!`;
            ul.appendChild(li);
            // Aplicar un pequeño retraso para la animación (asegura que el li se añada antes de iniciar la animación)
            setTimeout(() => {
                li.classList.add("entering");
            }, 10);

            sumarMinutos(botonPulsado);
            audio.play();
            actualizarLista(); // Llamar a la función para actualizar la lista
        }

        // Calculamos minutos y segundos
        const minutos = Math.floor(contador / 60);
        const segundos = contador % 60;

        // Formateamos para que siempre tengan 2 dígitos
        const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;
        const segundosFormateados = segundos < 10 ? `0${segundos}` : segundos;

        cronometro.innerHTML = `${minutosFormateados}:${segundosFormateados}`;
    }

    function calcularTotalMinutos() {
        let total = localStorage.getItem("total") || "0";

        if (!total || isNaN(total)) {
            localStorage.setItem("total", "0");
            total = "0";
        }

        const totalNum = parseInt(total);

        if (totalNum > 0) {
            const minutosTotales = document.querySelector("#minutosTotales");
            minutosTotales.innerHTML = `En total llevas ${totalNum} minutos 🎉`;
        }

        const totalContainer = document.querySelector(".total");
        totalContainer.scrollTop = totalContainer.scrollHeight;
    }

    function sumarMinutos(minutosPulsados) {
        const total = localStorage.getItem("total") || "0";
        const minutosSumados = parseInt(total) + parseInt(minutosPulsados);
        localStorage.setItem("total", minutosSumados);
        calcularTotalMinutos();
    }

    function actualizarLista() {
        const lista = document.querySelector(".total ul");
        const maxElementos = 5;

        if (lista.children.length > maxElementos) {
            lista.removeChild(lista.children[0]);
        }

        const totalContainer = document.querySelector(".total");
        totalContainer.scrollTop = totalContainer.scrollHeight;
    }
});
