<?php
// Проверка наличия cURL
if (!function_exists('curl_init')) {
    die('cURL не установлен');
}

// Проверка метода запроса
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Обработка входных данных
    $name = htmlspecialchars(trim($_POST['name'] ?? 'Неизвестное имя'));
    $email = htmlspecialchars(trim($_POST['email'] ?? 'Неизвестный email'));
    $message = htmlspecialchars(trim($_POST['message'] ?? 'Нет сообщения'));

    // Настройки Telegram
    $token = '7433898172:AAERsXGF1b_anBbRn1hAof31MEq-DvBgj04';
    $chat_id = '708285715';
    $text = "Имя: {$name}\nEmail: {$email}\nСообщение: {$message}";

    // Инициализация cURL
    $ch = curl_init("https://api.telegram.org/bot{$token}/sendMessage");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, [
        'chat_id' => $chat_id,
        'text' => $text,
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Выполнение запроса
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    // Обработка ответа
    if ($response === false) {
        $error = "cURL Error: " . curl_error($ch);
        error_log($error);
        echo json_encode(['status' => 'error', 'message' => $error]);
    } elseif ($httpCode == 200) {
        echo json_encode(['status' => 'success']);
    } else {
        $error = "Ошибка отправки в Telegram. Код: $httpCode, Ответ: $response";
        error_log($error);
        echo json_encode(['status' => 'error', 'message' => $error]);
    }

    // Закрытие cURL сессии
    curl_close($ch);
} else {
    // Если запрос не POST
    echo json_encode(['status' => 'error', 'message' => 'Неверный метод запроса']);
}
?>
