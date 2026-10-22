const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/payment', (req, res) => {
    const { cardNumber, amount, cardHolder } = req.body;
    
    // v2 Validation Checks
    if (!cardNumber || !amount || !cardHolder) {
        return res.status(400).json({ error: "Missing required payment fields" });
    }
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
        return res.status(400).json({ error: "Invalid card format. Must be 16 digits." });
    }
    if (amount <= 0) {
        return res.status(400).json({ error: "Transaction amount must be greater than zero." });
    }
    
    // v3: Generate confirmation receipt
    const transactionId = "TXN-" + Math.floor(Math.random() * 90000000 + 10000000);
    
    res.status(200).json({ 
        status: "Success",
        message: "v3: Receipt Generated.",
        receipt: {
            transactionId: transactionId,
            timestamp: new Date().toISOString(),
            merchant: "Localhost Payment System Inc.",
            amount: `$${parseFloat(amount).toFixed(2)}`,
            cardUsed: `**** **** **** ${cardNumber.slice(-4)}`,
            cardHolder: cardHolder
        }
    });
});

app.listen(3000, () => console.log('Payment Gateway v3 running on port 3000'));
