const express = require('express');
const axios = require('axios');

const router = express.Router();

const checkLogin = async (req, res, next) => {
    if (req.cookies.jwt && req.cookies.jwt !== 'hi') {
        const token = req.cookies.jwt;

        const response = await axios.get(`${backend}/api/user`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        req.user = response.data.user;
        res.locals.user = req.user;
        return next();
    }
    res.locals.user = false;
    next();
};

const mustLogin = async (req, res, next) => {
    if (!req.cookies.jwt || req.cookies.jwt === 'hi') {
        return res.send('error: must login');
    }

    const token = req.cookies.jwt;

    const response = await axios.get(`${backend}/api/user`, {
        headers: {Authorization: `Bearer ${token}`},
    });

    req.user = response.data.user;
    res.locals.user = req.user;
    next();
};

const backend =
    'http://ec2-54-180-120-197.ap-northeast-2.compute.amazonaws.com';

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

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const response = await axios
        .post(`${backend}/api/auth/login`, {
            email,
            password,
        })
        .catch((e) => {
            console.log(e.message);
            return res.send('invalid input');
        });

    const cookieOptions = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 1000),
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production'
    };

    res.cookie('jwt', response.data.token, cookieOptions);
    res.redirect('/');
});

router.get('/teacher', async (req, res) => {
    const response = await axios
        .get(`${backend}/api/auth/teacher`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        })
        .catch((e) => {
            console.log(e.message);
            return res.send('invalid input');
        });

    console.log(response.data);

    res.send(`reponse: ${response.data.students}`);
});

router.get('/logout', async (req, res) => {
    const cookieOptions = {
        expires: new Date(Date.now() + 1000),
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production'
    };

    res.cookie('jwt', 'hi', cookieOptions);
    res.redirect('/');
});

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
