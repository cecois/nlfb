// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// firebase stuff
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
// bulma stuff via buefy
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

import underscore from 'vue-underscore';
import {_} from 'vue-underscore';
import moment from 'moment';

import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(underscore);
Vue.use(Buefy)
Vue.use(VueFire)

Object.defineProperty(Vue.prototype, '$MOMENT', { value: moment });

firebase.initializeApp({
  projectId: 'nlfbma',
  databaseURL: 'https://nlfbma.firebaseio.com'
})
export const db = firebase.firestore()
const settings = {timestampsInSnapshots: true}
db.settings(settings)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
