import '@babel/polyfill';

import Register1 from './register1';
import Register2 from './register2';
import UserAuth from './userAuth';
import CreatePost from './createPost';
import LoadPosts from './loadPosts';

export const backend =
    'http://ec2-15-165-236-62.ap-northeast-2.compute.amazonaws.com';

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
