import axios from 'axios';
import {backend} from './main';

export default class viewPledge {
    constructor() {
        this.voteBtn = document.querySelector('#voteBtn');
        this.events();
    }

    events() {
        voteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(candidateId);
            const result = confirm('투표합니다?');
            if (result) {
                axios
                    .put(
                        `${backend}/api/pledge/${candidateId}`,
                        {},
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
                        alert('입력값을 확인하세요');
                    });
            }
        });
    }
}
