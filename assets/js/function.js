const verificarEntero = document.querySelector(".tiempo__input");

verificarEntero.addEventListener("keydown", (event) => {
  const valido =
    (event.key >= "0" && event.key <= "9") ||
    event.key === "Backspace" ||
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight" ||
    event.key === "Delete";
  const superaLongitudMaxima = verificarEntero.value.length >= 11;

  if (!valido || superaLongitudMaxima) {
    event.preventDefault();
  }
});

const iniciarBotonnn = document.querySelector(".iniciarBoton");
const pausarBoton = document.querySelector(".pausarBoton");
let pTiempoRestante = document.querySelector(".temporizador--rtiempo");

iniciarBotonnn.addEventListener("click", () => {

  let minutosI = verificarEntero.value;
  let segundosTotales = minutosI * 60;

  let intervalo = setInterval(() => {
    segundosTotales--;

    iniciarBotonnn.disabled = true; 

    let horas = Math.floor(segundosTotales / 3600);
    let minutos = Math.floor((segundosTotales % 3600) / 60);
    let segundos = segundosTotales % 60;

    horas = horas < 10 ? "0" + horas : horas;
    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;
    pTiempoRestante.textContent = `${horas}:${minutos}:${segundos}`;
    if (segundosTotales === 0) {
      clearInterval(intervalo);
    }
  }, 1000);
});
