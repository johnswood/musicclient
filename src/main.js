import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
//import {Button, Table, Form, FormItem,Input,Dialog,TableColumn,Image} from 'element-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
// Vue.use(Button);
// Vue.use(Table);
// Vue.use(Form);
// Vue.use(FormItem);
// Vue.use(Input);
// Vue.use(Dialog);
// Vue.use(TableColumn);
// Vue.use(Image);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
