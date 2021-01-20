import '@babel/polyfill';

import Register1 from './register1';
import Register2 from './register2';
import UserAuth from './userAuth';
import CreatePost from './createPost';
import LoadPosts from './loadPosts';
import ViewPost from './viewPost';
import ViewApply from './viewApply';
import ViewPledge from './viewPledge';
import Admin from './admin';

// export const backend = 'https://dcrasee.tk';
export const backend = 'http://localhost:4000';

if (document.querySelector('#register1-form')) {
    // register1.ejs
    new Register1();
}

if (document.querySelector('#register2-form')) {
    // register2.ejs
    new Register2();
}

if (document.querySelector('.permitButton')) {
    // notAuthList.ejs
    new UserAuth();
}

if (document.querySelector('#postTable')) {
    // createPost.ejs
    new CreatePost();
}

if (document.querySelector('#write-wrap > input[type=text]')) {
    new LoadPosts();
}

if (document.querySelector('#commentForm')) {
    new ViewPost();
}

if (document.querySelector('.candiate-permitBtn')) {
    new ViewApply();
}
if (document.querySelector('#voteBtn')) {
    new ViewPledge();
}

if (document.querySelector('#admin-table')) {
    new Admin();
}
