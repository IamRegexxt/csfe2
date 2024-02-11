const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db.config');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = require('../middleware/authToken').secretKey;

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;

        const getUserQuery = 'SELECT * FROM users WHERE username = ?';
        const [rows] = await db.promise().execute(getUserQuery, [username]);
        if (rows.length === 0) {
            return res.status(401).json({message: 'Invalid credentials'});
        }
        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({message: 'Invalid credentials'});
        }
        const token = jwt.sign({userId: user.id, username:user.username}, secretKey,{expiresIn:`1h`});
        res.status(200).json({message: 'Login successful', token});

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;