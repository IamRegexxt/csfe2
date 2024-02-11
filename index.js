const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/', userRoutes);



app.get('/', (req, res) => {
    res.json({ message: 'New Route in API/USER/DISPLAY Route' });
});

app.get('/api/user/display', (req, res) => {
    res.json({ message: 'Public API' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//user routes