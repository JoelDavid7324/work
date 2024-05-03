//let gateway = `ws://${window.location.hostname}/ws`;
let gateway;
let websocket;
window.addEventListener("load", onload);
let direction;

function onload(event) {
  initWebSocket();
}

function initWebSocket() {
  console.log("Trying to open a WebSocket connection…");
  websocket = new WebSocket(gateway);
  websocket.onopen = onOpen;
  websocket.onclose = onClose;
}

function onOpen(event) {
  console.log("Connection opened");
}

function onClose(event) {
  console.log("Connection closed");
  //document.getElementById("motor-state").innerHTML = "motor stopped";
  setTimeout(initWebSocket, 2000);
}

let estado;

let verificarEntero = document.querySelector(".tiempo__input");

verificarEntero.addEventListener("keydown", (event) => {
  const valido =
    (event.key >= "0" && event.key <= "9") ||
    event.key === "Backspace" ||
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight" ||
    event.key === "Delete";
  const superaLongitudMaxima = verificarEntero.value.length >= 3;

  if (!valido || superaLongitudMaxima) {
    event.preventDefault();
  }
});

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//------------ funcionalidad de los botones de control -----------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

// declaracion de variables con las direcciones de los componentes
const iniciarBoton = document.querySelector(".iniciarBoton");
const reanudarBoton = document.querySelector(".reanudarBoton");
const pausarBoton = document.querySelector(".pausarBoton");
const detenerBoton = document.querySelector(".detenerBoton");

let pTiempoRestante = document.querySelector(".temporizador--rtiempo");
let h3Estado = document.querySelector(".estado");
pausarBoton.disabled = true;
//variable para el tiempo pausado
let tiempoPausado = 0;

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------FUNCIONES---------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

const primerosBotones = () => {
  iniciarBoton.style.display = "inherit";
  reanudarBoton.style.display = "none";
  pausarBoton.style.display = "inherit";
  detenerBoton.style.display = "none";
};

const segundosBotones = () => {
  iniciarBoton.style.display = "none";
  reanudarBoton.style.display = "inherit";
  pausarBoton.style.display = "none";
  detenerBoton.style.display = "inherit";
};

const inhabilitarBotonesSR = () => {
  sumarBoton.disabled = true;
  restarBoton.disabled = true;
  verificarEntero.value = "";
};

const habilitarBotonesSR = () => {
  sumarBoton.disabled = false;
  restarBoton.disabled = false;
  verificarEntero.value = "";
};

const inputVacio = () => verificarEntero.value == "";

let horas;
let minutos;
let segundos;

const limpiarAlFinal = () => {
  clearInterval(intervalo);
  h3Estado.textContent = "Apagado";
  pausarBoton.disabled = true;
  inhabilitarBotonesSR();
};

const calcularTiempo = (segundosTotales) => {
  horas = Math.floor(segundosTotales / 3600);
  minutos = Math.floor((segundosTotales % 3600) / 60);
  segundos = segundosTotales % 60;

  horas = horas < 10 ? "0" + horas : horas;
  minutos = minutos < 10 ? "0" + minutos : minutos;
  segundos = segundos < 10 ? "0" + segundos : segundos;
};

// evento del boton de inciar
iniciarBoton.addEventListener("click", () => {
  iniciarBoton.disabled = false;
  primerosBotones();
  if (tiempoPausado == 0 && !inputVacio()) {
    let segundosTotales = verificarEntero.value * 60;
    inhabilitarBotonesSR();

    let intervalo = setInterval(() => {
      iniciarBoton.disabled = true;
      pausarBoton.disabled = false;

      segundosTotales--;

      calcularTiempo(segundosTotales);

      if (segundosTotales >= 0) {
        h3Estado.textContent = "Encendido";
        pTiempoRestante.textContent = `${horas}:${minutos}:${segundos}`;
      } else {
        limpiarAlFinal();
        primerosBotones();
      }
      // evento del boton de pausa
      pausarBoton.addEventListener("click", () => {
        h3Estado.textContent = "Pausado";
        tiempoPausado = segundosTotales;
        segundosBotones();
        habilitarBotonesSR();
        clearInterval(intervalo);
      });
    }, 1000);
  }
});

//evento del boton de detener
detenerBoton.addEventListener("click", () => {
  iniciarBoton.disabled = false;
  pausarBoton.disabled = true;
  h3Estado.textContent = "Apagado";
  tiempoPausado = 0;
  verificarEntero.value = "";
  primerosBotones();
  pTiempoRestante.textContent = "00:00:00";
});

//evento del boton de reanudar
reanudarBoton.addEventListener("click", () => {
  if (tiempoPausado > 0) {
    iniciarBoton.disabled = true;
    pausarBoton.disabled = false;
    let segundosTotales = tiempoPausado + verificarEntero.value * 60;
    inhabilitarBotonesSR();
    tiempoPausado = 0;
    intervalo = setInterval(() => {
      primerosBotones();
      h3Estado.textContent = "Encendido";

      segundosTotales--;

      calcularTiempo(segundosTotales);

      if (segundosTotales >= 0) {
        pTiempoRestante.textContent = `${horas}:${minutos}:${segundos}`;
      } else {
        limpiarAlFinal();
        iniciarBoton.disabled = false;
      }
      pausarBoton.addEventListener("click", () => {
        clearInterval(intervalo);
        tiempoPausado = segundosTotales;
      });
    }, 1000);
  }
});

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//---------- funcionalidad de los botones de sumar y restar tiempo -----------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

//declaracion de variables con las direcciones de los botones de suma y resta

let restarBoton = document.querySelector(".restarBoton");
let sumarBoton = document.querySelector(".sumarBoton");
//se declara el valor de un ciclo
let ciclo = 5;

restarBoton.addEventListener("click", () => {
  //se comprueba que al valor del input se le pueda restar al menos un ciclo
  if (verificarEntero.value >= ciclo) {
    //se le resta al input de tiempo el valor de la variable "ciclo"
    verificarEntero.value -= ciclo;
  }
});

sumarBoton.addEventListener("click", () => {
  //asignacion de la variable inputValor
  let inputValor;
  if (verificarEntero.value == "") {
    inputValor = 0;
  } else {
    inputValor = parseInt(verificarEntero.value);
  }
  //se guarda el valor de la suma en la variable sum
  const sum = inputValor + ciclo;
  //se muestra el resultado en caso de q sum sea menor a 999 (tres caracteres)
  if (sum <= 999) {
    verificarEntero.value = sum;
  }
});

let submitForm = () => {
  let time = segundosTotales;

  let send = time + " & " + estado;
  console.log(send);
  websocket.send(send);
};
