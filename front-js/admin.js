import axios from 'axios';
import {backend} from './main';

export default class Admin {
    constructor() {
        this.applyOpenBtn = document.querySelector('#applyOpenBtn');
        this.voteOpenBtn = document.querySelector('#voteOpenBtn');
        this.getResultBtn = document.querySelector('#getResultBtn');
        this.electBtn = document.querySelector('#electBtn');
        this.voteResetBtn = document.querySelector('#voteResetBtn');
        this.adminTable = document.querySelector('#admin-table');
        this.events();
    }

    events() {
        this.applyOpenBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.applyBoradOpen();
        });

        this.voteOpenBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.voteOpen();
        });

        this.getResultBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.getResult();
        });

        this.voteResetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.voteReset();
        });
    }

    applyBoradOpen() {
        axios
            .put(
                `${backend}/api/apply`,
                {},
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                if (res.data.status === 'success')
                    alert(`게시판 상태: ` + res.data.isOpen);
                location.replace('/admin');
            })
            .catch((e) => {
                alert(`에러`);
                console.log(e);
            });
    }

    voteOpen() {
        const result = confirm('투표를 시작 또는 종료?');
        if (result) {
            axios
                .put(
                    `${backend}/api/pledge/admin`,
                    {},
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => {
                    if (res.data.status === 'success')
                        alert(`투표 가능 : ` + res.data.canVote);
                    location.replace('/admin');
                })
                .catch((e) => {
                    alert(`에러`);
                    console.log(e);
                });
        }
    }

    getResult() {
        axios
            .get(`${backend}/api/pledge/admin`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.data.status === 'success') {
                    this.adminTable.innerHTML = `
                    <thread>
                      <tr>
                        <td width="100">학교</td>
                        <td width="400">제목</td>
                        <td width="100">후보자</td>
                        <td width="200">투표수</td>
                        <td width="100">투표중</td>
                        <td width="100">1등</td>
                     </tr>
                    </thread>
                    `;
                    res.data.pledges.forEach((pledge) => {
                        const resultElement = document.createElement('tr');
                        resultElement.innerHTML = `
                        <td width="100" text-align="center">
                            ${pledge.school}
                        </td>
                        <td width="400" text-align="center">
                            ${pledge.title}
                        </td>
                        <td width="100" text-align="center">
                            ${pledge.candidate.name}
                        </td>
                        <td width="200" text-align="center">
                            ${pledge.voteCount}
                        </td>
                        <td width="100" text-align="center">
                            ${pledge.canVote}
                        </td>
                        `;

                        if (
                            res.data.winner.includes(pledge.candidateId) &&
                            pledge.candidate.role !== 'president' &&
                            pledge.voteCount !== 0
                        ) {
                            resultElement.innerHTML += `<button class="electBtn">선 출</button>`;
                        } else if (pledge.candidate.role === 'president') {
                            resultElement.innerHTML += `<button onclick="">당 선</button>`;
                        }

                        this.adminTable.append(resultElement);
                    });

                    document.querySelectorAll('.electBtn').forEach((btn, i) => {
                        btn.addEventListener('click', (e) => {
                            e.preventDefault();
                            if (canVote === 'false') {
                                axios
                                    .post(
                                        `${backend}/api/pledge/admin`,
                                        {
                                            candidateId: res.data.winner[i],
                                        },
                                        {
                                            headers: {
                                                authorization: `Bearer ${token}`,
                                            },
                                        }
                                    )
                                    .then((res) => {
                                        console.log(res.data);
                                        alert('선출되었습니다');
                                        location.replace('/admin');
                                    })
                                    .catch((e) => {
                                        alert(`에러`);
                                        location.replace('/admin');
                                        console.log(e.message);
                                    });
                            } else {
                                alert('투표를 먼저 종료하세요');
                            }
                        });
                    });
                }
            })
            .catch((e) => {
                alert(`에러`);
                console.log(e.message);
            });
    }

    voteReset() {
        const result = confirm('초기화?');
        if (result) {
            axios
                .patch(
                    `${backend}/api/pledge/admin`,
                    {},
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => {
                    if (res.data.status === 'success') {
                        alert('투표가 초기화 되었습니다');
                        location.replace('/admin');
                    }
                })
                .catch((e) => {
                    alert(`투표를 먼저 종료하세요`);
                    console.log(e);
                });
        }
    }
}

{
    /* <thread>
<tr>
  <td width="100">학교</td>
  <td width="500">제목</td>
  <td width="100">작성자</td>
  <td width="100">여부</td>
  <td width="200">작성일</td>
</tr>
</thread>
<tbody>
<tr>
  <td width="100" text-align="center">
    서울고
  </td>
  <td width="500" text-align="center">
    <a href="#" style="color: black">
      젬족ㅁㅇㄴ
    </a>
  </td>
  <td width=" 100" text-align="center">
    작성자
  <td width="100" text-align="center">
    ㅇㅇ
  </td>
  <td width="200" text-align="center">
    2020-21-12
  </td>
  </td>
</tr>
</tbody> */
}
