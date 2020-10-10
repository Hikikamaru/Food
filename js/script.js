window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabPerent = document.querySelector('.tabheader__items'); /*Визиваємо елементи з якіми будемо працювати*/
    function hideTabContent() {
        /*За допомогою ццієї фунції ми приховуємо всі таби та видаляємо всі активні класи на наших пунктах (Фінтес,...,...,)*/
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
            /*І пишемо що якщо клік користувача буде приходитись на наші пункти то ми перериваємо нашу колекцію та якщо знаходимо співпадіння то визиваємо ті дві функції  */
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    //Timer

    const deadline = '2020-09-28';

    function getTimeRamaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), //Помістили  в endtime час який прийшов звідкісь і відняли теперішню дату та час
            days = Math.floor /*Заокрглює до найближчого цілого */(t / (1000 * 60 * 60 * 24)), //Так ми отримаємо скільки мілісекунд в одному дні для щоб отримати значення в днях скільки залишилося до закінчення таймера
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), //Отримаємо скільки годин залишилось до кінця акції, %24 це той хвостик якого не вистачає до 24 годин і він буде повертатися в години тобто якщо до кінця акції 50 годин ми ділимо на 24 отримаємо цілих два дні  а 2 години підуть до годин в таймері 
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
            'days': days
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

                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }



        }
    }
    setTimer('.timer', deadline);
    //В цьому коді при оновлені мє мигання в числах при оновленні сторінки цю проблему можна виправити просто визвавши фунцію updateClock() перед 



    // Modal window

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModalWindow() {
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden';
    }

    modalTrigger.forEach(btn => { //Цей функціонал відповідає за відображення модального вікна при натискані на кнопку  можна було написати model.clasList.ada('show') model.clasList.ada('hide')  але це чомусь не працює  
        btn.addEventListener('click', openModalWindow);
        //відповідає зате щоб при модальному вікні прокрутка не працювала



        function closeModalWindow() { //Відповідає за закриття модального вікна  
            modal.style.display = 'none';
            document.body.style.overflow = '';
            clearInterval(modalSetTimeOut); //якщо користувач вже відкрив це модальне вікно то таймер  очиститься на modalSetTimeOut і вже не буде відкриватися
        }

        
        modal.addEventListener('click', (e) => { //закриття вікна при нажиманні за межами модального вікна 
            if (e.target === modal|| e.target.getAttribute('data-close') =='') {
                closeModalWindow(); //Відповідає за закриття модального вікна  
            }
        });
        document.addEventListener('keydown', (e) => { //Цей функціонал відповідає за закриття вікна при нажиманні "Esc"
            if (e.code === 'Escape' && modal.style.display === 'block') {
                closeModalWindow(); //Відповідає за закриття модального вікна  
            }
        })
    });
    const modalSetTimeOut = setTimeout(openModalWindow, 60000); //Модальне вікно зявиться через 15 секунд після того як користувач зайде на сторінку 
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow();
            window.removeEventListener('scroll', showModalByScroll) //Цей функціонал відповідає за те що при моменті коли користувач доскролив вниз сторінки ця фунція закривалась

        };

    }
    window.addEventListener('scroll', showModalByScroll); // Показує модальне вікно коли користувач доскролив до кінця сторінки
    //Patterning (Шаблонізація)

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {//Створюємо спільну модель для шаблонізації нових карточок
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes,
                this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }
        changeToUAH() {//Фцнкція відповідає затрансформацію валюти взяли сталу цифру в парктиці дані можуть приходити з серверу 
            this.price = this.price * this.transfer
        }
        render() {
            const element = document.createElement('div');//Тут ми і забезпечуємо нашу шаблонізацію тобто всі нові елементи які приходят будуть преревірятися на наявність класів якщо їх немає то ми будемо їх присвоювати тим самим і шаблонізуючи все
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(classesName => element.classList.add(classesName))
            }

            element.innerHTML = `
     
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                
     `;
            this.parent.append(element);
        }
    }
    const getResource = async(url)=>{
        const res =  await fetch(url);
        if(!res.ok){
             throw new Error(`Could not fetch ${url},status:${res.status}`);
        }
        return await res.json()
    };
    //getResource(' http://localhost:3000/menu')
    //.then(data=>{
//data.forEach(({img,altimg,title,descr,price})=>{
//new MenuCard(img,altimg,title,descr,price,'.menu .container').render();
//});
    //});
    axios.get(' http://localhost:3000/menu')
    .then(data=>{
        data.data.forEach(({img,altimg,title,descr,price})=>{
        new MenuCard(img,altimg,title,descr,price,'.menu .container').render();
        });
    });
   /* new MenuCard(//Цей пороце можна обернути в фунцію щоб не писати в ручну
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',


    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container',

    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container',

    ).render();*/

    //Form
    const forms = document.querySelectorAll('form');//В цьому блоці коду ми робили форму для користувача з відправкою на сервер всіх даних які він вводить
    const message = {
        loading: 'img\form\spinner.svg',//Кнопка завантаження (стандартний кружечок)працює не коректно 
        success: 'Спасибо!Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };
    forms.forEach(item => {
        blindpostData(item);
    });
const postData = async(url,data)=>{
    const res =  await fetch(url,{
        method:"POST",
                headers:{
                    'Conten-type' :'application/json'
                },
                body:data
    });
    return await res.json()
};
    function blindpostData(form) {//цей блок коду відповідаю за сам процес появи модального вікна для користувача що відбувається загрузка,збій,т.д
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText =`
            display: block;
            margin: 0 auto;
            ` ;
            form.insertAdjacentElement('afterend',statusMessage);//момент відправки даних на сервер використовуюти як  XMLHttpRequest так і FormData тому ми і не пишемо заголовок що приходиь на сервер
           
            //request.setRequestHeader('Content-type', 'multipart/form-data');
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()))
            /*fetch('server.php',{
                method:"POST",
                /*headers:{
                    'Conten-type' :'application/json'
                },
                body:formData
            }*/
            postData('http://localhost:3000/requests',json)
            .then(data=>{
                console.log(data);
                   showThanksModal(message.success);
                    form.reset();
            }).catch(()=>{
                showThanksModal (message.failure);
            }).finally(()=>{
                form.reset();
            })

            /*request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                   showThanksModal(message.success);
                    form.reset();
                    
                        statusMessage.remove();
                } else {
                    showThanksModal (message.failure);
                };
                

               
            });*/

        });
    }
    function showThanksModal(message){//Функія відповідає за те що користувач бачить на сайті а конкретно модальне вікно з інформацією яка вже залежить від того що прийде від серверу
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModalWindow();
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML =`
        <div class ="modal__content">
        <div class = "modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
        </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.add('hide');
            closeModalWindow();
        },4000)
    }
//Slider
    const slides = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next= document.querySelector('.offer__slider-next'),
    total= document.querySelector('#total'),
    current = document.querySelector('#current');

    let slideIndex = 1
    showSlides(1);
    
    

    function showSlides(n){
if(n>slides.length){
slideIndex = 1
};
if(n < 1){
    slideIndex =slides.length
};
slides.forEach(item =>item.style.display='none');
slides[slideIndex-1].style.display='block'; 

if(slides.length<10){
    current.textContent=`0${slideIndex}`
        }else{
            current.textContent=slideIndex;
        }

    }
    function plusSlides(n){
        showSlides(slideIndex+=n);
    }
    prev.addEventListener('click',()=>{
        plusSlides(-1);
    });
    next.addEventListener('click',()=>{
        plusSlides(1);
    })

});


