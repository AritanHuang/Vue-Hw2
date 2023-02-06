import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

const site = 'https://vue3-course-api.hexschool.io/v2/';

createApp({
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            // console.log(this.user);
            axios.post(`${site}admin/signin`, this.user)
                .then(res => {
                    console.log(res);
                    // const token = res.data.token;
                    // const expired = res.data.expired;
                    const { token, expired } = res.data; //解構寫法 用在名稱不變時
                    document.cookie = `AritanCookie=${token}; expires=${new Date(expired)}; `;
                    window.location = 'products.html';
                })
                .catch(err => {
                    console.log(err);
                })
        }

    },
    mounted() {

    }
}).mount('#app')