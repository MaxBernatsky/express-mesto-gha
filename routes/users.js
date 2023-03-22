const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUserProfile,
  updateUserAvatar,
  createUser,
  login,
} = require('../controllers/users');

router.post('/signup', createUser);

router.post('/signin', login);

router.use(auth);

router.get('/', getUsers);

router.get('/:userId', getUserById);

router.get('/me', getCurrentUser);

router.patch('/me', updateUserProfile);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
