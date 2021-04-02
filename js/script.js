const focusOnLoad = document.querySelector('#name').focus(); //name field to be focussed on page load
const jobRoles = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');
otherJobRole.setAttribute('type', 'hidden');
const colorList = document.querySelector('#color');
colorList.setAttribute('disabled', '');
const designList = document.querySelector('#design');
const activities = document.querySelector('#activities');
const activityCheckboxes = document.querySelectorAll('#activities input');
const activitiesBox = document.querySelector('#activities-box');
const paymentMethod = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
creditCard.style.display = 'block';
const paypal = document.querySelector('#paypal');
paypal.style.display = 'none';
const bitcoin = document.querySelector('#bitcoin');
bitcoin.style.display = 'none';
const paymentBlocks = [creditCard, paypal, bitcoin];
const form = document.querySelector('form');
const nameElement = document.querySelector('#name');
const emailElement = document.querySelector('#email');
const cardNumber = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');

let total = 0; //activites total used for calculating activity costs and in validating 

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
activities.addEventListener('change', e => {
    let activity = e.target;
    let cost = parseInt(activity.getAttribute('data-cost'));
    let dayTime = activity.getAttribute('data-day-and-time');
    
    if (activity.checked) {
        total += cost;
    }else{
        total -= cost;
    }

    document.getElementById('activities-cost').innerHTML = `Total: $${total}`;

    //disable activites with matching day/time if checked
    for(let i = 0; i < activityCheckboxes.length; i++){
        let comparison = activityCheckboxes[i].getAttribute('data-day-and-time');
        if(comparison === dayTime && activityCheckboxes[i] !== activity){
            if(activity.checked){
                activityCheckboxes[i].disabled = true;
                activityCheckboxes[i].parentElement.classList.add('disabled');
            }else{
                activityCheckboxes[i].disabled = false;
            activityCheckboxes[i].parentElement.classList.remove('disabled');
            }
        }
    }
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


/**
 * Validation 
**/

// if validation fails classes and styling added to emphasise user error and helpful hints added to required form fields
function validateFail(arg){  
    arg.parentElement.classList.add('not-valid');
    arg.parentElement.classList.remove('valid');
    arg.parentElement.lastElementChild.style.display = 'block';
}

//if validation passes fail classes and styling removed and hints hidden
function validatePass(arg){  
    arg.parentElement.classList.add('valid');
    arg.parentElement.classList.remove('not-valid');
    arg.parentElement.lastElementChild.style.display = 'none';
}


/**
 * Helper Functions 
**/

function nameValidator (){
    // tests that the name field is not blank or empty and contains only letters.
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameElement.value);

    if(nameIsValid){
        validatePass(nameElement);
    }else{
        validateFail(nameElement);
    }

    return nameIsValid;
}

function emailValidator (){
    // tests that there is a few characters for the username, followed by "@", followed by a few more characters , followed by ".com"
    const emailIsValid = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[com]{2,3}/.test(emailElement.value);
    const hint = document.querySelector('#email-hint');

    if(emailIsValid){
        validatePass(emailElement);
    }else{
        validateFail(emailElement);
    }

    if(emailElement.value === ''){
        hint.innerHTML = 'Email field cannot be blank';
    }else{
        hint.innerHTML = 'Email field must be formatted correctly';
    }
    
    return emailIsValid;
}

function activityValidator (){
    const activityIsValid = total > 0;
    
    if(activityIsValid){
        validatePass(activitiesBox);
    }else{
        validateFail(activitiesBox);
    }
    return activityIsValid;
}

function cardNoValidator (){
    // tests card number field contains a 13 - 16 digit credit card number with no dashes or spaces.
    const cardIsValid = /^[0-9]{13,16}$/.test(cardNumber.value);

    if(cardIsValid){
        validatePass(cardNumber);
    }else{
        validateFail(cardNumber);
    }
    
    return cardIsValid;
}

function zipValidator (){
    // tests zip code field contains a 5 digit number.
    const zipIsValid = /^\d{5}$/.test(zipCode.value);

    if(zipIsValid){
        validatePass(zipCode);
    }else{
        validateFail(zipCode);
    }

    return zipIsValid;
}

function cvvValidator (){
    // tests cvv field contains a 3 digit number.
    const cvvIsValid = /^[0-9]{3}$/.test(cvv.value);

    if(cvvIsValid){
        validatePass(cvv);
    }else{
        validateFail(cvv);
    }

    return cvvIsValid;
}


/*
 * Accessibility - focus state on field when tabbing
*/

activityCheckboxes.forEach(cb => {
    cb.addEventListener('focus', e => cb.parentElement.classList.add('focus'));

    cb.addEventListener('blur', e => {
        const active = document.querySelector('.focus');
        if (active) active.classList.remove('focus');
    })
});


/**
 * Real time validation messaging on name field
**/

form.addEventListener('keyup', e => {
    nameValidator();
});


/**
 * Submit listener on the form submit 
**/

form.addEventListener('submit', e => {
    if(!nameValidator()){ 
        e.preventDefault();
    } 
    
    if(!emailValidator()){
        e.preventDefault();
    } 
    
    if(!activityValidator()){
        e.preventDefault();
    }

    if(paymentMethod.value === 'credit-card'){
        if(!cardNoValidator()){
            e.preventDefault();
        }
        if(!zipValidator()){
            e.preventDefault();
        }
        if(!cvvValidator()){
            e.preventDefault();
        }
    }
});


