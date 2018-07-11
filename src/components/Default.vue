<template>
<div>

  <!-- <form @submit="addAppointment(name, image)">
    <input v-model="name" placeholder="Name">
    <input v-model="image" placeholder="Image URL">
    <button type="submit">Add New</button>
</form>
  <article v-for="(appointment, idx) in appointments" :key="idx">
    <img width="300px" :src="appointment.image">
    <h1>{{ appointment.name }}</h1>
    <button @click="deleteAppointment(appointment.id)">
    Delete
  </button>
  icon:<div class="mdi mdi-account"></div>
  </article>
-->
 <form @submit="testAppointment(referringAgencyName,referringAgencyAddress,referringAgencyContactName,referringAgencyContactTitle,referringAgencyContactPhone,clientName,clientAddressStreet,clientPhone,clientEmail,clientCommunicatePref,clientEnglish,clientClimbStairs,clientCountAdults,clientCountChildren,clientTranspo,clientTravelMode,clientNeedItemsLarge,clientNeedItemsSmall,clientNeedItemsKitchen)">
  <div class="tile is-ancestor">
  <div class="tile is-6 is-parent">
    <div class="tile is-child box">
      <p class="title">Referring Agency</p>

<!-- ******************************************************************* -->
<div class="field">
  <label class="label">Agency Name</label>
  <div class="control">
    <!-- <input class="input" type="text" v-model="referringAgencyName" placeholder="autofill frm prior submissions"> -->
    <vue-simple-suggest
        v-model="agencyListChosen"
        value-attribute="_id"
  display-attribute="name"
        :list="simpleSuggestionList"
        :filter-by-query="true"
        @hover="onSuggestSelect"
          >
    <!-- Filter by input text to only show the matching results -->
      </vue-simple-suggest>
  </div>
</div>
<!-- ******************************************************************* -->
<div class="field">
  <label class="label">Agency Address</label>
  <div class="control has-icons-right">
    <input class="input" type="text" v-model="referringAgencyAddress" placeholder="">
    <span class="icon is-small is-right">
    <i class="mdi" v-bind:class="{'has-text-success':(validaterex('referringAgencyAddress','address_street').success==true),'mdi-check':(validaterex('referringAgencyAddress','address_street').success==true),'mdi-alert':(validaterex('referringAgencyAddress','address_street').success==false),'has-text-danger':(validaterex('referringAgencyAddress','address_street').success==false),'has-text-warning':(validaterex('referringAgencyAddress','address_street').success==false)}"></i>
  </span>
  </input>
    <em v-bind:class="{'is-hidden':(validaterex('referringAgencyAddress','address_street').success==0)}">{{validaterex('referringAgencyAddress','address_street').reason}}</em>
  </div>
</div>
<!-- ******************************************************************* -->
<div class="field">
  <label class="label">Agency Contact Name</label>
  <div class="control">
    <input class="input" type="text" v-model="referringAgencyContactName" placeholder="autofill frm prior submissions">
  </div>
</div>
<!-- ******************************************************************* -->
<div class="field">
  <label class="label">Agency Contact Job Title</label>
  <div class="control">
    <input class="input" type="text" v-model="referringAgencyContactTitle" placeholder="autofill frm prior submissionsa">
  </div>
</div>
<!-- ******************************************************************* -->
<div class="field">
  <label class="label">Agency Contact Phone Number(s)</label>
  <div class="control">
    <input class="input" type="text" v-model="referringAgencyContactPhone" placeholder="e.g. '617-555-1777' or '617-555-1777, 617.555.0010'">
  </div>
</div>
    </div>
</div>
<!-- /.is-ancestor -->
  <div class="tile is-6 is-parent">
    <div class="tile is-child box">
      <p class="title">Client</p>
<!-- ******************************************************************* -->
      <div class="field">
        <label class="label">Client: Full Name</label>
        <div class="control">
          <input class="input" type="text" v-model="clientName" placeholder="">
        </div>
      </div>
      <!-- ******************************************************************* -->
      <div class="field">
        <label class="label">Client: Street Address</label>
        <div class="control">
          <input class="input" type="text" v-model="clientAddressStreet" placeholder="">
        </div>
      </div>
      <!-- ******************************************************************* -->
      <div class="field">
        <label class="label">Client: Phone #</label>
        <div class="control">
          <input class="input" type="text" v-model="clientPhone" placeholder="">
        </div>
      </div>
      <!-- ******************************************************************* -->
      <div class="field">
        <label class="label">Client: email</label>
        <div class="control">
          <input class="input" type="text" v-model="clientEmail" placeholder="">
        </div>
      </div>
