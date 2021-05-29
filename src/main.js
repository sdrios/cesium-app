// src/main.js

import Vue from 'vue'
import App from './App'

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})


// new Vue({
//   render: h => h(App)
// }).$mount("#app");