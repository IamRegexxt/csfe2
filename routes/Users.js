const express = require('express');
const db = require('../config/db.config');
const bcrypt = require('bcrypt');
const authenticateToken = require('../config/auth.config');
const router = express.Router();

//GET ALL USERS
router.get('/users', authenticateToken, (req, res) => {
    try {
        db.query('SELECT id, name, username, role_id FROM users', (err, result) => {
            if (err) {
                console.error('Error fetching items:', err);
                res.status(500).json({ message: 'Internal Server Error'});
            } else {
                res.status(200).json(result);
            }
        });
    } catch(error) {
        console.error('Error loading users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//GET ONE USER
router.get('/user/:id', authenticateToken, (req, res) => {
    let user_id = req.params.id;
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id'});
    }
    try {
        db.query('SELECT id, name, username, role_id FROM users WHERE id = ?', user_id, (err, result) => {
            if (err) {
                console.error('Error fetching items:', err);
                res.status(500).json({ message: 'Internal Server Error'});
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        console.error('Error loading user:', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

//UPDATE USER
router.put('/user/:id', authenticateToken, async (req, res) => {
    let user_id = req.params.id;
    const {name, username, password, role_id} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if(!user_id || !name || !username || !password || !role_id) {
        return res.status(400).send({ error: user, message: 'Please provide name, username and password'});
    }
    try {
        db.query('UPDATE users SET name = ?, username = ?, password = ?, role_id = ? WHERE id = ?', [name, username, hashedPassword, role_id, user_id], (err, result, fields) => {
            if (err) {
                console.error('Error updating item:', err);
                res.status(500).json({ message: 'Internal Server Error'});
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        console.error('Error loading user:', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

//DELETE USER
router.delete('/user/:id', authenticateToken, (req, res) => {
    let user_id = req.params.id;
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id'});
    }
    try {
        db.query('DELETE FROM users WHERE id = ?', user_id, (err, result, fields) => {
            if(err) {
                console.error('Error deleteing item:', err);
                res.status(500).json({ message: 'Internal Server Error'});
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        console.error('Error loading user:', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

router.get('/', (req, res) => {
    res.json({ message: 'New Route in API/USER/DISPLAY Route'});
});

router.get('/api/user/display', (req, res) => {
    res.json({ message: 'Public API'});
});


module.exports = router;