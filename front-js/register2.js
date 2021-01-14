import axios from 'axios';
import {backend} from './main';

export default class Register2 {
    constructor() {
        this.name = document.querySelector('#name');
        this.email = document.querySelector('#email');
        this.password = document.querySelector('#password');
        this.school = document.querySelector('#school');
        this.schoolClass = document.querySelector('#schoolClass');
        this.photo = document.querySelector('#photo');
        this.button = document.querySelector('#button');
        this.events();
    }

    events() {
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            const form = new FormData();
            form.append('name', this.name.value);
            form.append('email', this.email.value);
            form.append('password', this.password.value);
            form.append('school', this.school.value);
            form.append('schoolClass', this.schoolClass.value);
            form.append('photo', photo.files[0]);

            axios
                .patch(`${backend}/api/auth/register`, form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((response) => {
                    alert('회원가입 성공');
                    window.location.replace('/login');
                })
                .catch((error) => {
                    console.log(error.message);
                    alert('입력값을 확인하세요');
                });
        });
    }
}
