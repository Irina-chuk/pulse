// Modal

window.addEventListener('DOMContentLoaded', function() {
    
    function bindModal(triggerSelector, overlaySelector, modalId, closeSelector) {
        const trigger = document.querySelectorAll(triggerSelector),
        modal = document.getElementById(modalId),
        close = document.querySelector(closeSelector),
        overlay = document.querySelector(overlaySelector);
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                overlay.style.display = "block";
                modal.style.display = "block";
            });
            close.addEventListener('click', () => {
                overlay.style.display = "none";
                modal.style.display = "none";
            });
            overlay.addEventListener('click', (e) => {
                if ((e.target == overlay) && (e.target !== modal)) {
                    overlay.style.display = "none";
                    modal.style.display = "none";
                }
                
            });

        
    });
    }
    bindModal('[data-modal=consultation]', '.overlay', 'consultation', '#consultation .modal__close');
    bindModal('[data-modal=order]', '.overlay', 'order', '#order .modal__close');
    const btnOrder = document.querySelectorAll('[data-modal=order]'),
          descrOrder = document.querySelector('#order .modal__descr'),
          newDescrOrder = document.querySelectorAll('.catalog-item__subtitle');

          btnOrder.forEach(function(item, i) {
                item.addEventListener('click', () => {
                    descrOrder.textContent = newDescrOrder[i].textContent;
            })
            });
//form post
    const forms = document.querySelectorAll('form');
    //const fields = document.querySelectorAll('[data-field]');

    const chekValidate = function (form) {
        let fields = form.querySelectorAll('[data-field]');
        let errors = form.querySelectorAll('.error');
        let emptyFields = [];

        for (let i = 0; i < errors.length; i++) {
            errors[i].remove();
            fields[i].style.border = "none";
        }
        for (let i = 0; i < fields.length; i++) {
            
            if(!fields[i].value) {
                //console.log('заполни поле', fields[i]); 
                fields[i].style.border = "2px solid red";
                const errorMessage =  document.createElement('div');
                errorMessage.className = "error"; 
                errorMessage.textContent = "Заполните поле";
                fields[i].insertAdjacentElement('afterend', errorMessage);
                emptyFields.push(fields[i]); 
                } 

        }

        for (let i = 0; i < emptyFields.length; i++) {
              
            if(!emptyFields[i].value) {
                return false;
            }
            
        }
        return true;
    } 
    function showThanksModal() {
        const thanksModal = document.querySelector('#thanks'),
        close = document.querySelector('#thanks .modal__close'),
        overlay = document.querySelector('.overlay');
        document.querySelector('#consultation').style.display = "none";
        document.querySelector('#order').style.display = "none";
        overlay.style.display = "block";
        thanksModal.style.display = "block";
        close.addEventListener('click', () => {
            overlay.style.display = "none";
            thanksModal.style.display = "none";
        });
        overlay.addEventListener('click', (e) => {
            if ((e.target == overlay) && (e.target !== thanksModal)) {
                overlay.style.display = "none";
                thanksModal.style.display = "none";
            }
        });
    }

    forms.forEach(item => { 
        postData(item);
    });

    function postData(form) {
        const message = {
            loading: 'Загрузка',
            failure: 'Что-то пошло не так...'
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            form.append(statusMessage);
            let allPresent = chekValidate(form);


            if (allPresent) {
                const formData = new FormData(form);
                fetch('server.php', {
                    method: 'POST',
                // headers: {
                //     'Content-type': 'application/json'
                //     },
                    body: formData
                })
                .then(data => {
                    console.log(data);
                    showThanksModal();
                }).catch(() => {
                    statusMessage.textContent = message.failure; 
                    
                }).finally(() => {
                    form.reset();   // обнуление формы
                });
            } 

            
    })
    }

     //link active
    const linkActive = document.querySelectorAll('.catalog-item__link'),
    linkBack = document.querySelectorAll('.catalog-item__back'),
    activeContent = document.querySelectorAll('.catalog-item__content_active'),
    newContent = document.querySelectorAll('.catalog-item__list');

    linkActive.forEach((item,i) => {
        item.addEventListener('click', function (e) {
        e.preventDefault();
        newContent[i].classList.add('catalog-item__list_active');
        activeContent[i].classList.remove('catalog-item__content_active');
        })
    });
    linkBack.forEach((item, i) => {
        item.addEventListener('click', function(e) {
        e.preventDefault();
        newContent[i].classList.remove('catalog-item__list_active');
        activeContent[i].classList.add('catalog-item__content_active');
        })
    });

    // pageup
    const pageUp = document.querySelector('.pageup');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 1600) {
           pageUp.style.display = "block"; 
        } else {
            pageUp.style.display = "none";
        }
    });


    });
        

   


