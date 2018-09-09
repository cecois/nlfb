<template>
<div>

  <div class='authentification'>
    <!-- if we aren't authorized we need a button for same -->
    <button id="authorize_button" v-if='!gc_authorized' @click="handleAuthClick">Sign In</button>
    <!-- <button id="signout_button" v-if='gc_authorized' @click="handleSignoutClick">Sign Out</button> -->
  </div>
  <hr>
  <button v-if='gc_authorized' @click="createGCEvent">EventMe</button>
  <!-- <div class="item-container" v-if="gc_authorized && gc_items">
    <pre v-html="gc_items"></pre>
  </div> -->

<form @submit="testAppointment('fill this in w/ form data later')">
<form-wizard @on-complete="onComplete"
:start-index="4"
                      title="This is a new title"
                      subtitle="And a new subtitle"
                      color="#9b59b6">
  <tab-content class="" title="Agency" icon="mdi mdi-account">


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
</div>




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


  <tab-content title="Client(s)" >


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
            <input type="radio" value="true" v-model="clients.primary.client_isveteran" name="bt-radio-veteran" checked></input></div>
          Client is a US Veteran
        </label>
</div>

<h5 class="is-size-5">Add'l Clients</h5>up zz
<ul id="clients_related">
  <li v-for="client in clients.related">
    <!-- ******************************************************************* FIELD -->
      <div class="field">
        <label class="label">Add'l Client: First Name</label>
        <div class="control">
          <input class="input" type="text" v-model="client.client_name_first">
        </div>
      </div>
<!-- ******************************************************************* FIELD -->
      <div class="field">
        <label class="label">Add'l Client: Last Name</label>
        <div class="control">
          <input class="input" type="text" v-model="client.client_name_last">
        </div>
      </div>
  </li>
</ul>
<span class="icon">
<i v-on:click="add_client_addl" class="mdi mdi-plus"/>
</span>

   </tab-content>


<!-- <tab-content title="Add'l Clients">
<ul id="clients_related">
  <li v-for="client in clients.related">
      <div class="field">
        <label class="label">Add'l Client: First Name</label>
        <div class="control">
          <input class="input" type="text" v-model="client.client_name_first">
        </div>
      </div>
      <div class="field">
        <label class="label">Add'l Client: Last Name</label>
        <div class="control">
          <input class="input" type="text" v-model="client.client_name_last">
        </div>
      </div>
  </li>
</ul>
<span class="icon">
<i v-on:click="add_client_addl" class="mdi mdi-plus"/>
</span>
</tab-content>
 -->

   <tab-content title="Appointment">
<!-- ******************************************************************* FIELD -->
         <div class="field has-text-centered">
  <label class="label">What's the best way to communicate with the client?</label>
  <div class="control">
    <div class="buttons">
  <button class="button" v-on:click.self.prevent v-on:click="swap_com_pref($event)" value="phone" v-model="appointment.communicatepref" v-bind:class="{'is-black':(appointment.communicatepref === 'phone')}">Phone</button>
  <button class="button" v-on:click.self.prevent v-on:click="swap_com_pref($event)" value="text" v-model="appointment.communicatepref" v-bind:class="{'is-black':(appointment.communicatepref === 'text')}">Text</button>
  <button class="button" v-on:click.self.prevent v-on:click="swap_com_pref($event)" value="email" v-model="appointment.communicatepref" v-bind:class="{'is-black':(appointment.communicatepref === 'email')}">Email</button>
</div><!-- /.buttons -->
  </div><!-- /.control -->
</div><!-- /.field -->


<!-- ******************************************************************* FIELD -->
<div class="field has-text-centered">
  <div class="field-label">
    <label class="label">Does the client speak English?</label>
  </div>
  <div class="field-body">
    <div class="field is-narrow">
      <div class="control">
        <button class="button" v-on:click.self.prevent v-on:click="swap_lang_pref($event)" v-model="appointment.english" value="true" v-bind:class="{'is-black':(appointment.english === 'true')}">Yes</button>
  <button class="button" v-on:click.self.prevent v-on:click="swap_lang_pref($event)" v-model="appointment.english" value="false" v-bind:class="{'is-black':(appointment.english === 'false')}">No</button>
      </div><!-- /.control -->
    </div>
  </div>
  <em v-if="appointment.english=='no'">(You selected "no" - the client must bring an English speaking person to the warehouse to translate.)</em>
</div><!-- /.field -->