</div>
</div>
</div>
<!-- /.is-ancestor -->

      <p class="title">Appointment</p>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <div class="tile is-ancestor">
  <div class="tile is-parent">
    <article class="tile is-child box">
    <div class="field has-text-centered">
  <label class="label">What's the best way to communicate with the client?</label>
  <div class="control">
    <div class="buttons">
  <button class="button" v-on:click.self.prevent v-on:click="swap('clientCommunicatePref',$event)" value="phone" v-model="clientCommunicatePref" v-bind:class="{'is-black':(clientCommunicatePref === 'phone')}">Phone</button>
  <button class="button" v-on:click.self.prevent v-on:click="swap('clientCommunicatePref',$event)" value="text" v-model="clientCommunicatePref" v-bind:class="{'is-black':(clientCommunicatePref === 'text')}">Text</button>
  <button class="button" v-on:click.self.prevent v-on:click="swap('clientCommunicatePref',$event)" value="email" v-model="clientCommunicatePref" v-bind:class="{'is-black':(clientCommunicatePref === 'email')}">Email</button>
  <!-- <h1 v-if="clientCommunicatePref == 'email'">Yes</h1> -->
  <!-- <h1 v-else>not email</h1> -->
</div>
  </div>
</div>
    </article>
  </div>
  <div class="tile is-parent">
    <article class="tile is-child box">
      <div class="field has-text-centered">
  <div class="field-label">
    <label class="label">Does the client speak English?</label>
  </div>
  <div class="field-body">
    <div class="field is-narrow">
      <div class="control">
        <!-- <label class="radio"><input type="radio" v-model="clientEnglish" name="radio-english" value=true>Yes</label>
        <label class="radio"><input type="radio" v-model="clientEnglish" name="radio-english" value=false>No</label> -->
        <button class="button" v-on:click.self.prevent v-on:click="swap('clientEnglish',$event)" v-model="clientEnglish" value="yes" v-bind:class="{'is-black':(clientEnglish === 'yes')}">Yes</button>
  <button class="button" v-on:click.self.prevent v-on:click="swap('clientEnglish',$event)" v-model="clientEnglish" value="no" v-bind:class="{'is-black':(clientEnglish === 'no')}">No</button>
      </div>
    </div>
  </div>
  <em v-if="clientEnglish=='no'">(You selected "no" - the client must bring an English speaking person to the warehouse to translate.)</em>
</div>
    </article>
  </div>
  <div class="tile is-parent">
    <article class="tile is-child box">
      <div class="field has-text-centered">
  <div class="field-label">
    <label class="label">Is client able to climb 3 flights of stairs?</label>
  </div>
  <div class="field-body">
    <div class="field">
      <div class="control">
        <!-- <label class="radio"><input type="radio" v-model="clientClimbStairs" name="radio-stairs" value="yes">Yes</label>
        <label class="radio"><input type="radio" v-model="clientClimbStairs" name="radio-stairs" value="no">No</label> -->
        <button class="button" v-on:click.self.prevent v-on:click="swap('clientClimbStairs',$event)" v-model="clientClimbStairs" value="yes" v-bind:class="{'is-black':(clientClimbStairs === 'yes')}">Yes</button>
  <button class="button" v-on:click.self.prevent v-on:click="swap('clientClimbStairs',$event)" v-model="clientClimbStairs" value="no" v-bind:class="{'is-black':(clientClimbStairs === 'no')}">No</button>
      </div>
    </div>
  </div>
</div>
    </article>
  </div>
</div>

      </div>
<!-- /is-ancestor -->
</div>
<!-- /is-child box -->

<div class="has-text-danger has-text-centered is-size-3">Our warehouse is NOT a safe environment for children.</div>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <div class="tile is-ancestor">
  <div class="tile is-parent">
<!-- ******************************************************************* -->
    <article class="tile is-child box">
    <div class="field">
  <label class="label"># adults (18+) living in home</label>
  <div class="control has-icons-right">
    <input class="input" type="text" v-model="clientCountAdults" placeholder="">
    <span class="icon is-small is-right">
      <i class="mdi" v-bind:class="{'has-text-success':clientCountAdults>0,'mdi-check':isNaN(clientCountAdults)==false,'mdi-alert':isNaN(clientCountAdults)==true||clientCountAdults=='','has-text-danger':isNaN(clientCountAdults)==true,'has-text-warning':clientCountAdults==''}"></i>
    </span>

  </div>
