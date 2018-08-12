<template>
<div>
<form @submit="testAppointment('fill this in w/ form data later')">
<form-wizard @on-complete="onComplete"
                      title="This is a new title"
                      subtitle="And a new subtitle"
                      color="#9b59b6">
  <tab-content title="Agency" icon="mdi mdi-account">

<!-- ******************************************************************* FIELD -->
<div class="field">
  <label class="label">Agency Name</label>
  <div class="control">
<!--     <input class="input" type="text" v-model="fake" placeholder="autofill frm prior submissions"> -->
    <vue-simple-suggest
        v-model="agency.agency_name"
        value-attribute="this"
  display-attribute="this"
        :list="simpleSuggestionList"
        :filter-by-query="true"
        @select="onSuggestAgencySelect"
          >
    <!-- Filter by input text to only show the matching results -->
      </vue-simple-suggest>
  </div>
</div><!-- ./field -->



<!-- ******************************************************************* FIELD -->
<div class="field">
  <label class="label">Agency Address</label>
  <div class="control has-icons-right">
    <input class="input" type="text" v-model="agency.agency_addressstreet">
    <span class="icon is-small is-right">
<i class="mdi" v-bind:class="{'has-text-success':(validaterex('address_street').success==true),'mdi-check':(validaterex('address_street').success==true),'mdi-alert':(validaterex('address_street').success==false),'has-text-danger':(validaterex('address_street').success==false),'has-text-warning':(validaterex('address_street').success==false)}"></i>
  </span>
  </input>
  </div>
</div><!-- ./field -->



<!-- ******************************************************************* FIELD -->
<div class="field">
  <label class="label">Agency Contact Name</label>
  <div class="control">
    <input class="input" type="text" v-model="agency.agency_advocate_name">
  </input>
  </div>
</div>

<!-- ******************************************************************* FIELD -->
<div class="field">
  <label class="label">Agency Contact Job Title</label>
  <div class="control">
    <input class="input" type="text" v-model="agency.agency_advocate_title">
  </input>
  </div>
</div>

<!-- ******************************************************************* FIELD -->
<div class="field">
  <label class="label">Agency Contact Phone Number(s)</label>
  <div class="control">
    <input class="input" type="text" v-model="agency.agency_advocate_phone">
  </input>
  </div>
</div>

</tab-content>





  <tab-content title="Primary Client">
      

<!-- ******************************************************************* FIELD -->
      <div class="field">
        <label class="label">Client: First Name</label>
        <div class="control">
          <input v-on:keyup="similar" class="input" type="text" v-model="clients.primary.client_name_first">
        </div>
      </div>
<!-- ******************************************************************* FIELD -->
      <div class="field">
        <label class="label">Client: Last Name</label>
        <div class="control">
          <input v-on:keyup="similar" class="input" type="text" v-model="clients.primary.client_name_last">
        </div>
      </div>
      <!-- ******************************************************************* FIELD -->
      <div class="field">
        <label class="label">Client: Date of Birth</label>
        <div class="control">
          <input v-on:keyup="validaterex('dob')" class="input" type="text" v-model="clients.primary.client_dob">
        </div>
      </div>
      <!-- ******************************************************************* FIELD -->
      <div class="field">
        <label class="label">Client: Street Address</label>
        <div class="control">
          <input class="input" type="text" v-model="clients.primary.client_addressstreet">
        </div>
      </div>
      <!-- ******************************************************************* FIELD -->
      <div class="field">
        <label class="label">Client: Phone #</label>
        <div class="control">
          <input class="input" type="text" v-model="clients.primary.client_phone">
        </div>
      </div>
      <!-- ******************************************************************* FIELD -->
      <div class="field">
        <label class="label">Client: email</label>
        <div class="control">
          <input class="input" type="text" v-model="clients.primary.client_email">
        </div>
      </div>
      <!-- ******************************************************************* FIELD -->
      <div class="field">
        <label class="radio">
          <div class="control">
            <input type="radio" value="self" v-model="clients.primary.client_isveteran" name="bt-radio-veteran" checked></input></div>
          Client is a US Veteran
        </label>
</div>

   </tab-content>


