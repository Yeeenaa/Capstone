import axios from 'axios';

const backend =
    'http://ec2-54-180-120-197.ap-northeast-2.compute.amazonaws.com';

export default class Apply {
    constructor() {
        this.title = document.querySelector('#title');
        this.applyButton = document.querySelector('#applyButton');
        this.permitButton = document.querySelector('#permitButton');
        this.config = {
            headers: {
                authorization: 'Bearer ' + document.cookie.split('jwt: ')[1],
            },
        };

        this.events();
    }

    events() {
        this.applyButton.addEventListener('click', (e) => {
            e.preventDefault();
            axios
                .post(
                    `${backend}/api/apply`,
                    {
                        title: this.name.value,
                    },
                    this.config
                )
                .then((response) => {
                    alert('입후보 신청 성공');
                    window.location.replace('/login');
                })
                .catch((error) => {
                    alert('입후보 신청 성공');
                });
        });

        this.permitButton.addEventListener('click', (e) => {
            e.preventDefault();
            axios
                .post(
                    `${backend}/api/apply/${this.permitButton.value}`,
                    {
                        permission: true,
                    },
                    this.config
                )
                .then((response) => {
                    alert('후보자 승인');
                    window.location.replace('/login');
                })
                .catch((error) => {
                    alert('후보자 승인 실패');
                });
        });
    }
}
