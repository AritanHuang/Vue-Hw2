import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
const site = 'https://vue3-course-api.hexschool.io/v2/';
const path = 'aritan0703'

const app = createApp({
    data() {
        return {
            products: [],
            productsNum: '',
            tempProducts: {}
        }
    },
    methods: {
        checkLogin() {
            axios.post(`${site}api/user/check`)
                .then(res => {
                    console.log(res);
                    this.getProducts();
                })
                .catch(err => {
                    console.log(err);
                    window.location = 'login.html';
                })
        },
        getProducts() {
            axios.get(`${site}api/${path}/admin/products/all`)
                .then(res => {
                    console.log(res.data.products);
                    this.products = res.data.products;
                    this.productsNum = Object.keys(this.products).length;//參考助教回覆其他同學的建議，但不太了解
                    //Object.keys()將所有屬性撈出來，變成一個陣列
                })
                .catch(err => {
                    console.log(err);
                })
        }

    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)AritanCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");//把自定義的cookie名稱取出代入
        // console.log(token);
        axios.defaults.headers.common['Authorization'] = token; // 當Cookie 有儲存時，利用axios發送驗證
        this.checkLogin();
    }
})
app.mount('#app');
