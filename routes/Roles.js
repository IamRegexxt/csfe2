const express = require('express');
const db = require('../config/db.config');
const bcrypt = require('bcrypt');
const authenticateToken = require('../config/auth.config');
const router = express.Router();

//CREATE ROLE
router.post('/role', authenticateToken, async (req, res) => {
    const {role_code, role_name} = req.body;
    if(!role_code || !role_name) {
        return res.status(400).send({ error: true, message: 'Please provide proper role_code and role_name'});
    }
    try{
        db.query('INSERT INTO roles (role_code, role_name) VALUES (?, ?)', [role_code, role_name], (err, result, fields) => {
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
//GET ALL ROLES
router.get('/roles', authenticateToken, (req, res) => {
    try {
        db.query('SELECT id, role_code, role_name FROM roles', (err, result) => {
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

//GET ONE ROLE
router.get('/role/:id', authenticateToken, (req, res) => {
    let role_id = req.params.id;
    if (!role_id) {
        return res.status(400).send({ error: true, message: 'Please provide role_id'});
    }
    try {
        db.query('SELECT id, role_code, role_name FROM roles WHERE id = ?', role_id, (err, result) => {
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

//UPDATE ROLE
router.put('/role/:id', authenticateToken, async (req, res) => {
    let role_id = req.params.id;
    const {role_code, role_name} = req.body;
    if(!role_id || !role_code || !role_name) {
        return res.status(400).send({ error: user, message: 'Please provide proper role_code and role_name'});
    }
    try{
        db.query('UPDATE roles SET role_code = ?, role_name = ? WHERE id = ?', [role_code, role_name, role_id], (err, result, fields) => {
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

//DELETE ROLE
router.delete('/role/:id', authenticateToken, (req, res) => {
    let role_id = req.params.id;
    if (!role_id) {
        return res.status(400).send({ error: true, message: 'Please provide correct role_id'});
    }
    try {
        db.query('DELETE FROM roles WHERE id = ?', role_id, (err, result, fields) => {
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