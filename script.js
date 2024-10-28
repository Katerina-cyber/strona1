document.addEventListener('DOMContentLoaded', function() {
    // Замените эти значения на новые
    const BOT_TOKEN = '7433898172:AAERsX6F1b_anBbRn1hAof3lMEq-DvBgj04';
    const CHAT_ID = '708285715';

    const form = document.getElementById('contactForm');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');

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

        const urlWithToken = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        
        // Тестовый вызов для проверки связи с API
        fetch(urlWithToken + '?chat_id=' + CHAT_ID + '&text=test')
            .then(response => response.json())
            .then(data => {
                console.log('Тест API:', data);
                if (data.ok) {
                    // Если тест прошел, отправляем реальное сообщение
                    return fetch(urlWithToken, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            chat_id: CHAT_ID,
                            text: text,
                            parse_mode: 'HTML'
                        })
                    });
                } else {
                    throw new Error('API test failed');
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log('Ответ от API:', data); // Для отладки
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

    // Закрытие popup
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
