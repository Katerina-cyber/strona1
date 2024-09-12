document.addEventListener('DOMContentLoaded', function () {
    // Находим необходимые элементы
    const form = document.getElementById('contactForm');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');

    // Проверяем наличие всех необходимых элементов
    if (!form || !popup || !closePopup) {
        console.error('Не все необходимые элементы найдены на странице');
        return;
    }

    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Обработка отправки формы
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';

        console.log('Отправка формы...');

        fetch('send_telegram.php', {
            method: 'POST',
            body: new FormData(form),
        })
        .then(response => {
            console.log('Ответ сервера:', response);
            if (response.ok) {
                return response.text(); // или response.json() если сервер отвечает JSON'ом
            } else {
                throw new Error('Ошибка сервера: ' + response.status);
            }
        })
        .then(data => {
            console.log('Данные от сервера:', data);
            form.reset(); // Сброс формы
            popup.style.display = 'flex';
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Ошибка при отправке формы. Попробуйте еще раз.');
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Отправить';
        });
    });

    // Закрытие всплывающего окна
    closePopup.addEventListener('click', function () {
        popup.style.display = 'none';
    });
});
