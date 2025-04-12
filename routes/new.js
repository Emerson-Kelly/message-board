import express from 'express';
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('pages/new');
});


export { router as messageRouter };