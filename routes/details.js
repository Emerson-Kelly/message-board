import express from 'express';
import { messages } from './index.js';

const router = express.Router();


router.get('/details/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const message = messages.get(id);
  
    if (!message) {
      return res.status(404).send('Message not found');
    }
  
    res.render('pages/details', { message });
  });
  

export { router as detailsRouter };