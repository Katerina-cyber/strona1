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

            fetch('send_telegram.php', {
                method: 'POST',
                body: new FormData(form),
            })
            .then(response => {
                console.log('Odpowiedź serwera:', response);
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Błąd serwera: ' + response.status);
                }
            })
            .then(data => {
                console.log('Dane z serwera:', data);
                form.reset();
                popup.style.display = 'flex';
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

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = htmlspecialchars(trim($_POST['name'] ?? 'Nieznane imię'));
        $email = htmlspecialchars(trim($_POST['email'] ?? 'Nieznany email'));
        $message = htmlspecialchars(trim($_POST['message'] ?? 'Brak wiadomości'));

        $token = "7433898172:AAERsX6F1b_anBbRn1hAof3lMEq-DvBgj04";
        $chat_id = "708285715";
        $text = "Imię: $name\nEmail: $email\nWiadomość: $message";

        $ch = curl_init("https://api.telegram.org/bot$token/sendMessage");
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, [
            'chat_id' => $chat_id,
            'text' => $text,
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
        if ($httpCode == 200) {
            echo "success";
        } else {
            echo "error";
        }
        
        curl_close($ch);
    }
    ?>
</body>
</html>
