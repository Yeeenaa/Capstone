import axios from 'axios';

const backend =
    'http://ec2-54-180-120-197.ap-northeast-2.compute.amazonaws.com';

export default class Login {
    constructor() {
        this.email = document.querySelector('#login-email');
        this.password = document.querySelector('#login-password');
        this.loginBtn = document.querySelector('#logoutBtn');
        this.events();
    }

    events() {
        this.loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const token = document.cookie.split('jwt=')[1];
            axios
                .get(`${backend}/api/auth/logout`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    alert(response.data);
                    window.location.replace('/');
                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                });
        });
    }
}