<!-- ******************************************************************* FIELD -->
<div class="field has-text-centered">
  <div class="field-label">
    <label class="label">Is client able to climb 3 flights of stairs?</label>
  </div>
  <div class="field-body">
    <div class="field">
      <div class="control">
        <button class="button" v-on:click.self.prevent v-on:click="swap_stairs_pref($event)" v-model="appointment.climbstairs" value="true" v-bind:class="{'is-black':(appointment.climbstairs === 'true')}">Yes</button>
  <button class="button" v-on:click.self.prevent v-on:click="swap_stairs_pref($event)" v-model="appointment.climbstairs" value="false" v-bind:class="{'is-black':(appointment.climbstairs === 'false')}">No</button>
      </div><!-- /.control -->
    </div>
  </div>
</div><!-- /.field -->



<!-- ******************************************************************* FIELD -->
<div class="field has-text-centered">
  <div class="field-label">
    <label class="label">Does client require wheelchair access?</label>
  </div>
  <div class="field-body">
    <!-- <div class="field"> -->
      <div class="control">
        <button class="button" v-on:click.self.prevent v-on:click="swap_wheelchair_pref($event)" v-model="appointment.wheelchair" value="true" v-bind:class="{'is-black':(appointment.wheelchair === 'true')}">Yes</button>
  <button class="button" v-on:click.self.prevent v-on:click="swap_wheelchair_pref($event)" v-model="appointment.wheelchair" value="false" v-bind:class="{'is-black':(appointment.wheelchair === 'false')}">No</button>
      </div><!-- /.control -->
    <!-- </div> -->
  </div>
</div><!-- /.field -->



<!-- ******************************************************************* NON-FIELD -->
<div class="has-text-danger has-text-centered is-size-3">Our warehouse is NOT a safe environment for children.</div>



<!-- ******************************************************************* FIELD -->
<div class="field">
  <label class="label"># adults (18+) living in home</label>
  <div class="control has-icons-right">
    <input class="input" type="text" v-model="appointment.countadults" placeholder="">
    <span class="icon is-small is-right">
      <i class="mdi" v-bind:class="{'has-text-success':appointment.countadults>0,'mdi-check':isNaN(appointment.countadults)==false,'mdi-alert':isNaN(appointment.countadults)==true||appointment.countadults=='','has-text-danger':isNaN(appointment.countadults)==true,'has-text-warning':appointment.countadults==''}"></i>
    </span>

  </div>
</div>
<em v-if="isNaN(appointment.countadults)==true">this needs to be a number</em>



<!-- ******************************************************************* FIELD -->
<div class="field">
  <label class="label"># children (17 and under) living in home</label>
  <div class="control has-icons-right">
    <input class="input" type="text" v-model="appointment.countchildren" placeholder="">
        <span class="icon is-small is-right">
      <i class="mdi" v-bind:class="{'has-text-success':appointment.countchildren>0,'mdi-check':isNaN(appointment.countchildren)==false,'mdi-alert':isNaN(appointment.countchildren)==true||appointment.countchildren=='','has-text-danger':isNaN(appointment.countchildren)==true,'has-text-warning':appointment.countchildren==''}"></i>
    </span>
  </div>
</div>
<em v-if="isNaN(appointment.countchildren)==true">this needs to be a number</em>


<!-- ******************************************************************* FIELD -->
<div class="field">
  <div class="field-label">
    <label class="has-text-left label">Moving Transportation:</label>
  </div>
  <div class="field-body">
      <div class="control">
        <label class="radio">
          <input type="radio" value="professional" v-model="appointment.transpo" name="bt-radio-transpo"></input>Referring Agency has arranged professional movers</label>
        <label class="radio">
          <input type="radio" value="self" v-model="appointment.transpo" name="bt-radio-transpo" checked></input>
          Client will bring box truck (rental or other) and moving helper
        </label>
      </div><!-- /.control -->
  </div><!-- /.field-body -->
</div><!-- /.field -->



<!-- ******************************************************************* FIELD -->
<div class="field" v-if="appointment.transpo == 'professional'">
  <div class="field-label">
    <label class="has-text-left label">Professional movers. Please select how the client will travel to warehouse to meet moving van.</label>
  </div><!-- /.field-label -->
  <div class="field-body">
      <div class="control">
<label class="radio" v-if="appointment.travelmode!==null" v-for="(mode) in appointment.travelmode">
<input type="radio" name="bt-radio-travelMode" :checked="mode.status" @click="changeStatusRadio('appointment.travelmode',mode.key)">
{{mode.label}}
</input>
</label>

      </div><!-- /.control -->
  </div><!-- /.field-body -->
  <p class="has-text-centered"><em>(Freight elevator available if necessary.)</em></p>
</div><!-- /.field -->
</tab-content>

