<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $token = "7433898172:AAERsX6F1b_anBbRn1hAof3lMEq-DvBgj04";
    $chat_id = "708285715";
    $text = "Имя: $name\nEmail: $email\nСообщение: $message";

    $url = "https://api.telegram.org/bot$token/sendMessage";
    $post_fields = http_build_query([
        'chat_id' => $chat_id,
        'text' => $text,
    ]);

    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => $post_fields,
        ],
    ];

    $context  = stream_context_create($options);
    $response = file_get_contents($url, false, $context);

    if ($response === FALSE) {
        echo "Ошибка отправки сообщения: " . error_get_last()['message'];
    } else {
        echo "Сообщение отправлено успешно! Ответ: " . $response;
    }
} else {
    echo "Метод запроса не поддерживается.";
}
?>
