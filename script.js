document.addEventListener("DOMContentLoaded", function() {
    const colors = ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99", "#c2c2f0", "#ffb3e6"];
    let currentColorIndex = 0;

    function changeBackgroundColor() {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        document.body.style.backgroundColor = colors[currentColorIndex];
    }

    // Altera a cor a cada 2 segundos (2000 milissegundos)
    setInterval(changeBackgroundColor, 2000);

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
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const monthYearLabel = document.getElementById('monthYear');
    const daysOfWeekContainer = document.getElementById('daysOfWeek');
    const daysContainer = document.getElementById('days');
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

    function renderCalendar(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDay = firstDay.getDay();

        // Atualiza o rótulo do mês e ano
        monthYearLabel.textContent = `${firstDay.toLocaleString('pt-BR', { month: 'long' })} ${year}`;

        // Limpa os containers
        daysOfWeekContainer.innerHTML = '';
        daysContainer.innerHTML = '';

        // Cria os cabeçalhos dos dias da semana
        weekdays.forEach(dayName => {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = dayName;
            daysOfWeekContainer.appendChild(dayElement);
        });

        // Adiciona os dias vazios antes do início do mês
        for (let i = 0; i < startDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('day');
            daysContainer.appendChild(emptyDay);
        }

        // Adiciona os dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = day;
            const dayString = `${year}-${month + 1}-${day}`;

            const eventDay = events.find(event => event.date === dayString);
            if (eventDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventDay.title;
                dayElement.appendChild(eventDiv);
            }

            if (day === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
                dayElement.setAttribute('id', 'currentDay');
            }

            dayElement.addEventListener('click', () => openModal(dayString));
            daysContainer.appendChild(dayElement);
        }
    }

    function openModal(date) {
        const existingEvent = events.find(event => event.date === date);
        const newEventModal = document.getElementById('newEventModal');
        const deleteEventModal = document.getElementById('deleteEventModal');
        const eventText = document.getElementById('eventText');
        const eventTitleInput = document.getElementById('eventTitleInput');

        document.getElementById('modalBackDrop').style.display = 'block';

        if (existingEvent) {
            deleteEventModal.style.display = 'block';
            eventText.textContent = existingEvent.title;
            document.getElementById('deleteButton').onclick = function() {
                deleteEvent(date);
            };
        } else {
            newEventModal.style.display = 'block';
            eventTitleInput.value = '';
            document.getElementById('saveButton').onclick = function() {
                saveEvent(date, eventTitleInput.value);
            };
        }

        document.getElementById('closeButton').onclick = closeModal;
        document.getElementById('cancelButton').onclick = closeModal;
    }

    function closeModal() {
        document.getElementById('newEventModal').style.display = 'none';
        document.getElementById('deleteEventModal').style.display = 'none';
        document.getElementById('modalBackDrop').style.display = 'none';
    }

    function saveEvent(date, title) {
        if (title.trim() === '') {
            alert('O título do evento não pode estar vazio.');
            return;
        }
        events.push({ date, title });
        localStorage.setItem('events', JSON.stringify(events));
        renderCalendar(currentYear, currentMonth);
        closeModal();
    }

    function deleteEvent(date) {
        events = events.filter(event => event.date !== date);
        localStorage.setItem('events', JSON.stringify(events));
        renderCalendar(currentYear, currentMonth);
        closeModal();
    }

    prevMonthButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentYear, currentMonth);
    });

    nextMonthButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentYear, currentMonth);
    });

    renderCalendar(currentYear, currentMonth);
});