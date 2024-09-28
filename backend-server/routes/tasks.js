const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the db.js file

// Get all tasks
router.get('/tasks', (req, res) => {
    const query = 'SELECT * FROM tasks';
    
    db.query(query, [], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

// Get a task by ID
router.get('/tasks/:id', (req, res) => {
    const query = 'SELECT * FROM tasks WHERE id = ?';
    
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results[0]);
    });
});

// Create a new task
router.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    const query = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
    
    db.query(query, [title, description], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json({ id: result.insertId, title, description });
    });
});

// Delete a task
router.delete('/tasks/:id', (req, res) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json({ message: 'Task deleted successfully' });
    });
});

module.exports = router;
