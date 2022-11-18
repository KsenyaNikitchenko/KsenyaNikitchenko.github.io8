const openPopUp=document.getElementById('open_pop-up');
const closePopUp=document.getElementById('pop-up_close');
const PopUp=document.getElementById('pop-up');
openPopUp.addEventListener('click',function(e){
    e.preventDefault();
    PopUp.classList.add('active');
});
closePopUp.addEventListener('click',()=>{
    PopUp.classList.remove('active');
});
console.log(localStorage);

const form=document.getElementById('form');
const formFields=form.elements;
const submitBtn=form.querySelector('[type="submit"]');
submitBtn.addEventListener('click',cleareStorage);
function cleareStorage(){
    localStorage.clear();
}
function changeHandler(){
    if(this.type!=='checkbox'){
        console.log(this.name,this.value);
        localStorage.setItem(this.name,this.value);
    } else{
        console.log(this.name,this.checked);
        localStorage.setItem(this.name,this.checked);
    }
}
function chekStorage(){
    for(let i=0;i<formFields.length;i++){
        if(formFields[i].type!=='submit'){
            if(formFields[i].type==='checked'){
                formFields[i].checked=localStorage.getItem(formFields[i].name);
            }else{
                formFields[i].value=localStorage.getItem(formFields[i].name);
            }
        }
    }
    attachEvents();
}
function attachEvents(){
    for(let i=0;i<formFields.length;i++){
        formFields[i].addEventListener('change',changeHandler);
    }
}
chekStorage()