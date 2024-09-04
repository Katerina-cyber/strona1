<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получение данных из POST-запроса
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Токен вашего бота и ID чата
    $token = "7433898172:AAERsX6F1b_anBbRn1hAof3lMEq-DvBgj04";
    $chat_id = "708285715";

    // Формирование текста сообщения
    $text = "Имя: $name\nEmail: $email\nСообщение: $message";

    // URL для отправки запроса
    $url = "https://api.telegram.org/bot$token/sendMessage";

    // Параметры запроса
    $post_fields = http_build_query([
        'chat_id' => $chat_id,
        'text' => $text,
    ]);

    // Опции контекста для POST-запроса
    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => $post_fields,
        ],
    ];

    // Создание контекста для запроса
    $context  = stream_context_create($options);

    // Отправка запроса и получение ответа
    $response = file_get_contents($url, false, $context);

    // Проверка успешности запроса
    if ($response === FALSE) {
        $error = error_get_last();
        echo "Ошибка отправки сообщения. Код ошибки: " . $error['message'];
    } else {
        echo "Сообщение отправлено успешно! Ответ: " . $response;
    }
} else {
    echo "Метод запроса не поддерживается. Используйте POST.";
}
?>
