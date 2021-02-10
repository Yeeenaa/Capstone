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
    renderHearings,
    renderDebates,
    renderEduPosts,
    renderNotices,
    renderOnePost,
    renderOneApplication,
    renderPledges,
    renderOnePledge,
    renderEvaluations,
    renderOneEvaluation,
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

router.get('/evaluation', checkLogin, renderEvaluations);
router.get('/evaluation/create', mustLogin, (req, res) => {
    // if (req.user.role !== 'admin') {
    //     return res.send('관리자 권한이 필요합니다.');
    // }
    res.render('createPost', {category: 'evaluation'});
});
router.get('/evaluation/:id', mustLogin, renderOneEvaluation);

router.get('/hearing', mustLogin, renderHearings);
router.get('/hearing/create', mustLogin, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.send('관리자 권한이 필요합니다.');
    }
    res.render('createPost', {category: 'hearing'});
});
router.get('/hearing/:id', mustLogin, renderOnePost);

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
router.get('/edu/:id', mustLogin, renderOnePost);

router.get('/notice', mustLogin, renderNotices);
router.get('/notice/create', mustLogin, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.send('관리자 권한이 필요합니다.');
    }
    res.render('createPost', {category: 'notice'});
});

router.get('/notice/:id', mustLogin, renderOnePost);

router.get('/brand', checkLogin, (req, res) => {
    res.render('brand');
});

module.exports = router;
