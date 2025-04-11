import express from 'express';
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('new');
});



export { router as messageRouter };