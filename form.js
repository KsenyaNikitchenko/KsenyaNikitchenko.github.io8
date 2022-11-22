document.addEventListener('DOMContentLoaded', function () {
    const openPopUp = document.getElementById('open_pop-up');
    const closePopUp = document.getElementById('pop-up_close');
    const PopUp = document.getElementById('pop-up');
    openPopUp.addEventListener('click', function(e) {
        e.preventDefault();
        PopUp.classList.add('active');
        window.history.pushState({ page: 2 }, '', '?form');
        onpopstate=(event)=>{
            window.history.go();
        };
    });
    closePopUp.addEventListener('click', () => {
        PopUp.classList.remove('active');
    });
    const form = document.getElementById('form');
    const formFields = form.elements;
    let json = { name: '', email: '', message: '', checkbox: '' };
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        cleareStorage();
        fetch('https://formcarry.com/s/bBjYw4bid', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(json)
        })
            .then(response => {
                if (response.ok) {
                    alert("Спасибо за отзыв!");
                } else{
                    alert("Не удалось отправить отзыв( Попробуйте снова")
                }
            })
            .catch(error => console.log(error))    
    });
    //После отправки формы localeStorage очищается
    function cleareStorage() {
        localStorage.clear();
    }
    //Сохранение полей в localeStorage
    function saveStorage() {
        if (this.type !== 'checkbox') {
            console.log(this.name, this.value);
            localStorage.setItem(this.name, this.value);
            json[this.name] = this.value;
        } else {
            console.log(this.name, this.checked);
            localStorage.setItem(this.name, this.checked);
            json[this.name] = this.checked;
        }
    }
    //Если есть данные в localeStorage, то происходит заполнение полей формы
    function chekStorage() {
        for (let i = 0; i < formFields.length; i++) {
            if (formFields[i].type !== 'submit') {
                if (formFields[i].type === 'checked') {
                    formFields[i].checked = localStorage.getItem(formFields[i].name);
                    json[this.name] = this.checked;
                } else {
                    formFields[i].value = localStorage.getItem(formFields[i].name);
                    json[this.name] = this.value;
                }
            }
        }
        attachEvents();
    }
    function attachEvents() {
        for (let i = 0; i < formFields.length; i++) {
            formFields[i].addEventListener('change', saveStorage);
        }
    }
    chekStorage();
});
