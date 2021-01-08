import '@babel/polyfill';

import Register1 from './register1';
import Register2 from './register2';

if (document.querySelector('#register1-form')) {
    new Register1();
}

if (document.querySelector('#register2-form')) {
    new Register2();
}
