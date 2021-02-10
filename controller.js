const axios = require('axios');
const backend = 'https://dcrasee.tk';
// const backend = 'http://localhost:4000';

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

exports.renderIndex = async function (req, res) {
    if (!req.user) {
        return res.render('index', {
            notices: [],
            debates: [],
            eduPosts: [],
        });
    }

    try {
        let notices = axios.get(`${backend}/api/post?page=1&category=notice`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        });

        let debates = axios.get(`${backend}/api/post?page=1&category=debate`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        });

        [notices, debates] = await Promise.all([notices, debates]);

        notices = notices.data.posts.splice(0, 10);
        debates = debates.data.posts.splice(0, 10);

        // console.log(debates);
        res.render('index', {
            notices,
            debates,
        });
    } catch (e) {
        console.log(e);
        res.send(e.message);
    }
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

exports.renderAdminPage = (req, res) => {
    axios
        .get(`${backend}/api/pledge`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        })
        .then((response) => {
            let canVote = false;
            if (response.data.pledges[0]) {
                canVote = response.data.pledges[0].canVote;
            }
            let president = '미선출';
            const candidate = response.data.pledges.map((p) => {
                if (p.candidate.role === 'president') {
                    president = p.candidate.name;
                }
                return p.candidate.name;
            });
            res.render('admin', {canVote, candidate, president});
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
            res.render('applications', {
                applications: response.data.applications,
            });
        })
        .catch((e) => {
            console.log(e.message);
            return res.send('invalid input');
        });
};

exports.renderOneApplication = (req, res) => {
    axios
        .get(`${backend}/api/apply/${req.params.id}`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        })
        .then((response) => {
            res.render('viewApply', {post: response.data.application});
        })
        .catch((e) => {
            console.log(e.message);
            return res.send('invalid input');
        });
};

exports.renderPledges = (req, res) => {
    axios
        .get(`${backend}/api/pledge`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        })
        .then((response) => {
            res.render('pledges', {
                pledges: response.data.pledges,
            });
        })
        .catch((e) => {
            console.log(e.message);
            return res.send('invalid input');
        });
};

exports.renderOnePledge = (req, res) => {
    axios
        .get(`${backend}/api/pledge/${req.params.id}`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        })
        .then((response) => {
            res.render('viewPledge', {pledge: response.data.pledge});
        })
        .catch((e) => {
            console.log(e.message);
            return res.send('invalid input');
        });
};

exports.renderHearings = (req, res) => {
    axios
        .get(`${backend}/api/post?page=1&category=hearing`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        })
        .then((response) => {
            res.render('posts', {
                posts: response.data.posts,
                category: 'hearing',
            });
        })
        .catch((e) => {
            console.log(e.message);
            return res.send('invalid input');
        });
};

exports.renderEvaluations = (req, res) => {
    axios
        .get(`${backend}/api/post?page=1&category=evaluation`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        })
        .then((response) => {
            res.render('posts', {
                posts: response.data.posts,
                category: 'evaluation',
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
            console.log(e.message);
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

exports.renderNotices = (req, res) => {
    axios
        .get(`${backend}/api/post?page=1&category=notice`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        })
        .then((response) => {
            res.render('posts', {
                posts: response.data.posts,
                category: 'notice',
            });
        })
        .catch((e) => {
            console.log(e);
            return res.send('invalid input');
        });
};

exports.renderOnePost = (req, res) => {
    axios
        .get(`${backend}/api/post/${req.params.id}`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        })
        .then((response) => {
            res.render('viewPost', {post: response.data.post});
        })
        .catch((e) => {
            console.log(e.message);
            return res.send('invalid input');
        });
};

exports.renderOneEvaluation = async (req, res) => {
    const rates = await axios.get(
        `${backend}/api/evaluation/${req.params.id}`,
        {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        }
    );

    console.log(rates.data);
    axios
        .get(`${backend}/api/post/${req.params.id}`, {
            headers: {authorization: `Bearer ${req.cookies.jwt}`},
        })
        .then((response) => {
            res.render('viewEvaluation', {
                post: response.data.post,
                rates: rates.data.rates,
            });
        })
        .catch((e) => {
            console.log(e.message);
            return res.send('invalid input');
        });
};
