const express = require('express');
const app = express();
app.use(express.json());

// v2: Input payment with validation checks
app.post('/api/payment', (req, res) => {
    const { cardNumber, amount, cardHolder } = req.body;
    
    // v2 structural detail check
    if (!cardNumber || !amount || !cardHolder) {
        return res.status(400).json({ error: "Missing required payment fields" });
    }
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
        return res.status(400).json({ error: "Invalid card format. Must be 16 digits." });
    }
    if (amount <= 0) {
        return res.status(400).json({ error: "Transaction amount must be greater than zero." });
    }
    
    res.status(200).json({ 
        status: "Payment Validated", 
        message: "v2: Details checked and approved." 
    });
});

app.listen(3000, () => console.log('Payment Gateway v2 running on port 3000'));
