document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');
    const BOT_TOKEN = '7433898172:AAERsXGF1b_anBbRn1hAof31MEq-DvBgj04';
    const CHAT_ID = '708285715';

    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Обработка отправки формы
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Wysyłanie...';

        const formData = new FormData(this);
        const message = `🌟 Nowa wiadomość ze strony portfolio!\n\n` +
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
                text: message
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                form.reset();
                popup.style.display = 'block';
                
                // Автоматически скрываем popup через 5 секунд
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 5000);
            } else {
                throw new Error('Błąd wysyłania wiadomości do Telegram');
            }
        })
        .catch(error => {
            console.error('Błąd:', error);
            alert('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.');
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Wysłać';
        });
    });

    // Закрытие popup при нажатии на крестик
    closePopup.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    // Закрытие popup при клике вне его области
    window.addEventListener('click', function (event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});

    closePopup.addEventListener('click', function () {
        popup.style.display = 'none';
    });
});
