import express from 'express'
import { addMessageController, deleteMessageController, getAllMessaegesController } from '../controllers/messageController.js';

const router = express.Router();

// Send message
router.post('/send-message', addMessageController);

// Get all messages
router.get('/messages', getAllMessaegesController);

// Delete message
router.delete('/delete-message/:id', deleteMessageController);

export default router;