</div>
<em v-if="isNaN(clientCountAdults)==true">this needs to be a number</em>
    </article>
    <!-- ******************************************************************* -->
    <article class="tile is-child box">
    <div class="field">
  <label class="label"># children (17 and under) living in home</label>
  <div class="control has-icons-right">
    <input class="input" type="text" v-model="clientCountChildren" placeholder="">
<!--     <span class="icon is-small is-right">
      <i class="mdi" v-bind:class="{'mdi-alert':isNaN(clientCountChildren)==true}"></i>
    </span> -->
        <span class="icon is-small is-right">
      <i class="mdi" v-bind:class="{'has-text-success':clientCountAdults>0,'mdi-check':isNaN(clientCountAdults)==false,'mdi-alert':isNaN(clientCountChildren)==true||clientCountChildren=='','has-text-danger':isNaN(clientCountChildren)==true,'has-text-warning':clientCountChildren==''}"></i>
    </span>
  </div>
</div>
<em v-if="isNaN(clientCountChildren)==true">this needs to be a number</em>
    </article>
  </div><!-- /.tile.is-parent -->
</div><!-- /.tile.is-ancestor -->
</div><!-- /.tile.is-parent -->
</div><!-- /.tile.is-ancestor -->

  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <div class="tile is-ancestor">
  <div class="tile is-parent">
    <!-- ******************************************************************* -->
    <article class="tile is-child box">
<div class="field">
  <div class="field-label">
    <label class="has-text-left label">Moving Transportation:</label>
  </div>
  <div class="field-body">
    <div class="field is-narrow">
      <div class="control">
        <label class="radio">
          <input type="radio" value="professional" v-model="clientTranspo" name="bt-radio-transpo"></input>Referring Agency has arranged professional movers</label>
        <label class="radio">
          <input type="radio" value="self" v-model="clientTranspo" name="bt-radio-transpo" checked></input>
          Client will bring box truck (rental or other) and moving helper
        </label>
      </div>
    </div>
  </div>

</div>
    </article>
<!-- ******************************************************************* -->
    <article class="tile is-child box" v-if="clientTranspo == 'professional'">
<div class="field">
  <div class="field-label">
    <label class="has-text-left label">Professional movers. Please select how the client will travel to warehouse to meet moving van.</label>
  </div>
  <div class="field-body">
    <div class="field is-narrow">
      <div class="control">

<label class="radio" v-for="item in clientTravelMode">
<input type="radio" name="bt-radio-travelMode" :checked="item.status" @click="changeStatusRadio('clientTravelMode',item.key)">
{{item.label}}
</input>
</label>

      </div>
    </div>
  </div>
</div>
    </article>
      </div><!-- /.tile.is-parent -->
</div><!-- /.tile.is-ancestor -->
</div><!-- /.tile.is-parent -->
</div><!-- /.tile.is-ancestor -->
<p class="has-text-centered"><em>(Freight elevator available if necessary.)</em></p>
<hr/>
<!-- ******************************************************************* -->
<p class="has-text-centered is-size-1"><span class="icon">
  <i class="fas fa-calendar-alt"></i>
</span></p>
<hr/>
        <p class="title">Client Needs (please indicate requested items):</p>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <div class="tile is-ancestor">
<!-- ******************************************************************* -->
  <div class="tile is-parent">
    <article class="tile is-child box">
      <div class="field">
  <label class="label">Large Items</label >
  <div class="control">
    <div class="buttons">

<button v-on:click.self.prevent v-for="item in clientNeedItemsLarge" @click="item.status=!item.status" class="button" v-bind:class="{ 'is-black':item.status }">{{item.label}}</button>

</div>
  </div>
</div>
</article>

    <article class="tile is-child box">
      <div class="field">
  <label class="label">Small Appliances (comma-delimited)</label>
  <div class="control">
    <input class="input" type="text" v-model="clientNeedItemsSmall" v-on:keyup="prepArray('clientNeedItemsSmall',$event)">
  </div>
</div>
</article>
    <article class="tile is-child box">
      <div class="field">
  <label class="label">Kitchen Items (comma-delimited)</label>
  <div class="control">
    <input class="input" type="text" v-model="clientNeedItemsKitchen" v-on:keyup="prepArray('clientNeedItemsKitchen',$event)">
  </div>
