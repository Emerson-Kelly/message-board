import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { messageRouter } from './routes/new.js';
import { indexRouter } from './routes/index.js';
import { detailsRouter } from './routes/details.js';

const app = express();

// Emulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/', messageRouter);
app.use('/', detailsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
