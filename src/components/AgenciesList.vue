<template>
<div>
<!-- <ul> -->
  <!-- <li v-for="(agency, idx) in agencies" :key="idx" class="card"> -->
  <div v-for="(agency, idx) in agencies" :key="idx" class="card">

    <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/48x48.png" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{{ agency.name }}</p>
        <p class="subtitle is-6">{{ agency.source }}</p>
      </div>
    </div>

    <div class="content">
      {{ agency.address }}
      <br>
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>

</div>
  <!-- </li></ul> -->

</div>
</template>

<script>

import { db } from '../main'
// import { db } from 'firebase';

export default {
  name: 'Agencies-List',
  data () {},
  firestore () {
    return {
      agencies:db.collection('agencies')
    }
  },
  methods: {
  },
  computed: {
}//computed
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  /*list-style-type: none;*/
  padding: 0;
}
li {
  /*display: inline-block;*/
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
