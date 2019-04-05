import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import User from './views/User.vue'
import Dashboards from './views/Dashboards.vue'
import FileImport from './components/dashboards/FileImport.vue'
import ListFiles from './components/dashboards/ListFiles.vue'
import TestInformation from './components/dashboards/TestInformation.vue'
import ImportFileButton from './components/buttons/ImportFileButton'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      children: [
        {
          path: 'datasets',
          component: ListFiles
        }
      ] // acho que vai ser preciso meter merdas aqui
    },
    {
      path: '/dashboards',
      name: 'dashboards',
      component: Dashboards,
      children: [
        {
          path: 'import',
          component: FileImport,
        },
        {
          path: '',
          components: {
            default: ListFiles,
            helper: TestInformation
          },
        }
      ]
    },
  ]
})
