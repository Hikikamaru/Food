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
    //Timer
    const deadline = '2020-09-02';

    function getTimeRamaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), //Помістили  в endtime час який прийшов звідкісь і відняли теперішню дату та час
            days = Math.floor /*Заокрглює до найближчого цілого */(t / (1000 * 60 * 60 * 24)), //Так ми отримаємо скільки мілісекунд в одному дні для щоб отримати значення в днях скільки залишилося до закінчення таймера
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), //Отримаємо скільки годин залишилось до кінця акції, %24 це той хвостик якого не вистачає до 24 годин і він буде повертатися в години тобто якщо до кінця акції 50 годин ми ділимо на 24 отримаємо цілих два дні  а 2 години підуть до годин в таймері 
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };

    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }



    function setTimer(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds '),
            timeInterval = setInterval(updateClock, 500); //Ця констуркція робить так щоб updateClock оновлялась кожну секунду
        updateClock();

        function updateClock() { //Ця функція буде виводити наш час на сторінку
            const t = getTimeRamaining(endtime)
            days.innerHTML = getZero(t.days),
                hours.innerHTML = getZero(t.hours),
                minutes.innerHTML = getZero(t.minutes),
                seconds.innerHTML = getZero(t.seconds);



            if (t.total <= 0) { //Цей фунціонал зупиняє таймер коли внашому t закінчуються мілісекунди для цього ми його і рахували
                clearInterval(timeInterval);
            }



        }
    }
    setTimer('.timer', deadline);
    //В цьому коді при оновлені мє мигання в числах при оновленні сторінки цю проблему можна виправити просто визвавши фунцію updateClock() перед 



    // Modal window

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');
    modalTrigger.forEach(btn => { //Цей функціонал відповідає за відображення модального вікна при натискані на кнопку  можна було написати model.clasList.ada('show') model.clasList.ada('hide')  але це чомусь не працює  
        btn.addEventListener('click', () => {
            modal.style.display = 'block'
            document.body.style.overflow = 'hidden'; //відповідає зате щоб при модальному вікні прокрутка не працювала


        });

        function closeModalWindow() { //Відповідає за закриття модального вікна  
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }

        modalCloseBtn.addEventListener('click', closeModalWindow);
        modal.addEventListener('click', (e) => {//закриття вікна при нажиманні за межами модального вікна 
            if (e.target === modal) {
                closeModalWindow(); //Відповідає за закриття модального вікна  
            }
        });
        document.addEventListener('keydown', (e) => {//Цей функціонал відповідає за закриття вікна при нажиманні "Esc"
            if (e.code === 'Escape' && modal.style.display === 'block') {
                closeModalWindow(); //Відповідає за закриття модального вікна  
            }
        })
    });
});