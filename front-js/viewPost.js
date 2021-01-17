import axios from 'axios';
import {backend} from './main';

export default class viewPost {
    constructor() {
        this.commentForm = document.querySelector('#commentForm');
        this.commentInput = document.querySelector('#commentInput');
        this.subCommentForm = document.querySelectorAll('.subCommentForm');
        this.subCommentInput = document.querySelectorAll('.subCommentInput');
        this.token = document
            .querySelector('#commentButton')
            .value.split(',AA,')[1];
        this.events();
    }

    events() {
        this.commentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const postId = window.location.pathname.split('/debate/')[1];
            axios
                .post(
                    `${backend}/api/post/${postId}`,
                    {content: this.commentInput.value},
                    {
                        headers: {Authorization: `Bearer ${this.token}`},
                    }
                )
                .then((response) => {
                    console.log(response.data);
                    location.reload(true);
                })
                .catch((e) => {
                    alert('입력값을 확인하세요');
                });
        });

        [...this.subCommentForm].forEach((subForm, i) => {
            subForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const postId = window.location.pathname.split('/debate/')[1];

                const commentId = subForm.name;

                axios
                    .post(
                        `${backend}/api/post/${postId}/comment/${commentId}`,
                        {content: this.subCommentInput[i].value},
                        {
                            headers: {Authorization: `Bearer ${this.token}`},
                        }
                    )
                    .then((response) => {
                        console.log(response.data);
                        location.reload(true);
                    })
                    .catch((e) => {
                        alert('입력값을 확인하세요');
                    });
            });
        });
    }
}
