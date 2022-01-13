import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7b46c27e = () => interopDefault(import('..\\pages\\addvote.vue' /* webpackChunkName: "pages/addvote" */))
const _1695dd0a = () => interopDefault(import('..\\pages\\Choice.vue' /* webpackChunkName: "pages/Choice" */))
const _49e8ab9f = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _fd999e0e = () => interopDefault(import('..\\pages\\poll.vue' /* webpackChunkName: "pages/poll" */))
const _cd265646 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _2382fc18 = () => interopDefault(import('..\\pages\\tutorial.vue' /* webpackChunkName: "pages/tutorial" */))
const _048342b8 = () => interopDefault(import('..\\pages\\vote.vue' /* webpackChunkName: "pages/vote" */))
const _ca82ab7c = () => interopDefault(import('..\\pages\\votelist.vue' /* webpackChunkName: "pages/votelist" */))
const _ff7deef0 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/addvote",
    component: _7b46c27e,
    name: "addvote"
  }, {
    path: "/Choice",
    component: _1695dd0a,
    name: "Choice"
  }, {
    path: "/login",
    component: _49e8ab9f,
    name: "login"
  }, {
    path: "/poll",
    component: _fd999e0e,
    name: "poll"
  }, {
    path: "/register",
    component: _cd265646,
    name: "register"
  }, {
    path: "/tutorial",
    component: _2382fc18,
    name: "tutorial"
  }, {
    path: "/vote",
    component: _048342b8,
    name: "vote"
  }, {
    path: "/votelist",
    component: _ca82ab7c,
    name: "votelist"
  }, {
    path: "/",
    component: _ff7deef0,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
