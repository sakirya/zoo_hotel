// Скрыть экран загрузки через 2 секунды
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('preloader').classList.add('hide');
    }, 1500);
});

// Бургер-меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
});

document.querySelectorAll('#nav a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('#nav') && !e.target.closest('.burger')) {
        burger.classList.remove('active');
        nav.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация flatpickr для выбора дат
    flatpickr("#date-range", {
        mode: "range", // Разрешаем выбор диапазона дат
        locale: "ru",
        dateFormat: "d.m.Y",
    });

    // Объект с ценами для номеров
    const prices = {
        "кот стандарт": 500,
        "кот комфорт": 850,
        "кот vip": 1000,
        "собака стандарт": 1450,
        "собака комфорт": 1950,
        "собака vip": 2450,
    };

    // Объект с ценами для доп. предложений
    const additionalPrices = {
        "не нужно": 0,
        "груминг": 1500,
        "дрессировка": 2000,
        "лакомства": 300,
    };

    // Функция для расчета стоимости
    function calculateCost(event) {
        event.preventDefault(); // Отменяем стандартное поведение формы

        // Получаем выбранный номер
        const roomType = document.getElementById("room-type").value.trim();
        if (!roomType || !prices[roomType]) {
            alert("Выберите корректный номер.");
            return;
        }

        // Получаем выбранные даты
        const selectedDates = document.getElementById("date-range")._flatpickr.selectedDates;
        if (!selectedDates || selectedDates.length === 0) {
            alert("Выберите дату или диапазон дат.");
            return;
        }

        // Вычисляем количество дней
        let days;
        if (selectedDates.length === 1) {
            days = 1; // Однодневное проживание
        } else {
            const startDate = selectedDates[0];
            const endDate = selectedDates[1];
            const timeDifference = endDate - startDate;
            days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        }

        // Получаем выбранное дополнительное предложение (если есть)
        const additionalService = document.getElementById("additional-service").value.trim();
        const additionalCost = additionalPrices[additionalService] || 0; // Если нет выбора, то стоимость = 0

        // Вычисляем стоимость
        const baseCost = prices[roomType] * days;
        const totalCost = baseCost + additionalCost;

        // Выводим стоимость в textarea
        document.getElementById("total-cost").value = `Стоимость: ${totalCost} рублей\n${roomType}, ${additionalService || "без доп. услуг"}`;
    }

    // Добавляем обработчик события на кнопку "Рассчитать"
    document.getElementById("calculate-btn").addEventListener("click", calculateCost);

    // Обработчик для кнопки "Забронировать"
    document.querySelector(".ras").addEventListener("click", (event) => {
        event.preventDefault(); // Отменяем стандартное поведение формы

        // Собираем данные для бронирования
        const roomType = document.getElementById("room-type").value.trim();
        const dateRange = document.getElementById("date-range").value;
        const additionalService = document.getElementById("additional-service").value.trim();

        // Проверяем, что все обязательные поля заполнены
        if (!roomType || !dateRange) {
            alert("Пожалуйста, заполните все обязательные поля.");
            return;
        }

        // Сохраняем данные в localStorage
        localStorage.setItem("bookingData", JSON.stringify({
            roomType,
            dateRange,
            additionalService: additionalService || "без доп. услуг", // Если не выбрано, то "без доп. услуг"
        }));

        // Перенаправляем пользователя на страницу бронирования
        window.location.href = "bron.html"; // Изменяем URL для перенаправления
    });
});