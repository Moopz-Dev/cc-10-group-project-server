const express = require('express');
const postController = require('../controllers/postController');
const {
    authenticateUser,
    authenticateAdminOrUser,
} = require('../middlewares/authenticate');
const router = express.Router();

router.get('/posts/all', authenticateUser, postController.getAllPosts);
router.get(
    '/posts/user/:userId',
    authenticateUser,
    postController.getUserPosts
);
router.post('/posts/', authenticateUser, postController.createPost);
router.patch('/posts/:id', authenticateUser, postController.updatePost);
router.delete('/posts/:id', authenticateUser, postController.deletePost);

module.exports = router;
