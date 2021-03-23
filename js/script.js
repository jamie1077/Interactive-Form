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