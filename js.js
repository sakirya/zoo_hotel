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

// ===== АНИМАЦИЯ ПРИ СКРОЛЛЕ (Intersection Observer) =====
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.about, .rooms, .nomera, .buttons, .adres, .gorod, iframe, .cat2, .dog2, .dd');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.2 });
    
    elements.forEach(el => {
        // Ставим анимацию на паузу, пока элемент не появится
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
});
