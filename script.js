document.addEventListener('DOMContentLoaded', function () {
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();  // Отменяем стандартное поведение ссылки

            // Получаем элемент, на который ссылается href
            const targetElement = document.querySelector(this.getAttribute('href'));

            if (targetElement) {
                // Плавно прокручиваем к цели
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Показ всплывающего окна при успешной отправке формы
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Предотвращаем стандартное поведение формы

            // Отправка формы через AJAX
            fetch('send_message.php', {
                method: 'POST',
                body: new FormData(form),
            })
            .then(response => {
                if (response.ok) {
                    // Показ всплывающего окна
                    const popup = document.getElementById('popup');
                    if (popup) {
                        popup.style.display = 'flex';
                    }
                } else {
                    alert('Ошибка при отправке формы. Попробуйте еще раз.');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Ошибка при отправке формы. Попробуйте еще раз.');
            });
        });
    }

    // Закрытие всплывающего окна
    const closePopup = document.getElementById('closePopup');
    if (closePopup) {
        closePopup.addEventListener('click', function () {
            const popup = document.getElementById('popup');
            if (popup) {
                popup.style.display = 'none';
            }
        });
    }
});

