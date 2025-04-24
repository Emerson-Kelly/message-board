import express from 'express';
import * as db from "../db/queries.js";

const router = express.Router();

//let messageId = 0;
//const messages = new Map();
let messages;

router.get('/', async (req, res) => {
  try {
    const messages = await db.getAllUsers();
    console.log("getAllUsers: ", messages);
    res.render('pages/index', { messages });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Server error");
  }
});


router.post('/new', async (req, res) => {
  const { nameInput, messageInput } = req.body;

  try {
    await db.addMessage({ name: nameInput, message: messageInput });
    res.redirect('/');
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).send("Server error");
  }
});


export { messages };
export { router as indexRouter };