const { Router } = require('express');
const { isGuest, hasUser } = require('../middlewares/guards');
const { homeGet } = require('../controllers/home');
const { authRegisterGet, authRegisterPost, authLoginGet, authLoginPost, authLogout } = require('../controllers/auth');
const { errorGet } = require('../controllers/error');
const { createGet, createPost } = require('../controllers/create');
const { catalogGet } = require('../controllers/catalog');
const { detailsGet } = require('../controllers/details');
const { editGet, editPost } = require('../controllers/edit');
const { buyGet } = require('../controllers/buy');
const { searchGet, searchPost } = require('../controllers/search');


const router = Router();

router.get('/', homeGet);
router.get('/catalog',catalogGet);
router.get('/catalog/:id/details',detailsGet);
router.get('/catalog/:id/edit',hasUser(),editGet);
router.post('/catalog/:id/edit',hasUser(),editPost);
router.get('/catalog/:id/buy',hasUser(),buyGet)
router.get('/auth/register', isGuest(), authRegisterGet);
router.post('/auth/register', isGuest(), authRegisterPost);
router.get('/auth/login', isGuest(), authLoginGet);
router.post('/auth/login', isGuest(), authLoginPost);
router.get('/auth/logout', hasUser(), authLogout);
router.get('/create',hasUser(),createGet);
router.post('/create',hasUser(),createPost);
router.get('/search',searchGet);
router.post('/search',searchPost)

router.get('*', errorGet);

module.exports = { router };