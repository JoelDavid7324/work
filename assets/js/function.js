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

const iniciarBoton = document.querySelector(".iniciarBoton");
const pausarBoton = document.querySelector(".pausarBoton");
let pTiempoRestante = document.querySelector(".temporizador--rtiempo");
let h3Estado = document.querySelector(".estado");

let tiempoPausado = 0;

iniciarBoton.addEventListener("click", () => {
  pausarBoton.textContent = "Pausar";
  let minutosI = verificarEntero.value;
  let segundosTotales = minutosI * 60;

  let intervalo = setInterval(() => {
    segundosTotales--;

    iniciarBoton.disabled = true;

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
      iniciarBoton.disabled = false;
      h3Estado.textContent = "Apagado";
    }
    pausarBoton.addEventListener("click", () => {
      clearInterval(intervalo);
      tiempoPausado = segundosTotales;
      iniciarBoton.disabled = false;
      h3Estado.textContent = "Pausado";
      pausarBoton.textContent = "Detener";
    });
  }, 100);
});

iniciarBoton.addEventListener("click", () => {
  console.log("Entré a este ");
  console.log(tiempoPausado);
  if (tiempoPausado > 0) {
    segundosTotales = tiempoPausado;
    tiempoPausado = 0;
    intervalo = setInterval(() => {
      segundosTotales--;

      iniciarBoton.disabled = true;

      let horas = Math.floor(segundosTotales / 3600);
      let minutos = Math.floor((segundosTotales % 3600) / 60);
      let segundos = segundosTotales % 60;

      horas = horas < 10 ? "0" + horas : horas;
      minutos = minutos < 10 ? "0" + minutos : minutos;
      segundos = segundos < 10 ? "0" + segundos : segundos;

      if (segundosTotales > 0) {
        pTiempoRestante.textContent = `${horas}:${minutos}:${segundos}`;
      }

      if (segundosTotales <= 0) {
        clearInterval(intervalo);
        iniciarBoton.disabled = false;
      }
      pausarBoton.addEventListener("click", () => {
        clearInterval(intervalo);
        tiempoPausado = segundosTotales;
        iniciarBoton.disabled = false;
      });
    }, 100);
  }
});
