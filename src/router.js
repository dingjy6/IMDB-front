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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/practice',
      name: 'practice',
      component: () => import('@/views/Practice.vue')
    },
    // 动态路由示例
    {
      path: '/rf',
      name: 'rf',
      component: () => import('@/views/rf/RFView.vue'),
      children: [
        {
          path: 'rf-practice',
          name: 'rf-practice',
          component: () => import('@/views/rf/RFPractice.vue')
        }
      ]
    }
  ]
})