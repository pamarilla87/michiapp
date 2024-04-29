import express from 'express';
import  { User }  from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password, firstName, lastName, address, phoneNumber } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log("Username already taken");
            return res.status(409).send('Username already taken');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, firstName, lastName, address, phoneNumber });
        await user.save();
        console.log("User registered successfully");
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send('Error registering user');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            console.log("Authentication failed, user not found or password incorrect");
            return res.status(401).send('Combinación de usuario y contraseña inválidos');
        }
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        console.log("Logged in successfully, token issued");
        res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.error("Error during authentication:", error);
        res.status(500).send('Error during authentication');
    }
});

// Applying authentication middleware to protected routes
router.get('/view-profile', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        console.log('Buscando usuario:', user ? user.username : 'Not Found');  // Correct log
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('Error fetching user profile');
    }
});

router.post('/update-profile', authenticate, async (req, res) => {
    try {
        const { firstName, lastName, address, phoneNumber } = req.body;
        const user = await User.findByIdAndUpdate(req.userId, { firstName, lastName, address, phoneNumber }, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).send('Error updating user profile');
    }
});

export default router;