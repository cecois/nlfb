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

import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(Buefy)

Vue.use(VueFire)
firebase.initializeApp({
  projectId: 'nlfbma',
  databaseURL: 'https://nlfbma.firebaseio.com'
})
export const db = firebase.firestore()
  // const firestore = firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  db.settings(settings);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
