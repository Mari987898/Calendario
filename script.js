document.addEventListener("DOMContentLoaded", function() {
    const colors = ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99", "#c2c2f0", "#ffb3e6"];
    let currentColorIndex = 0;

    function changeBackgroundColor() {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        document.body.style.backgroundColor = colors[currentColorIndex];
    }

    // Altera a cor a cada 2 segundos (2000 milissegundos)
    setInterval(changeBackgroundColor, 2000);
});

let currentOpacity = 0; // Começa com opacidade 0 (totalmente transparente)

function increaseOpacity() {
    const square = document.getElementById('square');
    currentOpacity += 0.1; // Aumenta a opacidade em 0.1
    if (currentOpacity > 1) {
        currentOpacity = 1; // Limita a opacidade a 1 (totalmente opaco)
    }
    square.style.backgroundColor = `rgba(0, 0, 255, ${currentOpacity})`; // Define a nova cor com opacidade
}

// Chame increaseOpacity em algum evento, se necessário
