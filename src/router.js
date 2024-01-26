import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/movies',
      name: 'movies',
      component: () => import('@/views/Movies.vue')
    },
    {
      path: '/celebs',
      name: 'celebs',
      component: () => import('@/views/Celebs.vue')
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: () => import('@/views/Recommend.vue')
    },
  ]
})