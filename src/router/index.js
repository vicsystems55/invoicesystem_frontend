import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    children:[

      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      },
    

    
      {
        path: '/products',
        name: 'products',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductsView.vue')
      },
    
      
      {
        path: '/invoice',
        name: 'invoice',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/InvoiceView.vue')
      },
    ],
    beforeEnter: (to, from, next) => {
      // ...
      if (localStorage.getItem('user_token')) {
    
          console.log('yes')
    
     next()
    
      }else{
          console.log('no board')
          router.push({
              path: '/login',
              replace: true
            });
      
    
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },

  {
    path: '/payment-successful',
    name: 'payment-successful',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PaymentSuccessful.vue')
  },

  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue')
  },

  {
    path: '/',
    name: 'home',
    component: HomeView
  },


 
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
