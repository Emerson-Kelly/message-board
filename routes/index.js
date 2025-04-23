import express from 'express';
import * as db from "../db/queries.js";

const router = express.Router();

//let messageId = 0;
//const messages = new Map();
let messages;

router.get('/', async (req, res) => {
  const messages = await db.getAllUsers();
  res.render('pages/index', { messages });
});



router.post('/new', (req, res) => {
  const { nameInput, messageInput } = req.body;
  const newMessage = {
    id: messageId,
    text: messageInput,
    user: nameInput,
    added: new Date()
  };
  messages.set(messageId, newMessage);
  messageId++;
  res.redirect('/');
});

export { messages };
export { router as indexRouter };