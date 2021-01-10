const express = require('express');
const axios = require('axios');
const {
    mustLogin,
    checkLogin,
    login,
    logout,
    renderNotAuths,
    renderApplications,
    renderDebates,
} = require('./controller');

const router = express.Router();

router.get('/', checkLogin, function (req, res) {
    res.render('index');
});

router.get('/register1', function (req, res) {
    res.render('register1');
});

router.get('/register2', function (req, res) {
    res.render('register2');
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', login);

router.get('/teacher', mustLogin, renderNotAuths);

router.get('/logout', logout);

router.get('/application', mustLogin, renderApplications);
router.route('/application/create').get(mustLogin, (req, res) => {
    if (req.user.role !== 'student') {
        return res.send('권한이 없습니다');
    }

    return res.render('createApplication');
});

router.get('/pledge', mustLogin, async (req, res) => {
    const response = await axios
        .get(`${backend}/api/pledge`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        })
        .catch((e) => {
            console.log(e.message);
            return res.send('invalid input');
        });
    console.log(response.data);

    res.send(`reponse: ${response.data.pledges}`);
});

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

router.get('/edu', mustLogin, async (req, res) => {
    const response = await axios
        .get(`${backend}/api/edu`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        })
        .catch((e) => {
            console.log(e.message);
            return res.send('invalid input');
        });
    console.log(response.data);

    res.send(`reponse: ${response.data.eduPosts}`);
});

module.exports = router;
