import axios from 'axios';

const backend =
    'http://ec2-54-180-120-197.ap-northeast-2.compute.amazonaws.com';

export default class UserAuth {
    constructor() {
        this.buttons = document.querySelectorAll('.permitButton');
        this.events();
    }

    events() {
        let id, token;

        this.buttons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                [id, token] = btn.value.split(',AA,');

                axios
                    .post(
                        `${backend}/api/auth/teacher/${id}`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    .then((response) => {
                        console.log(response.data);
                        alert('학생 승인 완료');
                        window.location.replace('/teacher');
                    })
                    .catch((error) => {
                        console.log(error.message);
                        alert('학생 승인 실패');
                        window.location.replace('/teacher');
                    });
            });
        });
    }
}