<tab-content title="Add'l Clients">

</tab-content>


   <tab-content title="Appointment">
     appt
   </tab-content>
   <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
</form-wizard>

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

<!-- <button class="button is-large is-black" type="submit">Submit</button> -->

</form>

</div>
</template>

<script>

import { db } from '../main'

export default {
  name: 'Default',
  data () {
    return {
      "temp": {
    "agencyListChosen": ''
  },
  "flags":[],
  "ops":[],
  "agency": {
      "agency_name": "",
      "agency_addressstreet":"",
      "agency_advocate_name": "",
      "agency_advocate_title": "",
      "agency_advocate_phone":""
    },
  "clients":{
    "primary":{
        "client_name_first": "",
        "client_name_last": "",
        "client_dob": "",
        "client_phone": "",
        "client_email": "",
        "client_addressstreet": "",
        "client_isveteran": false,
        "client_specialcode": ""
    },
      "related": [
        {
          "client_name_first": "",
          "client_name_last": ""
        }
      ]
      },
  "appointment": {
    "notes_nlfbma":"",
    "appointment_date_final": "",
      "appointment_countadults": 1,
      "appointment_countchildren": 0,
    "communicatepref": "email",
    "english": true,
    "climbstairs": true,
    "wheelchair": false,
    "countadults": 0,
    "countchildren": 0,
    "transpo": "professional",
    "travelmode": [
      {
        "key": "train",
        "status": false,
        "label": "Train"
      },
      {
        "key": "bus",
        "status": false,
        "label": "Bus"
      },
      {
        "key": "car",
        "status": false,
        "label": "Car"
      },
      {
        "key": "movingvan",
        "status": true,
        "label": "Moving Van"
      }
    ],
    "needs": {
      "large": [
        {
          "key": "couch",
          "status": true,
          "label": "Couch"
        },
        {
          "key": "table_kitchen",
          "status": false,
          "label": "Kitchen Table"
        },
        {
          "status": false,
          "label": "Area Rug",
          "key": "arearug"
        },
        {
          "status": false,
          "label": "Bedding/Towels",
          "key": "bedding_y_towels"
        },
        {
          "status": false,
          "label": "Bookcase",
          "key": "bookcase"
        },
        {
          "status": false,
          "label": "Chairs",
          "key": "chairs"
        },
        {
          "status": false,
          "label": "Chest of Drawers/Bureau",
          "key": "bureau"
        },
        {
          "status": false,
          "label": "Coffee Table",
          "key": "coffeetable"
        },
        {
          "status": false,
          "label": "Desk",
          "key": "desk"
        },
        {
          "status": false,
          "label": "End Table",
          "key": "endtable"
        },
        {
          "status": false,
          "label": "Kitchen Table",
          "key": "kitchentable"
        },
        {
          "status": false,
          "label": "Nightstand",
          "key": "nightstand"
        },
        {
          "status": false,
          "label": "Upholstered Chair",
          "key": "upholsteredchair"
        },
        {
          "status": false,
          "label": "Bed Frame",
          "key": "bedframe"
        },
        {
          "status": false,
          "label": "Lamps",
          "key": "lamps"
        },
        {
          "status": false,
          "label": "Dishes/Glassware",
          "key": "dishes"
        }
      ],
      "small": [],
      "kitchen": [],
      "mattresses":[
      {
        "key": "twin",
        "status": true,
        "label": "Twin Mattress"
      }
      ,{
        "key": "twin_box",
        "status": true,
        "label": "Twin Box Spring"
      }
      ,{
        "key": "double_box",
        "status": false,
        "label": "Double Box Spring"
      }
      ,{
        "key": "double",
        "status": false,
        "label": "Double Mattress"
      }
      ]
    }
    ,"comments_client":""
  }}
  },
  firestore () {
    return {
      appointments: db.collection('appointments')
      // ,agencies:db.collection('agencies')
    }
  },
  methods: {
  test(){
console.log(this.$_.pluck(this.agencies,'name'))
},
simpleSuggestionList() {
// let agencies = this.$_.pluck(this.appointments,'agency.agency_name');
// let agencies = this.$_.uniq(this.$_.pluck(this.appointments,'agency'));
let agencies = this.$_.uniq(this.$_.map(this.appointments,(apt)=>{
  return apt.agency.agency_name;
}));
        // let agencies = [
        //   {"agency_name":'Tommy'},
        //   {"agency_name":'John'},
        //   {"agency_name":'Hot Dog'}
        // ]
return agencies

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
    ,onSuggestAgencySelect (s){
      // we don't use ids for agencies (no point except to make specifically this easier)
// 0. filter by that agency's appts
// 1. reduce to id,date,address-on-file
// 2. sort by date, take newest
let this_agency_appts = this.$_.filter(this.appointments,(appt)=>{return appt.agency.agency_name==s});
let most_recent_appt = this.$_.last(this.$_.sortBy(this_agency_appts,(a)=>{return a.appointment.appointment_date_final}))


// 3. deposit data from newest into agency.* values
      this.agency.agency_addressstreet = (typeof most_recent_appt.agency.agency_addressstreet == 'undefined' || most_recent_appt.agency.agency_addressstreet=='')?"no address on file - please type it here":most_recent_appt.agency.agency_addressstreet;
      this.agency.agency_advocate_name = (typeof most_recent_appt.agency.agency_advocate_name == 'undefined' || most_recent_appt.agency.agency_advocate_name=='')?"no address on file - please type it here":most_recent_appt.agency.agency_advocate_name;
      this.agency.agency_advocate_title = (typeof most_recent_appt.agency.agency_advocate_title == 'undefined' || most_recent_appt.agency.agency_advocate_title=='')?"no job title on file for this agent - please type it here":most_recent_appt.agency.agency_advocate_title;    this.agency.agency_advocate_phone = (typeof most_recent_appt.agency.agency_advocate_phone == 'undefined' || most_recent_appt.agency.agency_advocate_phone=='')?"no job title on file for this agent - please type it here":most_recent_appt.agency.agency_advocate_phone;


    }
    ,onComplete (){
      console.log("form completed")
    }
    ,similar () {
      // console.log("typeof first",(typeof this.clients.primary.client_name_first));
      // console.log("typeof last",(typeof this.clients.primary.client_name_last));
      let names_extant = this.$_.uniq(this.$_.map(this.appointments,(appt)=>{
              return appt.clients.primary.client_name_last+", "+appt.clients.primary.client_name_first
            }))//map.uniq

      var name_current = this.clients.primary.client_name_last+', '+this.clients.primary.client_name_first

      let FLAGGED = this.$_.filter(this.$_.map(names_extant,(n)=>{
              let t = {name:n,levenshtein:this.$levenshtein(n, name_current)}
              console.log("t",t);
              return t
            }),(t)=>{
        return t.levenshtein<=5;
            });//flag
console.log("FLAGGED",FLAGGED);
if(FLAGGED.length>0){
  // this.flags.push({
  //   possible_duplicate_client:FLAGGED
  // })
  this.flags=this.$_.uniq(this.flags).push({possible_duplicate_client:FLAGGED})
}
      // console.log(FLAGGED);
      // console.log(FLAGGED.length);
      // if(this.clients.primary.client_name_last!==''&&this.clients.primary.client_name_first!=='')
      // {
        // console.log(this.$levenshtein(this.clients.primary.client_name_last+', '+this.clients.primary.client_name_first,names_extant))
      // }

      // console.log(this.$levenshtein('kitten', 'sitting'))

    }
    ,validaterex (type) {

let v = '';

switch(type){
  case 'address_street':
  v=this.agency.agency_addressstreet;
  break;
  case 'dob':
  v=this.clients.primary.client_dob;
  break;
  default:
  v='';
}

// let v = this.temp.agencyListChosen

if(typeof v !== 'undefined'){
  if(type=='dob'){

let vm = this.$moment(v).format('YYYY.MM.DD');
console.log("vm:",vm);

  }
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
}//if v
else {
  return false;
}
    }
    ,swap (which,event) {
      let nv = event.target.value.toLowerCase()
      console.log(this[which])
      this[which]=nv
      // this[which]=nv
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
