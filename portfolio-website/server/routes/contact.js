const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { name, email, message } = req.body;
    
    // Your message will be printed to the console.
    console.log(`New Message from ${name} (${email}):`);
    console.log(`Message: ${message}`);
    
    // Send success response to the client
    res.status(200).json({ success: true, message: "Message received successfully!" });
});

module.exports = router;