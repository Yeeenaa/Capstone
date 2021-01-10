const express = require('express');
const axios = require('axios');
const {
    mustLogin,
    checkLogin,
    login,
    getNotAuthList,
    logout,
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

router.get('/teacher', mustLogin, getNotAuthList);

router.get('/logout', logout);

router.get('/application', mustLogin, async (req, res) => {
    const response = await axios
        .get(`${backend}/api/apply`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        })
        .catch((e) => {
            console.log(e.message);
            return res.send('invalid input');
        });
    console.log(response.data);

    res.send(`reponse: ${response.data.aplications}`);
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

router.get('/debate', mustLogin, async (req, res) => {
    const response = await axios
        .get(`${backend}/api/question`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        })
        .catch((e) => {
            console.log(e.message);
            return res.send('invalid input');
        });
    console.log(response.data);

    res.send(`reponse: ${response.data.questions}`);
});

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
