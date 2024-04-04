const verificarEntero = document.querySelector(".tiempo__input");

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
//----------------------------------------------------------------------------
//------------ funcionalidad de los botones de control -----------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

// declaracion de variables con las direcciones de los componentes
const iniciarBoton = document.querySelector(".iniciarBoton");
const reanudarBoton = document.querySelector(".reanudarBoton");
const pausarBoton = document.querySelector(".pausarBoton");
const detenerBoton = document.querySelector(".detenerBoton");

let pTiempoRestante = document.querySelector(".temporizador--rtiempo");
let h3Estado = document.querySelector(".estado");

//variable para el tiempo pausado
let tiempoPausado = 0;

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

iniciarBoton.addEventListener("click", () => {
  primerosBotones();
  if (tiempoPausado == 0) {
    let minutosI = verificarEntero.value;
    let segundosTotales = minutosI * 60;

    let intervalo = setInterval(() => {
      segundosTotales--;

      let horas = Math.floor(segundosTotales / 3600);
      let minutos = Math.floor((segundosTotales % 3600) / 60);
      let segundos = segundosTotales % 60;

      horas = horas < 10 ? "0" + horas : horas;
      minutos = minutos < 10 ? "0" + minutos : minutos;
      segundos = segundos < 10 ? "0" + segundos : segundos;

      if (segundosTotales >= 0) {
        h3Estado.textContent = "Encendido";
        pTiempoRestante.textContent = `${horas}:${minutos}:${segundos}`;
      }
      if (segundosTotales < 0) {
        clearInterval(intervalo);
        h3Estado.textContent = "Apagado";
        verificarEntero.value = "";
        primerosBotones();
      }
      pausarBoton.addEventListener("click", () => {
        h3Estado.textContent = "Pausado";
        tiempoPausado = segundosTotales;
        segundosBotones();

        clearInterval(intervalo);
      });
    }, 100);
  }
});

detenerBoton.addEventListener("click", () => {
  h3Estado.textContent = "Apagado";
  tiempoPausado = 0;
  verificarEntero.value = "";
  primerosBotones();
  pTiempoRestante.textContent = "00:00:00";
});

reanudarBoton.addEventListener("click", () => {
  if (tiempoPausado > 0) {
    iniciarBoton.disabled = true;
    segundosTotales = tiempoPausado;
    tiempoPausado = 0;
    intervalo = setInterval(() => {
      primerosBotones();
      h3Estado.textContent = "Encendido";

      segundosTotales--;

      let horas = Math.floor(segundosTotales / 3600);
      let minutos = Math.floor((segundosTotales % 3600) / 60);
      let segundos = segundosTotales % 60;

      horas = horas < 10 ? "0" + horas : horas;
      minutos = minutos < 10 ? "0" + minutos : minutos;
      segundos = segundos < 10 ? "0" + segundos : segundos;

      if (segundosTotales >= 0) {
        pTiempoRestante.textContent = `${horas}:${minutos}:${segundos}`;
      }

      if (segundosTotales < 0) {
        clearInterval(intervalo);
        iniciarBoton.disabled = false;
        h3Estado.textContent = "Apagado";
        verificarEntero.value = "";
      }
      pausarBoton.addEventListener("click", () => {
        clearInterval(intervalo);
        tiempoPausado = segundosTotales;
      });
    }, 100);
  }
});
