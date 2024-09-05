<?php
// Включение отображения ошибок для отладки
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Очистка и защита данных
    $name = !empty($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : 'Nieznane imię';
    $email = !empty($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : 'Nieznany email';
    $message = !empty($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : 'Brak wiadomości';

    // Данные для Telegram API
    $token = "7433898172:AAERsX6F1b_anBbRn1hAof3lMEq-DvBgj04"; // Замените на ваш реальный токен
    $chat_id = "708285715"; // Замените на ваш реальный chat_id
    $text = "Imię: $name\nEmail: $email\nWiadomość: $message";

    $url = "https://api.telegram.org/bot$token/sendMessage";
    $post_fields = [
        'chat_id' => $chat_id,
        'text' => $text,
    ];

    // Инициализация cURL для отправки запроса
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_fields));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Выполнение запроса
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    // Проверка кода ответа сервера Telegram
    if ($httpCode == 200) {
        // Сообщение успешно отправлено
        echo "<script>
                document.addEventListener('DOMContentLoaded', function() {
                    document.getElementById('popup').style.display = 'flex';
                });
              </script>";
    } else {
        // Ошибка при отправке
        $error_message = curl_error($ch);
        $response_body = $response ?: 'Нет ответа от сервера.';
        echo "<script>
                document.addEventListener('DOMContentLoaded', function() {
                    alert('Błąd wysyłania wiadomości: $error_message. Код HTTP: $httpCode. Ответ от сервера: $response_body');
                });
              </script>";
    }

    // Закрываем соединение cURL
    curl_close($ch);
} else {
    // Если метод запроса не POST
    echo "<script>
            document.addEventListener('DOMContentLoaded', function() {
                alert('Nieobsługiwana metoda żądania.');
            });
          </script>";
}
?>
