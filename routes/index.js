import express from 'express';
const router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

router.get('/', (req, res) => {
  res.render('index', { messages });
});

router.get('/new', (req, res) => {
  res.render('new');
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
