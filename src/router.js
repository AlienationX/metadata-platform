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
      component: () => import('./views/Metadata.vue')
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('./views/Edit.vue')
    },
    {
      path: '/mapping',
      name: 'mapping',
      component: () => import('./views/Mapping.vue')
    },
    {
      path: '/compare',
      name: 'compare',
      component: () => import('./views/Compare.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('./views/Upload.vue')
    },

    {
      path: '/log',
      name: 'log',
      component: () => import('./views/Log.vue')
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