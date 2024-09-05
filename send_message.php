<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Проверка наличия и защита данных
    $name = !empty($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : 'Nieznane imię';
    $email = !empty($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : 'Nieznany email';
    $message = !empty($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : 'Brak wiadomości';

    // Данные для Telegram API
    $token = "7433898172:AAERsX6F1b_anBbRn1hAof3lMEq-DvBgj04";
    $chat_id = "708285715";
    $text = "Imię: $name\nEmail: $email\nWiadomość: $message";

    $url = "https://api.telegram.org/bot$token/sendMessage";
    $post_fields = [
        'chat_id' => $chat_id,
        'text' => $text,
    ];

    // Отправка cURL запроса
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_fields));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    if ($response === false) {
        // Если ошибка при отправке
        echo "<script>alert('Wystąpił błąd: " . curl_error($ch) . "');</script>";
    } else {
        // Если сообщение успешно отправлено
        echo "<script>alert('Wiadomość wysłana pomyślnie!');</script>";
    }

    curl_close($ch);
} else {
    // Если метод запроса не POST
    echo "<script>alert('Nieobsługiwana metoda żądania.');</script>";
}
?>
