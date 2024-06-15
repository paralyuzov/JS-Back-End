const {Router} = require('express');
const { homeGet } = require('../controllers/home');
const { authRegisterGet, authRegisterPost, authLoginGet, authLoginPost, authLogout } = require('../controllers/auth');
const { isGuest, hasUser } = require('../middlewares/guards');
const { createGet, createPost } = require('../controllers/create');
const { catalogGet } = require('../controllers/catalog');
const { detailsGet } = require('../controllers/details');
const { signUpGet } = require('../controllers/signup');
const { editGet, editPost } = require('../controllers/edit');
const { deleteGet } = require('../controllers/delete');
const { errorGet } = require('../controllers/error');
const { profileGet } = require('../controllers/profile');


const router = Router();

router.get('/',homeGet);
router.get('/create',createGet);
router.post('/create',createPost);
router.get('/catalog',catalogGet);
router.get('/catalog/:id/details',detailsGet);
router.get('/catalog/:id/signup',signUpGet);
router.get('/catalog/:id/edit',editGet);
router.post('/catalog/:id/edit',editPost);
router.get('/catalog/:id/delete',deleteGet)
router.get('/auth/register',isGuest(),authRegisterGet);
router.post('/auth/register',isGuest(),authRegisterPost);
router.get('/auth/login',isGuest(),authLoginGet);
router.post('/auth/login',isGuest(),authLoginPost);
router.get('/auth/logout',hasUser(),authLogout);
router.get('/profile',profileGet)
router.get('*',errorGet)

module.exports= {router};