const express = require('express');
const axios = require('axios');
const {
    mustLogin,
    checkLogin,
    login,
    logout,
    renderIndex,
    renderNotAuths,
    renderAdminPage,
    renderApplications,
    renderDebates,
    renderEduPosts,
    renderNotices,
    renderOnePost,
    renderOneApplication,
    renderPledges,
    renderOnePledge,
} = require('./controller');

const router = express.Router();

router.get('/', checkLogin, renderIndex);

router.get('/register1', checkLogin, function (req, res) {
    res.render('register1');
});

router.get('/register2', checkLogin, function (req, res) {
    res.render('register2');
});

router.get('/login', checkLogin, function (req, res) {
    res.render('login');
});

router.post('/login', login);

router.get('/teacher', mustLogin, renderNotAuths);
router.get('/admin', mustLogin, renderAdminPage);

router.get('/logout', checkLogin, logout);

router.get('/apply', mustLogin, renderApplications);
router.route('/apply/create').get(mustLogin, (req, res) => {
    if (req.user.role !== 'student') {
        return res.send('권한이 없습니다');
    }
    return res.render('createPost', {category: 'apply'});
});
router.get('/apply/:id', mustLogin, renderOneApplication);

router.get('/pledge', mustLogin, renderPledges);
router.get('/pledge/create', mustLogin, (req, res) => {
    if (req.user.role !== 'candidate') {
        return res.send('권한이 없습니다');
    }
    return res.render('createPost', {category: 'pledge'});
});
router.get('/pledge/:id', mustLogin, renderOnePledge);

router.get('/evaluation', mustLogin, async (req, res) => {
    const response = await axios
        .get(`${backend}/api/evaluation`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        })
        .catch((e) => {
            console.log(e.message);
            return res.send('invalid input');
        });
    console.log(response.data);

    res.send(`reponse: ${response.data}`);
});

router.get('/debate', mustLogin, renderDebates);
router.get('/debate/create', mustLogin, (req, res) =>
    res.render('createPost', {category: 'debate'})
);
router.get('/debate/:id', mustLogin, renderOnePost);

router.get('/edu', mustLogin, renderEduPosts);
router.get('/edu/create', mustLogin, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.send('관리자 권한이 필요합니다.');
    }
    res.render('createPost', {category: 'edu'});
});

router.get('/notice', mustLogin, renderNotices);
router.get('/notice/create', mustLogin, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.send('관리자 권한이 필요합니다.');
    }
    res.render('createPost', {category: 'notice'});
});

router.get('/notice/:id', mustLogin, renderOnePost);

module.exports = router;
