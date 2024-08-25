const cardNumberInput = document.getElementById('card-number');
const cardNameInput = document.getElementById('card-name');
const expiryMonthInput = document.getElementById('expiry-month');
const expiryYearInput = document.getElementById('expiry-year');
const cvvInput = document.getElementById('cvv');
const cardNumberDisplay = document.getElementById('card-number-display');
const cardHolderDisplay = document.getElementById('card-holder-display');
const cardExpiryDisplay = document.getElementById('card-expiry-display');
const cvvDisplay = document.getElementById('cvv-display');
const cardLogo = document.getElementById('card-logo');
const cardLogoBack = document.getElementById('card-logo-back');
const card = document.getElementById('card');

const cardTypePatterns = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
    diners: /^3(?:0[0-5]|[68])/,
    jcb: /^(?:2131|1800|35\d{3})/,
    unionpay: /^62/,
    verve: /^(5061|6500|5080)/
};

const cardLogos = {
    visa: 'images/visa.png',
    mastercard: 'images/mastercard.png',
    amex: 'images/amex.png',
    discover: 'images/discover.png',
    diners: 'images/diners.png',
    jcb: 'images/jcb.png',
    unionpay: 'images/unionpay.png',
    verve: 'images/verve.png'
};

cardNumberInput.addEventListener('input', updateCardDetails);
cardNameInput.addEventListener('input', updateCardDetails);
expiryMonthInput.addEventListener('input', updateCardDetails);
expiryYearInput.addEventListener('input', updateCardDetails);
cvvInput.addEventListener('input', updateCardDetails);
cvvInput.addEventListener('focus', () => {
    card.classList.add('flipped');
});
cvvInput.addEventListener('blur', () => {
    card.classList.remove('flipped');
});

function updateCardDetails() {
    const cardNumber = cardNumberInput.value;
    const cardName = cardNameInput.value;
    const expiryMonth = expiryMonthInput.value;
    const expiryYear = expiryYearInput.value;
    const cvv = cvvInput.value;

    cardNumberDisplay.textContent = formatCardNumber(cardNumber);
    cardHolderDisplay.textContent = cardName || 'AD SOYAD';
    cardExpiryDisplay.textContent = `${expiryMonth}/${expiryYear}` || 'MM/YY';
    cvvDisplay.textContent = cvv || '***';

    const cardType = getCardType(cardNumber);
    if (cardType) {
        cardLogo.src = cardLogos[cardType];
        cardLogoBack.src = cardLogos[cardType];
    } else {
        cardLogo.src = 'images/default.png';
        cardLogoBack.src = 'images/default.png';
    }
}

function formatCardNumber(number) {
    return number.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
}

function getCardType(number) {
    for (const [type, pattern] of Object.entries(cardTypePatterns)) {
        if (pattern.test(number)) {
            return type;
        }
    }
    return null;
}

card.addEventListener('mouseenter', () => {
  card.classList.add('flipped');
});

card.addEventListener('mouseleave', () => {
  card.classList.remove('flipped');
});
const payButton = document.getElementById('payButton');

payButton.addEventListener('click', function() {
    var handler = PaystackPop.setup({
        key: 'your-public-key', // Replace with your Paystack public key
        email: 'customer@example.com', // Replace with customer's email
        amount: 5000, // Amount in kobo
        currency: 'NGN',
        ref: '' + Math.floor((Math.random() * 1000000000) + 1),
        callback: function(response) {
            // Send payment reference to backend for verification
            verifyPayment(response.reference);
        },
        onClose: function() {
            alert('Payment window closed.');
        }
    });
    handler.openIframe();
});