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
