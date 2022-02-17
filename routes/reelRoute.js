const express = require('express');
const reelController = require('../controllers/reelController');
const {
  authenticateUser,
  authenticateAdminOrUser,
} = require('../middlewares/authenticate');
const router = express.Router();

router.get('/reels/all', authenticateUser, reelController.getAllReels);
router.get(
  '/reels/user/:userId',
  authenticateUser,
  reelController.getUserReels
);
router.post('/reels/', authenticateUser, reelController.createReel);
router.patch('/reels/:id', authenticateUser, reelController.updateReel);
router.delete('/reels/:id', authenticateUser, reelController.deleteReel);

module.exports = router;
