document.addEventListener('DOMContentLoaded', function() {
    // Код для скрытия/показа шапки при прокрутке
    let lastScroll = 0;
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (Math.abs(currentScroll - lastScroll) < scrollThreshold) return;

        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // Основной код формы и других функций
    const form = document.getElementById('contactForm');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');
    const BOT_TOKEN = '7433898172:AAERsXGF1b_anBbRn1hAof31MEq-DvBgj04';
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
        console.log('Форма отправляется...'); // Для отладки

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
        .then(response => {
            console.log('Ответ сервера:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Данные от сервера:', data);
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

    // Закрытие popup при клике вне окна
    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});
