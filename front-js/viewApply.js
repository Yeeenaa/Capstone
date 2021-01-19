import axios from 'axios';
import {backend} from './main';

export default class ViewApply {
    constructor() {
        this.permitBtn = document.querySelector('.candiate-permitBtn');
        this.events();
    }

    events() {
        this.permitBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const result = confirm('입후보를 승인합니까?');
            if (result) {
                axios
                    .post(
                        `${backend}/api/apply/${userId}`,
                        {
                            permission: 'true',
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    .then((response) => {
                        location.replace('/apply');
                    })
                    .catch((e) => {
                        alert('입력값을 확인하세요');
                    });
            }
        });
    }
}
