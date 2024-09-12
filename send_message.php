<?php
// Включение отображения ошибок для отладки
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Функция для логирования
function log_message($message) {
    error_log(date('[Y-m-d H:i:s] ') . $message . PHP_EOL, 3, 'debug.log');
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Очистка и защита данных
    $name = !empty($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : 'Nieznane imię';
    $email = !empty($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : 'Nieznany email';
    $message = !empty($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : 'Brak wiadomości';

    // Логирование полученных данных
    log_message("Received form data - Name: $name, Email: $email, Message: $message");

    // Данные для Telegram API
    $token = "7433898172:AAERsX6F1b_anBbRn1hAof3lMEq-DvBgj04";
    $chat_id = "708285715";
    $text = "Imię: $name\nEmail: $email\nWiadomość: $message";

    $url = "https://api.telegram.org/bot$token/sendMessage";
    $post_fields = [
        'chat_id' => $chat_id,
        'text' => $text,
    ];

    log_message("Attempting to send Telegram message: " . $text);

    // Инициализация cURL для отправки запроса
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_fields));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    // Отключение проверки SSL (только для отладки)
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

    // Выполнение запроса
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    log_message("Telegram API response code: $httpCode");
    log_message("Telegram API response body: $response");

    if ($httpCode == 200) {
        // Сообщение успешно отправлено
        log_message("Message sent successfully");
        echo "<script>
                document.addEventListener('DOMContentLoaded', function() {
                    document.getElementById('popup').style.display = 'flex';
                });
              </script>";
    } else {
        // Ошибка при отправке
        $error_message = curl_error($ch);
        log_message("CURL Error: " . $error_message);
        log_message("HTTP Code: $httpCode");
        log_message("Response Body: $response");
        
        echo "<script>
                document.addEventListener('DOMContentLoaded', function() {
                    alert('Błąd wysyłania wiadomości. Sprawdź logi serwera, aby uzyskać więcej informacji.');
                });
              </script>";
    }

    // Закрываем соединение cURL
    curl_close($ch);
} else {
    // Если метод запроса не POST
    log_message("Unsupported request method: " . $_SERVER["REQUEST_METHOD"]);
    echo "<script>
            document.addEventListener('DOMContentLoaded', function() {
                alert('Nieobsługiwana metoda żądania.');
            });
          </script>";
}
?>
