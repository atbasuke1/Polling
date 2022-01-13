import Vue from 'vue';
import Router from 'vue-router';
import Login from './pages/login.vue'
import Register from './pages/register.vue'
Vue.use(Router);
Vue.config.devtools = true
const auth = async (to, from, next) => {
  let user = localStorage.getItem("user")

  if (user !== null) {
    return next()
  }

  return router.replace("/login")
},
  unAuth = async (to, from, next) => {
    let user = localStorage.getItem("user")

    if (user === null) {
      return next()
    }

    return router.replace("/")
  }
export const router = new Router({
  routes: [
    {
      path: '/login',
      name: "Login",
      component: Login,
      beforeEnter: unAuth
    },
    {
      path: '/Register',
      name: "Signup",
      component: Signup,
      beforeEnter: unAuth
    },
    {
      path: '/',
      name: 'home',
      beforeEnter: auth
    }
  ]
});