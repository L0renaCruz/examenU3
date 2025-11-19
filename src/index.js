import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../dist/public/css/main.css';
// import Swal from 'sweetalert2';

document.addEventListener("DOMContentLoaded", () => {
  const inpRegex = document.getElementById("inputRegex");
  const inpTexto = document.getElementById("inputTexto");
  const outResultado = document.getElementById("resultadoFinal");

  const btnTest = document.getElementById("btnProbar");
  const btnSave = document.getElementById("btnGuardar");
  const btnReset = document.getElementById("btnReset");
  const listaHistorial = document.getElementById("listaHistorial");

  let ultimaExp = "";
  let ultimoEval = "";

  // 🔹 Función 1: Validar la expresión regular
  function probarRegex() {
    const exp = inpRegex.value.trim();
    const texto = inpTexto.value.trim();

    if (exp === "" || texto === "") {
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Llena ambos campos antes de continuar.'
      });
      return;
    }

    try {
      const regex = new RegExp(exp);
      const coincide = regex.test(texto);

      ultimoEval = coincide ? "✔ Coincide" : "✖ No coincide";
      ultimaExp = exp;

      outResultado.textContent = ultimoEval;

    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Regex inválida',
        text: 'Tu expresión regular no es válida.'
      });

      outResultado.textContent = "---";
    }
  }

  // 🔹 Función 2: Guardar en historial
  function guardarResultado() {
    if (ultimaExp === "") {
      Swal.fire({
        icon: 'info',
        title: 'Sin datos',
        text: 'Primero prueba una expresión regular.'
      });
      return;
    }

    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = `
      <strong>Expresión:</strong> ${ultimaExp}<br>
      <strong>Resultado:</strong> ${ultimoEval}
    `;

    listaHistorial.prepend(li);

    Swal.fire({
      icon: 'success',
      title: 'Guardado',
      text: 'Se agregó al historial.',
      timer: 1200,
      showConfirmButton: false
    });
  }

  // Eventos
  btnTest.addEventListener("click", probarRegex);
  btnSave.addEventListener("click", guardarResultado);
  btnReset.addEventListener("click", () => {
    inpRegex.value = "";
    inpTexto.value = "";
    outResultado.textContent = "---";
    listaHistorial.innerHTML = "";
    ultimaExp = "";
    ultimoEval = "";
  });
});