<tab-content title="Client Needs">

<!-- ******************************************************************* FIELD -->
<div class="field">
  <label class="label">Mattress(es)</label >
  <div class="control">
    <div class="buttons">
<button v-on:click.self.prevent v-for="mattress in appointment.needs.mattresses" @click="mattress.status=!mattress.status" class="button" v-bind:class="{ 'is-black':mattress.status }">{{mattress.label}}</button>
</div>
  </div>
</div>

<!-- ******************************************************************* FIELD -->
<div class="field">
  <label class="label">Large Items</label >
  <div class="control">
    <div class="buttons">
<button v-on:click.self.prevent v-for="need in appointment.needs.large" @click="need.status=!need.status" class="button" v-bind:class="{ 'is-black':need.status }">{{need.label}}</button>
</div>
  </div>
</div>

<!-- ******************************************************************* FIELD -->
<div class="field">
  <label class="label">Small Appliances (comma-delimited)</label>
  <div class="control">
    <input class="input" type="text" v-model="appointment.needs.small" v-on:keyup="prepSmallArray($event)">
  </div>
</div>

<!-- ******************************************************************* FIELD -->
      <div class="field">
  <label class="label">Kitchen Items (comma-delimited)</label>
  <div class="control">
    <input class="input" type="text" v-on:keyup="prepKitchenArray($event)">
  </div>
</div>

<!-- ******************************************************************* FIELD -->
<div class="field">
  <label class="label">Appointment Comments</label>
  <div class="control">
    <input class="input" type="text" v-model="appointment.comments_client"/>
  </div><!-- .control -->
  </div><!-- .field -->

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

  // Client ID and API key from the Developer Console
// const CLIENT_ID = '230137934084-ikbhaf92sv0g7i95gs74ojg2bahlsh24.apps.googleusercontent.com';
// const API_KEY = 'AIzaSyBm5zyDSJlclRJv0ToTK2_r-DbYPveUam8';

const CLIENT_ID = process.env.G_CLIENT_ID;
const API_KEY = process.env.G_API_KEY;
// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar';



import { db } from '../main'

