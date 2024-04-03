const verificarEntero = document.getElementById("tiempo__input");

verificarEntero.addEventListener("keydown", (event) => {
  const valido =
    (event.key >= "0" && event.key <= "9") ||
    event.key === "Backspace" ||
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight" ||
    event.key === "Delete";
  const superaLongitudMaxima = numeroInput.value.length >= 11;

  if (!valido || superaLongitudMaxima) {
    event.preventDefault();
  }
});
