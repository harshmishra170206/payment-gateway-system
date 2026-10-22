const express = require('express');
const app = express();
app.use(express.json());

// v1: Input payment endpoint
app.post('/api/payment', (req, res) => {
    const { cardNumber, amount, cardHolder } = req.body;
    
    if (!cardNumber || !amount || !cardHolder) {
        return res.status(400).json({ error: "Missing required payment fields" });
    }
    
    res.status(200).json({ 
        status: "Payment Received", 
        message: "v1: Data payload successfully submitted." 
    });
});

app.listen(3000, () => console.log('Payment Gateway v1 running on port 3000'));