export default {
  name: 'Default',
  data () {
    return {
       gc_items: undefined,
      gc_api: undefined,
      gc_authorized: false,
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
        "client_isveteran": "false",
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
    "appointment_calobj": {},
      "appointment_countadults": 1,
      "appointment_countchildren": 0,
    "communicatepref": "email",
    "english": "true",
    "climbstairs": "true",
    "wheelchair": "false",
    "countadults": 0,
    "countchildren": 0,
    "transpo": "",
    "travelmode": [
      {
        "key": "train",
        "status": "false",
        "label": "Train"
      },
      {
        "key": "bus",
        "status": "false",
        "label": "Bus"
      },
      {
        "key": "car",
        "status": "false",
        "label": "Car"
      },
      {
        "key": "movingvan",
        "status": "true",
        "label": "Moving Van"
      }
    ],
    "needs": {
      "large": [
        {
          "key": "couch",
          "status": false,
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
        "status": false,
        "label": "Twin Mattress"
      }
      ,{
        "key": "twin_box",
        "status": false,
        "label": "Twin Box Spring"
      },{
        "key": "double",
        "status": false,
        "label": "Double Mattress"
      }
      ,{
        "key": "double_box",
        "status": false,
        "label": "Double Box Spring"
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
  created() {
    this.gc_api = gapi;
    this.handleClientLoad();
  },
  mounted() {
  // console.log("NE:",process.env.NODE_ENV)
  // console.log("process.env::",process.env)
},
  methods: {
    add_client_addl(){
this.clients.related.push({})
    },
    getAppointmentDate(){

// NEEDS CONFIRM - some pro/self logic goes here
let delaydays = (this.appointment.transpo=='professional')?7:0;

// 1. call to gcal - whats the first hour during open hours of business on or after that date?
// WE NEED here: open hours and a source of occasional/emergency closures

    }
  ,test(){
console.log(this.$_.pluck(this.agencies,'name'))
},
simpleSuggestionList() {
let agencies = this.$_.uniq(this.$_.map(this.appointments,(apt)=>{
  return apt.agency.agency_name;
}));
return agencies

      },
    addAppointment (name, image) {
      // const createdAt = new Date()

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
    ,prepKitchenArray (event) {
this.appointment.needs.kitchen=this.$_.map(event.target.value.split(","),(e)=>{return e.trim();});
    }
    ,prepSmallArray (event) {
this.appointment.needs.small=this.$_.map(event.target.value.split(","),(e)=>{return e.trim();});
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
      console.log(JSON.stringify(this))
    }
    ,similar () {

      let names_extant = this.$_.uniq(this.$_.map(this.appointments,(appt)=>{
        var names=[]
        names.push(appt.clients.primary.client_name_last+", "+appt.clients.primary.client_name_first)

        this.$_.each(appt.clients.related,(cr)=>{
          if(cr.client_name_last.length>0 && cr.client_name_first.length>0){
                    names.push(cr.client_name_last+", "+cr.client_name_first);}
        })
      return names
            }))//map.uniq


      var name_current = this.clients.primary.client_name_last+', '+this.clients.primary.client_name_first

      let FLAGGED = this.$_.filter(this.$_.map(names_extant,(n)=>{
if(this.$levenshtein(n, name_current)<10){console.log("n",n);console.log("nc",name_current)}
              let t = {name:n,levenshtein:this.$levenshtein(n, name_current)}
              console.log("t",t);
              return t
            }),(t)=>{
        return t.levenshtein<=5;
            });//flag
console.log("FLAGGED",FLAGGED);
if(FLAGGED.length>0){

  this.flags=this.$_.uniq(this.flags).push({possible_duplicate_client:FLAGGED})
}

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
  break;
  case 'phone_agency':
  v=this.agency.agency_advocate_phone;
  break;
  break;
  case 'phone_client':
  v=this.clients.primary.client_phone;
  break;
  default:
  v='';
}

if(typeof v !== 'undefined'){
  if(type=='phone_agency'||type=='phone_client'){
    return (v.replace(/[^0-9]/g,"").length==10)?{success:true}:{success:"false",reason:"too few or too many digits"}
  }
  if(type=='dob'){

let vm = this.$moment(v).format('YYYY.MM.DD');
console.log("vm:",vm);

  }
if(type=='address_street'){
let clauses = v.split(",")
let re = {success:"false",reason:"missing address components"};

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
    ,swap_com_pref (event) {

      let nv = event.target.value.toLowerCase()
      this.appointment.communicatepref=nv
    },swap_lang_pref (event) {

      let nv = event.target.value.toLowerCase()
      this.appointment.english=nv
    },swap_stairs_pref (event) {

      let nv = event.target.value.toLowerCase()
      this.appointment.climbstairs=nv
    },swap_wheelchair_pref (event) {

      let nv = event.target.value.toLowerCase()
      this.appointment.wheelchair=nv
    }

/** ---------------------------------------------------------- GCAL --------------- **/

/**
     *  On load, called to load the auth2 library and API client library.
     */
    ,handleClientLoad() {
      this.gc_api.load('client:auth2', this.initClient);
    }

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    ,initClient() {
      let vm = this;

      vm.gc_api.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(_ => {
        // Listen for sign-in state changes.
        vm.gc_api.auth2.getAuthInstance().isSignedIn.listen(vm.gc_authorized);
      });
    }

    /**
     *  Sign in the user upon button click.
     */
    ,handleAuthClick(event) {
      Promise.resolve(this.gc_api.auth2.getAuthInstance().signIn())
        .then(_ => {
          this.gc_authorized = true;
        });
    }

    /**
     *  Sign out the user upon button click.
     */
    ,handleSignoutClick(event) {
      Promise.resolve(this.gc_api.auth2.getAuthInstance().signOut())
        .then(_ => {
          this.gc_authorized = false;
        });
    }
    ,createGCEvent(){

      var event = {
  'summary': 'Sample Event',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'we will see - bring a jacket',
  'start': {
    'dateTime': '2018-09-09T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'end': {
    'dateTime': '2018-09-10T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=1'
  ],
  'attendees': [],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10}
    ]
  }
};

var request = gapi.client.calendar.events.insert({
  'calendarId': 'primary',
  'resource': event
});

var EV = request.execute(function(event){
console.log(event);
// this.appointment.appointment_calobj=event
return event
});

console.log("EV:",EV);


    }
    /**
     * Print the summary and start datetime/date of the next ten events in
     * the authorized user's calendar. If no events are found an
     * appropriate message is printed.
     */
    ,getData() {
      let vm = this;

      vm.gc_api.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      }).then(response => {
        vm.gc_items = this.syntaxHighlight(response.result.items);
        console.log(vm.gc_items);
      });
    }

,syntaxHighlight(json) {
      if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
      }
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {
        var cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      });
    }


/** ---------------------------------------------------------- /GCAL --------------- **/

  },//methods
  computed: {

}//computed
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.authentification {
  margin: 20px;
  text-align: center;
}

.wizard-nav-pills{
  width:50%;
}
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
