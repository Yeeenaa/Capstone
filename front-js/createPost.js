import axios from 'axios';

const backend =
    'http://ec2-54-180-120-197.ap-northeast-2.compute.amazonaws.com';

export default class CreatePost {
    constructor() {
        this.title = document.querySelector('#title');
        this.content = document.querySelector('#content');
        this.button = document.querySelector('#postButton');
        this.events();
    }

    events() {
        this.button.addEventListener('click', (e) => {
            e.preventDefault();

            const [category, token] = this.button.value.split(',AA,');

            if (category === 'pledge') {
                const form = new FormData();

                form.append('title', this.title.value);
                form.append('content', this.content.value);
                // form.append('video', category)
                // form.append('images', category)

                axios
                    .post(`${backend}/api/pledge`, form, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then((response) => {
                        alert('게시글 작성 완료');
                        window.location.replace(`/pledge`);
                    })
                    .catch((error) => {
                        alert('입력값을 확인하세요');
                        window.location.replace(`/pledge/create`);
                    });
            } else if (category === 'apply') {
                axios
                    .post(
                        `${backend}/api/apply`,
                        {
                            title: this.title.value,
                            content: this.content.value,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    .then((response) => {
                        alert('게시글 작성 완료');
                        window.location.replace(`/application`);
                    })
                    .catch((error) => {
                        alert('입력값을 확인하세요');
                        window.location.replace(`/application/create`);
                    });
            } else {
                const form = new FormData();

                form.append('title', this.title.value);
                form.append('content', this.content.value);
                form.append('category', category);
                // form.append('video', category)
                // form.append('images', category)

                axios
                    .post(`${backend}/api/post`, form, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then((response) => {
                        alert('게시글 작성 완료');
                        window.location.replace(`/${category}`);
                    })
                    .catch((error) => {
                        alert('입력값을 확인하세요');
                        window.location.replace(`/${category}/create`);
                    });
            }
        });
    }
}
