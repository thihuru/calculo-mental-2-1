// Variables para almacenar los números y su suma
let numeros = [];
let suma = 0;
let indice = 0;
let intervalo;
let tiempo = 3000; // Tiempo entre números en milisegundos
let negativosHabilitados = false; // Bandera para números negativos

// Cargar el sonido "bip"
const bipSound = new Audio('bip.wav');
bipSound.volume = 0.5; // Ajustar volumen (opcional)

// Función para generar una serie de números aleatorios
function generarNumeros() {
  numeros = Array.from({ length: Math.floor(Math.random() * 8) + 3 }, () =>
    negativosHabilitados
      ? Math.floor(Math.random() * 21) - 10 // Números entre -10 y 10 si están habilitados
      : Math.floor(Math.random() * 10) + 1 // Números entre 1 y 10
  );
  suma = numeros.reduce((acc, num) => acc + num, 0);
  indice = 0;

  document.getElementById("numeros").innerText = "Preparado...";
  document.getElementById("comenzar").classList.add("hidden");
  document.getElementById("listo").classList.add("hidden");
  document.getElementById("revisar").classList.add("hidden");
  document.getElementById("reiniciar").classList.add("hidden");
  document.getElementById("resultado").classList.add("hidden");
  document.getElementById("serie_completa").classList.add("hidden");

  intervalo = setInterval(mostrarNumero, tiempo);
}

// Función para mostrar números uno por uno
function mostrarNumero() {
  if (indice < numeros.length) {
    bipSound.play();
    document.getElementById("numeros").innerText = numeros[indice];
    indice++;

  } else {
    clearInterval(intervalo);
    document.getElementById("numeros").innerText = "Serie completada.";
    document.getElementById("listo").classList.remove("hidden");
    document.getElementById("revisar").classList.remove("hidden");
    document.getElementById("reiniciar").classList.remove("hidden");
  }
}

// Función para mostrar el resultado de la suma
function mostrarResultado() {
  document.getElementById("resultado").innerText = `Resultado: ${suma}`;
  document.getElementById("resultado").classList.remove("hidden");
}

// Función para revisar toda la serie de números
function revisarSerie() {
  document.getElementById("serie_completa").innerText = `Serie completa: ${numeros.join(", ")}`;
  document.getElementById("serie_completa").classList.remove("hidden");
}

// Función para reiniciar todo
function reiniciar() {
  numeros = [];
  suma = 0;
  indice = 0;
  clearInterval(intervalo);

  document.getElementById("numeros").innerText = "otra vez";
  document.getElementById("comenzar").classList.remove("hidden");
  document.getElementById("listo").classList.add("hidden");
  document.getElementById("revisar").classList.add("hidden");
  document.getElementById("reiniciar").classList.add("hidden");
  document.getElementById("resultado").classList.add("hidden");
  document.getElementById("serie_completa").classList.add("hidden");
}

// Función para habilitar o deshabilitar números negativos
function toggleNegativos() {
  negativosHabilitados = !negativosHabilitados;
  const button = document.getElementById("toggleNegativos");

  if (negativosHabilitados) {
    button.classList.add("active");
    button.innerText = "Números Negativos";
  } else {
    button.classList.remove("active");
    button.innerText = " Números Negativos";
  }
}

// Función para ajustar el tiempo entre números
function ajustarTiempo(event) {
  tiempo = parseInt(event.target.value, 10);
  document.getElementById("tempoValue").innerText = tiempo;
}

// Eventos para los botones y controles
document.getElementById("comenzar").addEventListener("click", generarNumeros);
document.getElementById("listo").addEventListener("click", mostrarResultado);
document.getElementById("revisar").addEventListener("click", revisarSerie);
document.getElementById("reiniciar").addEventListener("click", reiniciar);
document.getElementById("toggleNegativos").addEventListener("click", toggleNegativos);
document.getElementById("tempo").addEventListener("input", ajustarTiempo);
