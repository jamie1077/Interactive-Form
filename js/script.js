const focusOnLoad = document.querySelector('#name').focus();
const jobRoles = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');
otherJobRole.setAttribute('type', 'hidden');
const colorList = document.querySelector('#color');
colorList.setAttribute('disabled', '');
const designList = document.querySelector('#design');
const activities = document.querySelector('#activities');
const activityCheckboxes = document.querySelectorAll('#activities input');
const paymentMethod = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
creditCard.style.display = 'block';
const paypal = document.querySelector('#paypal');
paypal.style.display = 'none';
const bitcoin = document.querySelector('#bitcoin');
bitcoin.style.display = 'none';
const paymentBlocks = [creditCard, paypal, bitcoin];

//show 'other-job-role' field only when 'other' option is selected
jobRoles.addEventListener('change', e => {
    for(let i = 0; i < jobRoles.length; i++){
        let selected = e.target.value;
        
        if(selected === 'other'){
            otherJobRole.setAttribute('type', 'text');
        }else{
            otherJobRole.setAttribute('type', 'hidden');
        }
    }
});

//remove the disabled attribute from color select when design dropdown activated
designList.addEventListener('change', e => {
    colorList.removeAttribute('disabled');
    
    for(let i = 0; i < colorList.length; i++){
        let colorOpt = colorList[i].getAttribute('data-theme');
        let designOpt = e.target.value;

        if(colorOpt === designOpt){
            colorList[i].setAttribute('selected', '');
            colorList[i].removeAttribute('hidden', '');
        }else{
            colorList[i].removeAttribute('selected', '');
            colorList[i].setAttribute('hidden', '');
        }
    }
});


// total cost of activities is updated on user selection
let total = 0;

activities.addEventListener('change', e => {
    let activity = e.target;
    let cost = parseInt(activity.getAttribute('data-cost'));

    if (activity.checked) {
        total += cost;
    }else{
        total -= cost;
    }

    document.getElementById('activities-cost').innerHTML = `Total: $${total}`;
});


// payment info to allow for future proofing avoid equating exact string values
let selected = payment[1].setAttribute('selected', 'selected');

paymentMethod.addEventListener('change', e => {
    for(let i = 0; i < paymentBlocks.length; i++){
        let choice = e.target.value;
        if(choice === paymentBlocks[i].id){
           paymentBlocks[i].style.display = 'block';
        }else{
            paymentBlocks[i].style.display = 'none';
        }
    }
});

//Validation

const form = document.querySelector('form');
const nameElement = document.querySelector('#name');
const emailElement = document.querySelector('#email');
const validationMessage = document.querySelectorAll('.hint');

function validation(arg1){  
    arg1.classList.add('error');
    
    for(let i = 0; i < validationMessage.length; i++){  
        validationMessage[i].style.display = 'block';
    } 
}


function nameValidator (){
    const nameValue = nameElement.value;
    
    // tests that there is at least a first name containing only letters, and allows for a middle and last name.
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);

    return nameIsValid;
}


function emailValidator (){
    const emailValue = emailElement.value;

    // tests that there is a few characters for the username, followed by “@”, followed by a few more characters 
    const emailIsValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailValue);
      
    return emailIsValid;
}


/* Submit listener on the form submit */
form.addEventListener('submit', e => {
    e.preventDefault();

    if(!nameValidator()){
      validation(nameElement);
    }

    if(!emailValidator()){
        validation(emailElement);
    }
});