const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const PAYSTACK_SECRET_KEY = 'your-secret-key'; // Replace with your Paystack secret key

app.use(bodyParser.json());

app.post('/verify-payment', async (req, res) => {
    const { reference } = req.body;

    try {
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
            }
        });

        if (response.data.status) {
            // Payment verified successfully
            res.status(200).send('Payment verified successfully');
        } else {
            res.status(400).send('Payment verification failed');
        }
    } catch (error) {
        res.status(500).send('An error occurred');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
payButton.addEventListener('click', function() {
    var handler = PaystackPop.setup({
        key: 'your-public-key', // Replace with your Paystack public key
        email: 'customer@example.com', // Replace with customer's email
        amount: 5000, // Amount in kobo
        currency: 'NGN',
        ref: ''+Math.floor((Math.random() * 1000000000) + 1),
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

function verifyPayment(reference) {
    fetch('/verify-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reference: reference })
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'Payment verified successfully') {
            // Unlock the content
            lockedContent.style.display = 'none';
            fullContent.style.display = 'block';
        } else {
            alert('Payment verification failed');
        }
    })
    .catch(error => {
        console.error('Error verifying payment:', error);
        alert('An error occurred');
    });
}
