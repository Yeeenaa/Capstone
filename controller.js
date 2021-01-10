const axios = require('axios');
const backend =
    'http://ec2-54-180-120-197.ap-northeast-2.compute.amazonaws.com';

exports.checkLogin = async (req, res, next) => {
    if (req.cookies.jwt && req.cookies.jwt !== 'hi') {
        const token = req.cookies.jwt;

        const response = await axios.get(`${backend}/api/user`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        req.user = response.data.user;
        res.locals.token = req.cookies.jwt;
        res.locals.user = req.user;
        return next();
    }
    res.locals.user = false;
    next();
};

exports.mustLogin = async (req, res, next) => {
    if (!req.cookies.jwt || req.cookies.jwt === 'hi') {
        return res.send('error: must login');
    }

    const token = req.cookies.jwt;

    const response = await axios.get(`${backend}/api/user`, {
        headers: {Authorization: `Bearer ${token}`},
    });

    req.user = response.data.user;
    res.locals.token = req.cookies.jwt;
    res.locals.user = req.user;
    next();
};

exports.login = (req, res) => {
    const {email, password} = req.body;

    axios
        .post(`${backend}/api/auth/login`, {
            email,
            password,
        })
        .then((response) => {
            const cookieOptions = {
                expires: new Date(Date.now() + 7 * 24 * 60 * 1000),
                httpOnly: true,
                // secure: process.env.NODE_ENV === 'production'
            };
            res.cookie('jwt', response.data.token, cookieOptions);
            res.redirect('/');
        })
        .catch((e) => {
            console.log(e.message);
            return res.send('invalid input');
        });
};

exports.logout = async (req, res) => {
    const cookieOptions = {
        expires: new Date(Date.now() + 1000),
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production'
    };

    res.cookie('jwt', 'hi', cookieOptions);
    res.redirect('/');
};
exports.renderNotAuths = (req, res) => {
    axios
        .get(`${backend}/api/auth/teacher`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        })
        .then((response) => {
            res.render('notAuthList', {students: response.data.students});
        })
        .catch((e) => {
            console.log(e.message);
            return res.send('invalid input');
        });
};

exports.renderApplications = (req, res) => {
    axios
        .get(`${backend}/api/apply`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        })
        .then((response) => {
            console.log(response.data);
            res.render('applications', {
                applications: response.data.applications,
            });
        })
        .catch((e) => {
            console.log(e.message);
            return res.send('invalid input');
        });
};

exports.renderDebates = (req, res) => {
    axios
        .get(`${backend}/api/post?page=1&category=debate`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        })
        .then((response) => {
            res.render('posts', {
                posts: response.data.posts,
                category: 'debate',
            });
        })
        .catch((e) => {
            console.log(e);
            return res.send('invalid input');
        });
};

exports.renderEduPosts = (req, res) => {
    axios
        .get(`${backend}/api/post?page=1&category=edu`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        })
        .then((response) => {
            res.render('posts', {
                posts: response.data.posts,
                category: 'edu',
            });
        })
        .catch((e) => {
            console.log(e);
            return res.send('invalid input');
        });
};
