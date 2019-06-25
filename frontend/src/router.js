import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import User from './views/User.vue'
import Dashboards from './views/Dashboards.vue'
import FileImport from './components/dashboards/FileImport.vue'
import Register from './components/auth/Register'
import store from './store/modules/token';
import File from './views/File.vue'
import NotFound from './components/layout/NotFound'

Vue.use(Router)

const ifAuthenticated = (to, from, next) => {
  if (store.state.token != null) {
    next()
    return
  }
  next('/')
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/dashboards',
      name: 'dashboards',
      component: Dashboards,
      beforeEnter: ifAuthenticated
    }
    ,
    {
      path: '/dashboards/import',
      name: 'import',
      component: FileImport,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/file/:id',
      name: 'file',
      component: File,
      beforeEnter: ifAuthenticated
    },
    {
      path: '*',
      name: 'other',
      component: NotFound
    }
  ]
})





