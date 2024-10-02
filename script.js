<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formularz kontaktowy</title>
    <style>
        body { font-family: Arial, sans-serif; }
        form { max-width: 500px; margin: 0 auto; }
        input, textarea { width: 100%; padding: 10px; margin-bottom: 10px; }
        button { padding: 10px 20px; }
        #popup { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); justify-content: center; align-items: center; }
        #popup div { background: white; padding: 20px; border-radius: 5px; }
    </style>
</head>
<body>
    <form id="contactForm">
        <input type="text" name="name" placeholder="Imię" required>
        <input type="email" name="email" placeholder="Email" required>
        <textarea name="message" placeholder="Wiadomość" required></textarea>
        <button type="submit">Wyślij</button>
    </form>

    <div id="popup">
        <div>
            <p>Dziękujemy za wiadomość!</p>
            <button id="closePopup">Zamknij</button>
        </div>
    </div>

    <script>
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('contactForm');
        const popup = document.getElementById('popup');
        const closePopup = document.getElementById('closePopup');
        const BOT_TOKEN = '7433898172:AAERsXGF1b_anBbRn1hAof31MEq-DvBgj04';
        const CHAT_ID = '708285715';

        if (!form || !popup || !closePopup) {
            console.error('Nie wszystkie wymagane elementy zostały znalezione na stronie');
            return;
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Wysyłanie...';
            console.log('Wysyłanie formularza...');

            const formData = new FormData(form);
            const message = `Imię: ${formData.get('name')}\nEmail: ${formData.get('email')}\nWiadomość: ${formData.get('message')}`;

            fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                }),
            })
            .then(response => {
                console.log('Odpowiedź serwera:', response);
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Błąd serwera: ' + response.status);
                }
            })
            .then(data => {
                console.log('Dane z serwera:', data);
                if (data.ok) {
                    form.reset();
                    popup.style.display = 'flex';
                } else {
                    throw new Error('Błąd wysyłania wiadomości do Telegram');
                }
            })
            .catch(error => {
                console.error('Błąd:', error);
                alert('Błąd podczas wysyłania formularza. Spróbuj ponownie.');
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Wyślij';
            });
        });

        closePopup.addEventListener('click', function () {
            popup.style.display = 'none';
        });
    });
    </script>
</body>
</html>
