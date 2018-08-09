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
        v-model="agency"
        value-attribute="_id"
  display-attribute="this.agency_name"
        :list="simpleSuggestionList"
        :filter-by-query="true"
        @hover="onSuggestSelect"
          >
    <!-- Filter by input text to only show the matching results -->
      </vue-simple-suggest>
  </div>
</div><!-- ./field -->



<!-- ******************************************************************* FIELD -->
<div class="field">
  <label class="label">Agency Address</label>
  <div class="control has-icons-right">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    <input class="input" type="text" v-model="referringAgency.address" placeholder="">
    <span class="icon is-small is-right">
    <i class="mdi" v-bind:class="{'has-text-success':(validaterex('referringAgency.address','address_street').success==true),'mdi-check':(validaterex('referringAgency.address','address_street').success==true),'mdi-alert':(validaterex('referringAgency.address','address_street').success==false),'has-text-danger':(validaterex('referringAgency.address','address_street').success==false),'has-text-warning':(validaterex('referringAgency.address','address_street').success==false)}"></i>
  </span>
  </input>
    <em v-bind:class="{'is-hidden':(validaterex('referringAgency.address','address_street').success==0)}">{{validaterex('referringAgency.address','address_street').reason}}</em>
=======
    <input class="input" type="text" v-model="agency.address" placeholder="">
=======
    <input class="input" type="text" v-model="agency" placeholder="">
>>>>>>> cca7d1c9d250a1be58bdf2d2a8c51f46e153283a
=======
    <input class="input" type="text" v-model="agency.agency_addressstreet" placeholder="">
>>>>>>> 1271268c268c010b7946b9b38a479339192ad7b9
    <span class="icon is-small is-right">
<i class="mdi" v-bind:class="{'has-text-success':(validaterex('address_street').success==true),'mdi-check':(validaterex('address_street').success==true),'mdi-alert':(validaterex('address_street').success==false),'has-text-danger':(validaterex('address_street').success==false),'has-text-warning':(validaterex('address_street').success==false)}"></i>
  </span>
  </input>
<<<<<<< HEAD
    <em v-bind:class="{'is-hidden':(validaterex('agency.address','address_street').success==0)}">{{validaterex('agency.address','address_street').reason}}</em>
>>>>>>> 1b4678d2ef9bac2a4bae571645fe8c12a5b2ab09
  </div>
</div>
<!-- ******************************************************************* -->
<div class="field">
  <label class="label">Agency Contact Name</label>
  <div class="control">
<<<<<<< HEAD
    <input class="input" type="text" v-model="referringAgency.advocate_name" placeholder="autofill frm prior submissions">
=======
    <input class="input" type="text" v-model="agency.contactname" placeholder="autofill frm prior submissions">
>>>>>>> 1b4678d2ef9bac2a4bae571645fe8c12a5b2ab09
  </div>
</div>
<!-- ******************************************************************* -->
<div class="field">
  <label class="label">Agency Contact Job Title</label>
  <div class="control">
<<<<<<< HEAD
    <input class="input" type="text" v-model="referringAgency.advocate_title" placeholder="autofill frm prior submissionsa">
=======
    <input class="input" type="text" v-model="agency.contacttitle" placeholder="autofill frm prior submissionsa">
>>>>>>> 1b4678d2ef9bac2a4bae571645fe8c12a5b2ab09
  </div>
</div>
<!-- ******************************************************************* -->
<div class="field">
  <label class="label">Agency Contact Phone Number(s)</label>
  <div class="control">
<<<<<<< HEAD
    <input class="input" type="text" v-model="referringAgency.advocate_phone" placeholder="e.g. '617-555-1777' or '617-555-1777, 617.555.0010'">
=======
    <input class="input" type="text" v-model="agency.contactphone" placeholder="e.g. '617-555-1777' or '617-555-1777, 617.555.0010'">
>>>>>>> 1b4678d2ef9bac2a4bae571645fe8c12a5b2ab09
=======
>>>>>>> cca7d1c9d250a1be58bdf2d2a8c51f46e153283a
  </div>
</div><!-- ./field -->








  </tab-content>
  <tab-content title="Client">
      detail stuff
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
<<<<<<< HEAD
      temp: {
        "agencyListChosen": null
      },
      name: '',
      image: '',
referringAgency:{
  name: '',
  address: '1122 Boogie Woogie Av.',
  advocate_name: 'referringAgencyContactName',
  advocate_title: 'referringAgencyContactTitle',
  advocate_phone: 'referringAgencyContactPhone',
},
clients:{
  [
  {name_first: 'clientName',
  name_middle: 'clientName',
  name_last: 'clientName'},
  {name_first: 'clientName',
  name_middle: 'clientName',
  name_last: 'clientName'}
]
},
client_prim:{
address_street: 'addressstreet',
phone: 'phone',
email: 'email'
},
appointment:
{
  communicatepref: 'email',
  english: "yes",
climbstairs: 'yes',
countadults: 0,
countchildren: 0,
transpo: 'professional',
clienttravelmode: [
{key:'train',status:false,label:"Train"}
,{key:'bus',status:false,label:"Bus"}
,{key:'car',status:false,label:"Car"}
,{key:'movingvan',status:true,label:"Moving Van"}
],
needitemslarge: [
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
needitemssmall: [],
needitemskitchen: []
}
//appointment
=======
  "temp": {
    "agencyListChosen": ''
  },
  "ops":[],
  "agency": {
      "agency_name": "Medfield Youth Outreach",
      "agency_addressstreet":"",
      "agency_advocate_name": "Lawless, Liz",
      "agency_advocate_title": "",
      "agency_advocate_phone":""
    },
  "clients":{
    "primary":{
        "client_name_first": "Stacey",
        "client_name_last": "Morrison",
        "client_dob": "",
        "client_phone": "",
        "client_email": "",
        "client_addressstreet": "Medfield",
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
>>>>>>> cca7d1c9d250a1be58bdf2d2a8c51f46e153283a
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
      console.log(referringAgency.name)
    }
    ,onSuggestSelect (s){
      var address_msg = (s.address=='')?"(no address on file - please type it here)":s.address
<<<<<<< HEAD
      this.referringAgency.address = address_msg
=======
      this.agency.address = address_msg
>>>>>>> 1b4678d2ef9bac2a4bae571645fe8c12a5b2ab09
    }
    ,onComplete (){
      console.log("form completed")
    }
    ,validaterex (type) {

let v = '';

switch(type){
  case 'address_street':
  v=this.agency.agency_addressstreet;
  break;
  default:
  v='';
}

// let v = this.temp.agencyListChosen

if(typeof v !== 'undefined'){
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
