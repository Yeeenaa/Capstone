import axios from 'axios';
import {backend} from './main';

export default class ViewEvaluation {
    constructor() {
        this.evalForm = document.querySelector('#evalForm');
        this.ratings = document.querySelectorAll('.rating');
        this.events();
    }

    events() {
        this.evalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let rate;
            [...this.ratings].forEach((rating) => {
                if (rating.checked) {
                    rate = rating.value;
                }
            });

            axios
                .post(
                    `${backend}/api/evaluation/${postId}`,
                    {rating: rate},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((response) => {
                    location.reload(true);
                })
                .catch((e) => {
                    alert('이미 평가했습니다');
                });
        });
    }
}
