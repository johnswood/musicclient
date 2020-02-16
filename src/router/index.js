import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BookManger from "../views/AlbumManger";
import AlbumList from "../views/AlbumList";
import DetailAlbum from "../views/DetailAlbum";
import SingerList from "../views/SingerList";
import AddSinger from "../views/AddSinger";
import EditSinger from "../views/EditSinger";
import DetailSinger from "../views/DetailSinger";
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
    path: '/albumlist',
    name: 'AlbumList',
    component: AlbumList
  },
  {
    path: '/album/:id',
    name: 'DetailAlbum',
    component: DetailAlbum
  },
  {
    path: '/singerlist',
    name: 'SingerList',
    component: SingerList,
  },
  {
    path: '/singeradd',
    name: 'AddSinger',
    component: AddSinger,
  },
  {
    path: '/singeredit/:id',
    name: 'EditSinger',
    component: EditSinger,
  },
  {
    path: '/singer/:id',
    name: 'DetailSinger',
    component: DetailSinger
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
