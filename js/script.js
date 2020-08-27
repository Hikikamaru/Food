window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
        /*Визиваємо елементи з якіми будемо працювати*/
        tabContent = document.querySelectorAll('.tabcontent'),
        /*Визиваємо елементи з якіми будемо працювати*/
        tabPerent = document.querySelector('.tabheader__items'); /*Визиваємо елементи з якіми будемо працювати*/
    function hideTabContent() {
        /*За допомогою ццієї фунції ми приховуємо всі таби та видаляємо всі активні класи на наших пунктах (Фінтес,..б,,)*/
        tabContent.forEach(item => {
            item.style.display = 'none';

            tabs.forEach((item) => {
                item.classList.remove('tabheader__item_active'); /*видаляємо всі активні класи на наших пунктах (Фінтес,...,...,)*/
            })

        });

    }

    function showTabContent(i = 0) {
        /*За допомогою цієї функції ми повертаємо назад наші таби та знову повертаємо активні класи на пункти*/
        tabContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    showTabContent();

    tabPerent.addEventListener('click', (event) => {
        /*Тут даємо оброблювач події */
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            /*І пишемо що якщо клік користувача буде приходитись на наші пункти то ми перериваємо нашу колекцію та чкщо знаходимо співпадіння то визиваємо ті дві функції  */
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
});
