import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BookManger from "../views/BookManger";
import Claw from "../views/Claw";
import InputMongo from "../views/Input";
import MochaTest from "../views/MochaTest";
import HttpTest from "../views/HttpTest";
Vue.use(VueRouter)



const routes = [
  {
    path: '/',
    name: 'bookManager',
    component: BookManger
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/claw',
    name: 'claw',
    component: Claw
  },
  {
    path: '/input',
    name: 'input',
    component: InputMongo,
  },
  {
    path: '/mochaTest',
    name: 'mochatest',
    component: MochaTest,
  },
  {
    path: '/httpTest',
    name: 'httptest',
    component: HttpTest,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