</div>
</article>

      </div><!-- /.tile.is-parent -->
</div><!-- /.tile.is-ancestor -->
</div><!-- /.tile.is-parent -->
</div><!-- /.tile.is-ancestor -->

<!-- ******************************************************************* -->
<p class="has-text-centered is-size-1"><span class="icon">
  <i class="fas fa-bed"></i>
</span></p>
<!-- ******************************************************************* -->

<button class="button is-large is-black" type="submit">Submit</button>
</form>

</div>
</template>

<script>

import { db } from '../main'

export default {
  name: 'Default',
  data () {
    return {
      agencyListChosen:null,
      name: '',
      image: '',
      referringAgencyName: '',
referringAgencyAddress: '1122 Boogie Woogie Av.',
referringAgencyContactName: 'referringAgencyContactName',
referringAgencyContactTitle: 'referringAgencyContactTitle',
referringAgencyContactPhone: 'referringAgencyContactPhone',
clientName: 'clientName',
clientAddressStreet: 'clientAddressStreet',
clientPhone: 'clientPhone',
clientEmail: 'clientEmail',
clientCommunicatePref: 'email',
clientEnglish: "yes",
clientClimbStairs: 'yes',
clientCountAdults: 0,
clientCountChildren: 0,
clientTranspo: 'professional',
clientTravelMode: [
{key:'train',status:false,label:"Train"}
,{key:'bus',status:false,label:"Bus"}
,{key:'car',status:false,label:"Car"}
,{key:'movingvan',status:true,label:"Moving Van"}
],
clientNeedItemsLarge: [
{"key":"couch",status:true,"label":"Couch"}
,{"key":"table_kitchen",status:false,"label":"Kitchen Table"}
,{status:false,label:"Area Rug",key:"arearug"}
,{status:false,label:"Bedding/Towels",key:"bedding_y_towels"}
,{status:false,label:"Bookcase",key:"bookcase"}
,{status:false,label:"Chairs",key:"chairs"}
,{status:false,label:"Chest of Drawers/Bureau",key:"bureau"}
,{status:false,label:"Coffee Table",key:"coffeetable"}
,{status:false,label:"Desk",key:"desk"}
,{status:false,label:"End Table",key:"endtable"}
,{status:false,label:"Kitchen Table",key:"kitchentable"}
,{status:false,label:"Nightstand",key:"nightstand"}
,{status:false,label:"Upholstered Chair",key:"upholsteredchair"}
],
clientNeedItemsSmall: [],
clientNeedItemsKitchen: []
    }
  },
  firestore () {
    return {
      appointments: db.collection('appointments')
      ,agencies:db.collection('agencies')
    }
  },
  methods: {
  test(){
console.log(this.$_.pluck(this.agencies,'name'))
},
simpleSuggestionList() {
return this.agencies
return this.$_.pluck(this.agencies,'name')
        return [
          'Tommy',
          'John',
          'Hot Dog'
        ]
      },
    addAppointment (name, image) {
      const createdAt = new Date()
      // db.collection('appointments').add({ name, image, createdAt })
    },
    deleteAppointment (id) {
      // db.collection('appointments').doc(id).delete()
    }
    ,changeStatusRadio (which,truth){
      this.$_.each(this[which],(k)=>{
        console.log("k",k);
        k.status = (k.key!==truth)?false:true;
      })
    }
    ,prepArray (which,event) {
      // console.log(event.target.value.toLowerCase())
      this[which]=event.target.value.split(",")
    }
    ,testAppointment (referringAgencyName) {
      console.log(referringAgencyName)
    }
    ,onSuggestSelect (s){
      var address_msg = (s.address=='')?"(no address on file - please type it here)":s.address
      this.referringAgencyAddress = address_msg
    }
    ,validaterex (which,type) {

let v = this[which];

if(type=='address_street'){
let clauses = v.split(",")
let re = {success:false,reason:"missing address components"};

// 11 trenton pl, anton
switch (true) {
  case clauses.length<2 || clauses[1].length<4:
    re.success=false;
    re.reason="missing most pieces";
    break;
      case (isNaN(clauses[0][0]) && clauses[0].split(" ")<=4):
    re.success=false;
    re.reason="missing at least a leading house number and/or street name (or they are out of place)";
    break;
  default:
  re.success=true;
  re.reason="looks legit"
}
return re;
}//type=address_street

    }
    ,swap (which,event) {
      let nv = event.target.value.toLowerCase()
      this[which]=nv
    }
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
