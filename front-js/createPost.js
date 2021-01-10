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
            axios
                .post(
                    `${backend}/api/post`,
                    {
                        title: this.title.value,
                        content: this.content.value,
                        category,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((response) => {
                    alert('게시글 작성 완료');
                    window.location.replace(`/${category}`);
                })
                .catch((error) => {
                    alert('입력값을 확인하세요');
                    window.location.replace(`/${category}/create`);
                });
        });
    }
}
