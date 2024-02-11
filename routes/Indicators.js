const express = require('express');
const db = require('../config/db.config');
const bcrypt = require('bcrypt');
const authenticateToken = require('../config/auth.config');
const router = express.Router();

//CREATE INDICATOR
router.post('/indicator', authenticateToken, async (req, res) => {
    const {description, user_id, evalutation_id} = req.body;
    if(!description || !user_id || !evalutation_id) {
        return res.status(400).send({ error: true, message: 'Please provide proper description, user_id and evalutation_id'});
    }
    try{
        db.query('INSERT INTO indicators (description, user_id, evalutation_id) VALUES (?, ?, ?)', [description, user_id, evalutation_id], (err, result, fields) => {
            if (err) {
                console.error('Error creating item:', err);
                res.status(500).json({ message: 'Internal Server Error'});
            }else {
                res.status(200).json(result);
            }
        })
    }catch (error) {
        console.error('Error creating role:', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
})
//GET ALL INDICATORS
router.get('/indicators', authenticateToken, (req, res) => {
    try {
        db.query('SELECT id, description, user_id, evalutation_id FROM indicators', (err, result) => {
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

//GET ONE INDICATORS
router.get('/indicator/:id', authenticateToken, (req, res) => {
    let indicator_id = req.params.id;
    if (!indicator_id) {
        return res.status(400).send({ error: true, message: 'Please provide role_id'});
    }
    try {
        db.query('SELECT id, description, user_id, evalutation_id FROM indicators WHERE id = ?', indicator_id, (err, result) => {
            if (err) {
                console.error('Error fetching items:', err);
                res.status(500).json({ message: 'Internal Server Error'});
            } else {
                res.status(200).json(result);
            }
        })
    }catch (error) {
        console.error('Error loading role:', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

//UPDATE INDICATORS
router.put('/indicator/:id', authenticateToken, async (req, res) => {
    let indicator_id = req.params.id;
    const {description, user_id, evalutation_id} = req.body;
    if(!indicator_id || !description || !user_id || !evalutation_id) {
        return res.status(400).send({ error: user, message: 'Please provide proper role_code and role_name'});
    }
    try{
        db.query('UPDATE indicators SET description = ?, user_id = ?, evalutation_id = ?  WHERE id = ?', [description, user_id, evalutation_id, indicator_id], (err, result, fields) => {
            if (err) {
                console.error('Error updating item:', err);
                res.status(500).json({ message: 'Internal Server Error'});
            }else {
                res.status(200).json(result);
            }
        })
    }catch (error) {
        console.error('Error loading role:', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

//DELETE INDICATORS
router.delete('/indicator/:id', authenticateToken, (req, res) => {
    let indicator_id = req.params.id;
    if (!indicator_id) {
        return res.status(400).send({ error: true, message: 'Please provide correct role_id'});
    }
    try {
        db.query('DELETE FROM indicators WHERE id = ?', indicator_id, (err, result, fields) => {
            if(err) {
                console.error('Error deleteing item:', err);
                res.status(500).json({ message: 'Internal Server Error'});
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        console.error('Error loading role:', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
})

module.exports = router;