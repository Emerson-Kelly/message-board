import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { messageRouter } from './routes/new.js';
import { indexRouter } from './routes/index.js';

const app = express();

// Emulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/new', messageRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

