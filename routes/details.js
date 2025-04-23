import express from 'express';
import { getUserDetails } from '../db/queries.js'; // Assuming this function exists

const router = express.Router();

router.get('/details/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res.status(400).send('Invalid user ID');
  }

  try {
    const userDetails = await getUserDetails(userId);

    if (!userDetails.length) {
      return res.status(404).send('User not found');
    }

    res.render('pages/details', { message: userDetails[0] });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).send('Server error');
  }
});

export { router as detailsRouter };
