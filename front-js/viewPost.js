import axios from 'axios';
import {backend} from './main';

export default class viewPost {
    constructor() {
        this.commentForm = document.querySelector('#commentForm');
        this.commentInput = document.querySelector('#commentInput');
        this.subCommentForm = document.querySelectorAll('.subCommentForm');
        this.subCommentInput = document.querySelectorAll('.subCommentInput');
        this.commentDeleteBtn = document.querySelectorAll('.comment-delBtn');
        this.subCommentDeleteBtn = document.querySelectorAll(
            '.subComment-delBtn'
        );

        this.postDeleteBtn = document.querySelector('.post-delBtn');
        this.token = document
            .querySelector('#commentButton')
            .value.split(',AA,')[1];
        this.events();
    }

    events() {
        this.commentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const postId = window.location.pathname.split('/')[2];
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
                const postId = window.location.pathname.split('/')[2];

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

        [...this.commentDeleteBtn].forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                const postId = window.location.pathname.split('/')[2];

                const commentId = btn.name;
                const result = confirm('삭제합니까?');
                if (result) {
                    axios
                        .delete(
                            `${backend}/api/post/${postId}/comment/${commentId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                },
                            }
                        )
                        .then((response) => {
                            location.reload(true);
                        })
                        .catch((e) => {
                            alert('입력값을 확인하세요');
                        });
                }
            });
        });

        [...this.subCommentDeleteBtn].forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();

                const subCommentId = btn.name;
                const result = confirm('삭제합니까?');
                if (result) {
                    axios
                        .delete(
                            `${backend}/api/post/subComment/${subCommentId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                },
                            }
                        )
                        .then((response) => {
                            location.reload(true);
                        })
                        .catch((e) => {
                            alert('입력값을 확인하세요');
                        });
                }
            });
        });

        this.postDeleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const [a, category, postId] = window.location.pathname.split('/');
            const result = confirm('삭제합니까?');
            if (result) {
                axios
                    .delete(`${backend}/api/post/${postId}/`, {
                        headers: {Authorization: `Bearer ${this.token}`},
                    })
                    .then((response) => {
                        window.location.replace(`/${category}`);
                    })
                    .catch((e) => {
                        alert('입력값을 확인하세요');
                    });
            }
        });
    }
}
