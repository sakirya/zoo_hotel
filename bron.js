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
        mode: "range",
        locale: "ru",
        dateFormat: "d.m.Y",
    });

    // Функция для валидации данных
    function validateForm() {
        const yourName = document.getElementById("your-name").value.trim();
        const phoneNumber = document.getElementById("phone-number").value.trim();
        const petName = document.getElementById("pet-name").value.trim();

        let isValid = true;

        // Проверка имени
        if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(yourName)) {
            alert("Пожалуйста, введите корректное имя (только буквы и пробелы).");
            isValid = false;
        }

        // Проверка номера телефона
        if (!/^\+?\d{10,15}$/.test(phoneNumber)) {
            alert("Пожалуйста, введите корректный номер телефона (например, +79991234567).");
            isValid = false;
        }

        // Проверка имени питомца
        if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(petName)) {
            alert("Пожалуйста, введите корректное имя питомца (только буквы и пробелы).");
            isValid = false;
        }

        return isValid;
    }

    // Обработчик кнопки отправки
    document.getElementById('myButton').onclick = function (event) {
        event.preventDefault(); // Предотвращаем отправку формы

        // Валидация данных
        if (validateForm()) {
            // Если валидация прошла успешно
            alert('Данные отправлены, ожидайте подтверждение');

            // Очищаем поля формы
            document.getElementById("your-name").value = "";
            document.getElementById("phone-number").value = "";
            document.getElementById("pet-name").value = "";
            document.getElementById("date-range").value = "";
            document.getElementById("room-type").value = "";
            document.getElementById("additional-service").value = "";

            // Здесь можно добавить код для отправки данных на сервер
        }
    };

    // Получаем данные из localStorage
    const bookingData = JSON.parse(localStorage.getItem("bookingData"));

    if (bookingData) {
        // Заполняем поля на странице бронирования
        document.getElementById("date-range").value = bookingData.dateRange;
        document.getElementById("room-type").value = bookingData.roomType;
        document.getElementById("additional-service").value = bookingData.additionalService || "не нужно";

        // Очищаем localStorage после загрузки данных
        localStorage.removeItem("bookingData");
    }
});