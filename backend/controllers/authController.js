const User = require('../models/user');


let users = [];

exports.signup = (req, res) => {
    const { username, password } = req.body;
    
    // Check if username is already taken
    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ error: 'Username already taken' });
    }

    // Create a new user
    const newUser = new User(username, password);
    users.push(newUser);
    
    res.status(201).json({ message: 'User created successfully', user: newUser });
};

// Login controller method
exports.login = (req, res) => {
    const { username, password } = req.body;

    // Find the user in the database
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful', user });
};
