import Vue from 'vue'
import Router from 'vue-router'
import Radar3 from '@/components/Radar3.vue'
import Home from '@/components/Home.vue'
import List from '@/components/List.vue'
import Logout from '@/components/Logout.vue'
import Users from '@/components/Users.vue'
import AuthGuard from './auth-guard'
import appConfig from '@/config'

Vue.use(Router)
const routesCfg = appConfig.routes
const components = {
  home: Home,
  list: List,
  logout: Logout,
  users: Users,
  radar: Radar3
}
const routes = routesCfg
  .map(r => ({
    path: r.path,
    name: r.name,
    component: components[r.name],
    props: r.props || true,
    beforeEnter: AuthGuard(r.validator)
  }))

export default new Router({
  routes,
  // mode: 'history',
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})
