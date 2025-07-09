import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Register
router.post('/register', [
    body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
        }

        const { name, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
        return res.status(400).json({
            success: false,
            message: 'User with this email already exists',
        });
        }

        // Create user
        const user = await User.create({
        name,
        email,
        password,
        });

        // Generate token
        const token = generateToken(user.id);

        res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            provider: user.provider,
            isVerified: user.isVerified,
        },
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
        success: false,
        message: 'Server error during registration',
        });
    }
});

// Login
router.post('/login', [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').exists().withMessage('Password is required'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
        }

        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials',
        });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials',
        });
        }

        // Update last login
        await user.update({ lastLogin: new Date() });

        // Generate token
        const token = generateToken(user.id);

        res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            provider: user.provider,
            isVerified: user.isVerified,
        },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
        success: false,
        message: 'Server error during login',
        });
    }
});

// Get current user
router.get('/me', protect, async (req, res) => {
    res.json({
        success: true,
        user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        provider: req.user.provider,
        isVerified: req.user.isVerified,
        lastLogin: req.user.lastLogin,
        },
    });
});

// GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', passport.authenticate('github', { session: false }), (req, res) => {
    const token = generateToken(req.user.id);
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
});

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    const token = generateToken(req.user.id);
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
});

export default router;