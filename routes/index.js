import express from 'express';
const router = express.Router();

const messages = [
];

router.get('/', (req, res) => {
  res.render('pages/index', { messages });
});

router.get('/new', (req, res) => {
    res.render('pages/new');
});

router.post('/new', (req, res) => {
 const { nameInput, messageInput } = req.body;
  console.log("Form Data:", req.body);
  messages.push({
    text: messageInput,
    user: nameInput,
    added: new Date()
  });
  res.redirect('/');
});

export { router as indexRouter };
