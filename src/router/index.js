import Vue from 'vue'
import Router from 'vue-router'
import Default from '@/components/Default'
import AgenciesList from '@/components/AgenciesList'

Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/',
    name: 'Default',
    component: Default
  }
  ,{
    path: '/list-agencies',
    name: 'Agencies-List',
    component: AgenciesList
  }
  ]
})
