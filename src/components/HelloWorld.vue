<template>
<div>

  <form @submit="addLocation(name, image)">
    <input v-model="name" placeholder="Name">
    <input v-model="image" placeholder="Image URL">
    <button type="submit">Add New</button>
</form>

  <article v-for="(location, idx) in locations" :key="idx">
    <img width="300px" :src="location.image">
    <h1>{{ location.name }}</h1>
    <button @click="deleteLocation(location.id)">
    Delete
  </button>
  icon:<div class="mdi mdi-account"></div>
  </article>
</div>
</template>

<script>

  import { db } from '../main'

export default {
  name: 'HelloWorld',
  data () {
    return {
      locations: []
      ,name: ''      // <-- here
      ,image: ''
    }
  },
  firestore () {
    return {
      locations: db.collection('locations')
    }
  }
  ,methods: { 
    addLocation (name, image) {      // <-- and here 
      const createdAt = new Date()
      db.collection('locations').add({ name, image, createdAt })
    }
    ,deleteLocation (id) {
      db.collection('locations').doc(id).delete()
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
