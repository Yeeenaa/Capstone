import axios from 'axios';
import {backend} from './main';

export default class Pledge {
    constructor() {
        this.title = document.querySelector('#title');
        this.content = document.querySelector('#content');
        this.images = document.querySelector('#images');
        this.button = document.querySelector('#button');
        this.config = {
            headers: {
                authorization: 'Bearer ' + document.cookie.split('jwt: ')[1],
                'Content-Type': 'multipart/form-data',
            },
        };

        this.events();
    }

    events() {
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            const form = new FormData();
            form.append('title', this.title.value);
            form.append('content', this.content.value);
            this.images.files.forEach((file) => {
                form.append('image', file);
            });

            axios
                .post(`${backend}/api/apply`, form, this.config)
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
