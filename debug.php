<?php
// Включить подробный вывод ошибок
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);

echo "<h1>PHP Debug Info</h1>";

// Вывод информации о PHP
echo "<h2>PHP Version: " . phpversion() . "</h2>";
echo "<h2>Error Log Path: " . ini_get('error_log') . "</h2>";

// Проверка наличия cURL
if (function_exists('curl_init')) {
    echo "<h2>cURL: Installed</h2>";
    echo "<h3>cURL Version: " . curl_version()['version'] . "</h3>";
} else {
    echo "<h2>cURL: Not Installed</h2>";
}

// Проверка доступа к файлу send_message.php
$send_message_path = __DIR__ . '/send_message.php';
if (file_exists($send_message_path)) {
    echo "<h2>send_message.php: File exists</h2>";
    echo "File path: " . $send_message_path . "<br>";
    echo "File permissions: " . substr(sprintf('%o', fileperms($send_message_path)), -4) . "<br>";
} else {
    echo "<h2>send_message.php: File not found</h2>";
}

// Вывод переменных сервера
echo "<h2>Server Variables</h2>";
echo "<pre>";
print_r($_SERVER);
echo "</pre>";

// Проверка настроек PHP
echo "<h2>PHP Settings</h2>";
echo "<pre>";
print_r(ini_get_all());
echo "</pre>";
?>
