const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/', router);

app.listen(3000, () => console.log(`Server is running on 3000`));
