import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//import BookManger from "../views/AlbumManger";
import AlbumList from "../views/AlbumList";
import AddAlbum from "../views/AddAlbum";
import EditAlbum from "../views/EditAlbum";
import DetailAlbum from "../views/DetailAlbum";
import SingerList from "../views/SingerList";
import AddSinger from "../views/AddSinger";
import EditSinger from "../views/EditSinger";
import DetailSinger from "../views/DetailSinger";
import AddUser from "../views/AddUser"
import RegisterUser from "../views/RegisterUser"
import EditUser from "../views/EditUser"
import UserList from "../views/UserList";
import Login from "../views/Login";

Vue.use(VueRouter)



const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
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
    path: '/albumadd',
    name: 'AddAlbum',
    component: AddAlbum
  },
  {
    path: '/albumedit/:id',
    name: 'EditAlbum',
    component: EditAlbum
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
    path: '/registerUser',
    name: 'RegisterUser',
    component: RegisterUser,
  },
  {
    path: '/useradd',
    name: 'AddUser',
    component: AddUser,
  },
  {
    path: '/useredit/:id',
    name: 'EditUser',
    component: EditUser,
  },
  {
    path: '/userlist',
    name: 'UserList',
    component: UserList,
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
