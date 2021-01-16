import axios from 'axios';
import {backend} from './main';

export default class LoadPosts {
    constructor() {
        this.currentPage = 1;
        this.searchParam = document.querySelector('#write-wrap > select');
        this.searchTerm = document.querySelector(
            '#write-wrap > input[type=text]'
        );
        this.button = document.querySelector('#searchButton');
        this.form = document.querySelector('#searchForm');
        this.container = document.querySelector(
            '#wrapper > form > table > tbody:nth-child(2)'
        );
        this.events();
    }

    events() {
        this.form.addEventListener('submit', async (e) => {
            this.currentPage = 1;
            e.preventDefault();
            const [category, token] = this.button.value.split(',AA,');

            const response = await axios.get(`${backend}/api/post`, {
                headers: {Authorization: `Bearer ${token}`},
                params: {
                    page: this.currentPage,
                    category,
                    searchParam: this.searchParam.value,
                    searchTerm: this.searchTerm.value,
                },
            });

            this.container.innerHTML = ``;
            this.addDataToDOM(response.data.posts);
        });
        window.addEventListener('scroll', async (e) => {
            const {
                scrollTop,
                scrollHeight,
                clientHeight,
            } = document.documentElement;

            const [category, token] = this.button.value.split(',AA,');

            if (clientHeight + scrollTop >= scrollHeight - 5) {
                // show the loading animation
                const response = await axios.get(`${backend}/api/post`, {
                    headers: {Authorization: `Bearer ${token}`},
                    params: {
                        page: this.currentPage + 1,
                        category,
                        searchParam: this.searchParam.value,
                        searchTerm: this.searchTerm.value,
                    },
                });
                setTimeout(() => {
                    this.addDataToDOM(response.data.posts, category);
                    this.currentPage++;
                }, 10);
            }
        });
    }

    addDataToDOM(posts, category) {
        posts.forEach((post) => {
            const postElement = document.createElement('tr');
            postElement.innerHTML = `
            <td width="100" text-align="center">
               ${post.school}
            </td>
            <td width="300" text-align="center">
               <a href="/${category}/ ${post.id}" style="color: black">
               ${post.title}
               </a>
            </td>
            <td width=" 300" text-align="center">
               ${post.user.name}
            </td>
            <td width="100" text-align="center">
               ${post.createdAt}
            </td>
            <td width="100" text-align="center">
               ${post.commentCount}개
            </td>
            <td width="100" text-align="center">
               ${post.viewCount}
            </td>
            `;

            this.container.appendChild(postElement);
        });
    }
}
