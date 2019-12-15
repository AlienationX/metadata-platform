import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

Vue.config.productionTip = false


// axios默认配置
// axios.defaults.timeout = 5000 // 请求超时
axios.defaults.baseURL = 'http://192.168.0.103:5000/'
axios.defaults.headers = {
    'content-type': 'application/json;charset=UTF-8',
    // 'token':'one'
}

Vue.prototype.$axios = axios


new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
