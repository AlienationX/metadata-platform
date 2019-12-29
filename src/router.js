import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

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
      path: '/metadata',
      name: 'metadata',
      component: () => import('./views/metadata/Metadata.vue')
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('./views/metadata/Edit.vue')
    },
    {
      path: '/mapping',
      name: 'mapping',
      component: () => import('./views/metadata/Mapping.vue')
    },
    {
      path: '/compare',
      name: 'compare',
      component: () => import('./views/metadata/Compare.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('./views/metadata/Upload.vue')
    },
    {
      path: '/log',
      name: 'log',
      component: () => import('./views/metadata/Log.vue')
    },
    {
      path: '/download',
      name: 'download',
      component: () => import('./views/template/Download.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})