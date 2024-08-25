// Card type detection and logo display
const cardNumberInput = document.getElementById('card-number');
const cardLogo = document.getElementById('card-logo');
const cardNumberDisplay = document.getElementById('card-number-display');
const cardHolderInput = document.getElementById('card-name');
const cardHolderDisplay = document.getElementById('card-holder-display');
const expiryMonthInput = document.getElementById('expiry-month');
const expiryYearInput = document.getElementById('expiry-year');
const cardExpiryDisplay = document.getElementById('card-expiry-display');
const cvvInput = document.getElementById('cvv');
const cvvDisplay = document.getElementById('cvv-display');
const card = document.getElementById('card');

// Card type regex patterns
const cardTypes = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
    unionpay: /^(62[0-9]{14,17})$/,
    troy: /^9792[0-9]{12}$/,
    verve: /^5061|^650002[0-9]{10,13}$/,
};

// Card type to logo mapping
const cardLogos = {
    visa: '/images/visa.png',
    mastercard: '/images/mastercard.png',
    amex: '/images/amex.png',
    discover: '/images/discover.png',
    diners: '/images/diners.png',
    jcb: '/images/jcb.png',
    unionpay: '/images/unionpay.png',
    troy: '/images/troy.png',
    default: '/images/visa.png' // Fallback image
};

cardNumberInput.addEventListener('input', function () {
    const cardNumber = cardNumberInput.value.replace(/\s+/g, '');
    cardNumberDisplay.textContent = cardNumber.padEnd(16, '#').replace(/(.{4})/g, '$1 ').trim();

    let cardType = 'default';

    for (let type in cardTypes) {
        if (cardTypes[type].test(cardNumber)) {
            cardType = type;
            break;
        }
    }

    // Use the cardLogos object to set the card logo source
    cardLogo.src = cardLogos[cardType] || cardLogos['default'];
});

cardHolderInput.addEventListener('input', function () {
    cardHolderDisplay.textContent = cardHolderInput.value.toUpperCase();
});

expiryMonthInput.addEventListener('change', updateExpiry);
expiryYearInput.addEventListener('change', updateExpiry);

function updateExpiry() {
    cardExpiryDisplay.textContent = `${expiryMonthInput.value}/${expiryYearInput.value.slice(2)}`;
}

cvvInput.addEventListener('focus', function () {
    card.classList.add('flipped');
});

cvvInput.addEventListener('blur', function () {
    card.classList.remove('flipped');
});

cvvInput.addEventListener('input', function () {
    cvvDisplay.textContent = cvvInput.value.padEnd(3, '#');
});

document.getElementById('payButton').addEventListener('click', function () {
    const email = document.getElementById('email-address').value;
    const amount = document.getElementById('amount').value * 100;

    PaystackPop.setup({
        key: 'pk_test_027b962d77880220eef66c2c8264bd9adf7c85d7', // Replace with your Paystack public key
        email: email,
        amount: amount,
        currency: 'NGN',
        callback: function (response) {
            // Payment success
            alert('Payment successful! Transaction ref: ' + response.reference);
            document.getElementById('full-content').style.display = 'block';
        },
        onClose: function () {
            alert('Payment was not completed.');
        },
    }).openIframe();
});
