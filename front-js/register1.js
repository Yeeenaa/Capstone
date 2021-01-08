import axios from 'axios';

const backend =
    'http://ec2-54-180-120-197.ap-northeast-2.compute.amazonaws.com';

export default class Register1 {
    constructor() {
        this.name = document.querySelector('#name');
        this.email = document.querySelector('#email');
        this.password = document.querySelector('#password');
        this.school = document.querySelector('#school');
        this.schoolCode = document.querySelector('#schoolCode');
        this.schoolClass = document.querySelector('#schoolClass');
        this.button = document.querySelector('#button');
        this.events();
    }

    events() {
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            axios
                .post(`${backend}/api/auth/register`, {
                    name: this.name.value,
                    email: this.email.value,
                    password: this.password.value,
                    school: this.school.value,
                    schoolCode: this.schoolCode.value,
                    schoolClass: this.schoolClass.value,
                })
                .then((response) => {
                    alert('회원가입 성공');
                    window.location.replace('/login');
                })
                .catch((error) => {
                    alert('입력값을 확인하세요');
                });
        });
    }
}
