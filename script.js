function payWithPaystack() {
          var handler = PaystackPop.setup({
            key: 'pk_test_027b962d77880220eef66c2c8264bd9adf7c85d7', // Replace with your Paystack public key
            email: document.getElementById('email-address').value,
            amount: document.getElementById('amount').value * 100, // Convert amount to kobo
            currency: 'NGN',
            ref: '' + Math.floor((Math.random() * 1000000000) + 1), // Generate a unique transaction reference
            onClose: function() {
              alert('Payment was not completed.');
            },
            callback: function(response) {
              console.log('Payment successful. Reference: ' + response.reference);
              // Show the full content after successful payment
              document.getElementById('full-content').style.display = 'block';
              // Optionally, you can hide the payment form or clear it
              document.getElementById('payment-form').style.display = 'none';
            }
          });
        
          handler.openIframe(); // Opens the inline payment form without a popup
        }
        
        // Card number input listener to format and display the card number
        document.getElementById('card-number').addEventListener('input', function(e) {
          var cardNumber = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
          var cardNumberFormatted = cardNumber.replace(/(.{4})/g, '$1 ');
          document.getElementById('card-number-display').textContent = cardNumberFormatted.trim();
        });
        
        // CVV input listener to flip the card
        document.getElementById('cvv').addEventListener('focus', function() {
          document.getElementById('card').classList.add('flipped');
        });
        
        document.getElementById('cvv').addEventListener('blur', function() {
          document.getElementById('card').classList.remove('flipped');
        });
        
        // Expiry date inputs listener to format and display the expiry date
        document.getElementById('expiry-month').addEventListener('change', function() {
          var month = this.value;
          var year = document.getElementById('expiry-year').value;
          if (year) {
            document.getElementById('card-expiry-display').textContent = month + '/' + year.substr(2, 2);
          }
        });
        
        document.getElementById('expiry-year').addEventListener('change', function() {
          var month = document.getElementById('expiry-month').value;
          var year = this.value;
          if (month) {
            document.getElementById('card-expiry-display').textContent = month + '/' + year.substr(2, 2);
          }
        });
        
        // Cardholder name input listener to display the name
        document.getElementById('card-name').addEventListener('input', function(e) {
          document.getElementById('card-holder-display').textContent = e.target.value.toUpperCase();
        });