// Выбираем все ссылки, которые ведут на якорь
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Получаем элемент, на который ссылается href
        const targetElement = document.querySelector(this.getAttribute('href'));

        if (targetElement) {
            // Плавно прокручиваем к цели
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
