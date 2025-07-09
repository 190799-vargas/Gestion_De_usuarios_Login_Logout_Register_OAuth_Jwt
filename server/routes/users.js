import express from 'express';
import { body, validationResult } from 'express-validator';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get user profile
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password', 'verificationToken', 'resetPasswordToken'] }
        });

        res.json({
        success: true,
        user,
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({
        success: false,
        message: 'Server error',
        });
    }
});

// Update user profile
router.put('/profile', [
    protect,
    body('name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('email').optional().isEmail().normalizeEmail().withMessage('Please provide a valid email'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
        }

        const { name, email } = req.body;
        const updates = {};

        if (name) updates.name = name;
        if (email) updates.email = email;

        const user = await User.findByPk(req.user.id);
        await user.update(updates);

        res.json({
        success: true,
        message: 'Profile updated successfully',
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
        console.error('Profile update error:', error);
        res.status(500).json({
        success: false,
        message: 'Server error',
        });
    }
});

// Get all users (admin only for demo)
router.get('/all', protect, async (req, res) => {
    try {
        const users = await User.findAll({
        attributes: { exclude: ['password', 'verificationToken', 'resetPasswordToken'] },
        order: [['createdAt', 'DESC']],
        });

        res.json({
        success: true,
        users,
        });
    } catch (error) {
        console.error('Users fetch error:', error);
        res.status(500).json({
        success: false,
        message: 'Server error',
        });
    }
});

export default router;