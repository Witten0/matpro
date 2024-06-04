const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

mongoose.connect('mongodb://localhost:27017/skoleprojekt', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String // 'teacher' or 'student'
});

const User = mongoose.model('User', UserSchema);

app.use(express.json());

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user._id, role: user.role }, 'secret');
        res.json({ success: true, role: user.role, token });
    } else {
        res.json({ success: false });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
