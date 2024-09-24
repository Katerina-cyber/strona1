<?php
// Включить подробный вывод ошибок
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', '/path/to/your/error.log');

// Проверка наличия cURL
if (!function_exists('curl_init')) {
    $error = 'cURL не установлен';
    error_log($error);
    echo json_encode(['status' => 'error', 'message' => $error]);
    exit;
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
    if ($ch === false) {
        $error = 'Не удалось инициализировать cURL';
        error_log($error);
        echo json_encode(['status' => 'error', 'message' => $error]);
        exit;
    }

    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, [
        'chat_id' => $chat_id,
        'text' => $text,
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

    // Выполнение запроса
    $response = curl_exec($ch);
    if ($response === false) {
        $error = curl_error($ch);
        $errno = curl_errno($ch);
        error_log("cURL error ({$errno}): {$error}");
        echo json_encode(['status' => 'error', 'message' => "cURL error: {$error}"]);
        curl_close($ch);
        exit;
    }

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    // Обработка ответа
    if ($httpCode == 200) {
        echo json_encode(['status' => 'success']);
    } else {
        $error = "Ошибка отправки в Telegram. Код: $httpCode, Ответ: $response";
        error_log($error);
        echo json_encode(['status' => 'error', 'message' => $error]);
    }
} else {
    // Если запрос не POST
    $error = 'Неверный метод запроса';
    error_log($error);
    echo json_encode(['status' => 'error', 'message' => $error]);
}
?>
