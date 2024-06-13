const {Router} = require('express');
const { homeGet } = require('../controllers/home');
const { authRegisterGet, authRegisterPost, authLoginGet, authLoginPost, authLogout } = require('../controllers/auth');
const { catalogGet } = require('../controllers/catalog');
const { createGet, createPost } = require('../controllers/create');
const { detailsGet } = require('../controllers/details');
const { editGet, editPost } = require('../controllers/edit');
const { deleteGet } = require('../controllers/delete');
const { hasUser, isGuest } = require('../middlewares/guards');
const { errorGet } = require('../controllers/error');
const { searchGet, searchPost } = require('../controllers/search');
const { voteGet } = require('../controllers/vote');

const router = Router();

router.get('/',homeGet);
router.get('/catalog',catalogGet);
router.get('/create',hasUser(),createGet);
router.post('/create',hasUser(),createPost);
router.get('/catalog/:id/details',detailsGet);
router.get('/catalog/:id/edit',hasUser(),editGet);
router.post('/catalog/:id/edit',hasUser(),editPost);
router.get('/catalog/:id/delete',hasUser(),deleteGet);
router.get('/catalog/:id/vote',hasUser(),voteGet)
router.get('/auth/register',isGuest(),authRegisterGet);
router.post('/auth/register',isGuest(),authRegisterPost);
router.get('/auth/login',isGuest(),authLoginGet);
router.post('/auth/login',isGuest(),authLoginPost);
router.get('/auth/logout',hasUser(),authLogout);
router.get('/search',searchGet);
router.post('/search',searchPost);
router.get('*',errorGet);

module.exports= {router};