document.addEventListener('DOMContentLoaded', function() {
    // Код для скрытия/показа шапки
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const delta = 5;
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Убедимся, что скролл больше дельты
        if (Math.abs(lastScrollTop - currentScroll) <= delta) {
            return;
        }

        // Если скроллим вниз и уже проскроллили больше высоты шапки
        if (currentScroll > lastScrollTop && currentScroll > headerHeight) {
            // Скроллим вниз
            header.style.transform = `translateY(-${headerHeight}px)`;
        } else {
            // Скроллим вверх
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = currentScroll;
    }, { passive: true });

    // Основной код формы и других функций
    const form = document.getElementById('contactForm');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');
    const BOT_TOKEN = '7433898172:AAERsX6F1b_anBbRn1hAof3lMEq-DvBgj04';
    const CHAT_ID = '708285715';

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Обработка формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Wysyłanie...';

        const formData = new FormData(form);
        const text = `🌟 Nowa wiadomość ze strony portfolio!\n\n` +
                     `👤 Imię: ${formData.get('name')}\n` +
                     `📧 Email: ${formData.get('email')}\n` +
                     `💬 Wiadomość:\n${formData.get('message')}\n\n` +
                     `📅 Data: ${new Date().toLocaleString('pl-PL')}`;

        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: 'HTML'
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                form.reset();
                popup.style.display = 'block';
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 5000);
            } else {
                throw new Error('Message not sent');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.');
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Wysłać';
        });
    });

    // Закрытие popup при клике на крестик
    closePopup.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    // Закрытие при клике вне окна
    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});
