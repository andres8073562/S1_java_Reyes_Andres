   // Función para iniciar el mazo
   async function iniciarJuego() {
    try {
      const respuesta = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      const datos = await respuesta.json();
      deckId = datos.deck_id;
      document.getElementById("jugar").disabled = false;
    } catch (error) {
      console.error("Error al iniciar el mazo:", error);
    }
  }

  // Función para sacar 2 cartas (jugador y CPU)
  async function sacarCartas() {
    try {
      const respuesta = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
      const datos = await respuesta.json();
      const cartaJugador = datos.cards[0];
      const cartaCPU = datos.cards[1];

      const valorJugador = convertirValor(cartaJugador.value);
      const valorCPU = convertirValor(cartaCPU.value);

      let resultadoHTML = `
        <h2>Cartas:</h2>
        <p> ${cartaJugador.value} de ${cartaJugador.suit} <br>
        <img src="${cartaJugador.image}" alt="Carta jugador" id=cartajugador></p>
        <p>CPU: ${cartaCPU.value} de ${cartaCPU.suit} <br>
        <img src="${cartaCPU.image}" alt="Carta CPU" id=cartacpu></p>
      `;

      if (valorJugador > valorCPU) {
        alert("¡Gana el Jugador!");
        resultadoHTML += "<h3> ¡Gana el Jugador!</h3>";
      } else if (valorJugador < valorCPU) {
       alert("¡Gana la CPU!");
        resultadoHTML += "<h3> ¡Gana la CPU!</h3>";
      } else {
       alert("¡Empate!");
        resultadoHTML += "<h3>¡Empate!</h3>";
      }

      document.getElementById("resultado").innerHTML = resultadoHTML;
    } catch (error) {
      alert("Error al sacar cartas: " + error);
      console.error("Error al sacar cartas:", error);
    }
  }

  // Función para convertir el valor de la carta a número
  function convertirValor(valor) {
    const mapaValores = {
      "ACE": 14, "KING": 13, "QUEEN": 12, "JACK": 11,
      "10": 10, "9": 9, "8": 8, "7": 7,
      "6": 6, "5": 5, "4": 4, "3": 3, "2": 2
    };
    return mapaValores[valor];
  }

  // Eventos
  document.getElementById("jugar").addEventListener("click", sacarCartas);

  // Inicia el mazo al cargar la página
  iniciarJuego();