import express from 'express';
const router = express.Router();

let messageId = 0;
const messages = new Map();

router.get('/', (req, res) => {
  res.render('pages/index', { messages: Array.from(messages.values()) });
});

router.get('/new', (req, res) => {
    res.render('pages/new');
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