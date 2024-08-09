// Código existente para a mudança de cor de fundo
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

// Código existente para aumentar a opacidade
let currentOpacity = 0; // Começa com opacidade 0 (totalmente transparente)

function increaseOpacity() {
    const square = document.getElementById('square');
    currentOpacity += 0.1; // Aumenta a opacidade em 0.1
    if (currentOpacity > 1) {
        currentOpacity = 1; // Limita a opacidade a 1 (totalmente opaco)
    }
    square.style.backgroundColor = `rgba(0, 0, 255, ${currentOpacity})`; // Define a nova cor com opacidade
}

// Adicione a lógica do calendário aqui
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const monthYearLabel = document.getElementById('monthYear');
const daysOfWeekContainer = document.getElementById('daysOfWeek');
const daysContainer = document.getElementById('days');

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function renderCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    
    // Atualiza o rótulo do mês e ano
    monthYearLabel.textContent = `${month + 1}/${year}`;
    
    // Limpa os containers
    daysOfWeekContainer.innerHTML = '';
    daysContainer.innerHTML = '';
    
    // Cria os cabeçalhos dos dias da semana
    dayNames.forEach(dayName => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = dayName;
        daysOfWeekContainer.appendChild(dayElement);
    });
    
    // Adiciona os dias vazios antes do início do mês
    for (let i = 0; i < startDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day', 'empty');
        daysContainer.appendChild(emptyDay);
    }
    
    // Adiciona os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;
        daysContainer.appendChild(dayElement);
    }
}

prevMonthButton.addEventListener('click', () => {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    renderCalendar(currentYear, currentMonth);
});

nextMonthButton.addEventListener('click', () => {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    renderCalendar(currentYear, currentMonth);
});

// Renderiza o calendário atual ao carregar a página
renderCalendar(currentYear, currentMonth);
