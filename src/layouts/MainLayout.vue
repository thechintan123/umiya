<template>

  <q-layout view="hHh lpR fFf">
      <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title >
        <div class="row">
        <div class="col-auto q-mr-xs">
          <q-avatar square size="42px">
            <img src="~assets/logos/LogoMakr_Ring_RED.png" size=50%>
          </q-avatar>
         </div>
          <div class="col-auto text-secondary UM_title" style="font-family: 'Great Vibes', cursive ;font-size: 36px">
          UmiyaMatrimony.<span class="text-dark">com</span>
          </div>
          </div>
        </q-toolbar-title>

<!--
        <q-btn
          v-if="!loggedIn"
          flat
          label="Login"
          icon-right="account_circle"
          class="absolute-right"
          to="/login"
        />

        <q-btn
          v-else
          flat
          label="Logout"
          icon-right="account_circle"
          class="absolute-right"
          @click="logout"
        />
-->
      </q-toolbar>

<!--
      <q-tabs align="left">
        <q-route-tab to = "/One" label="Page One" />
        <q-route-tab to = "/Two" label="Page Two" />
        <q-route-tab to = "/Three" label="Page Three" />
      </q-tabs>
-->
    </q-header>

    <!--

    <q-footer elevated>
      <q-tabs
       align="center">
       <q-route-tab v-for="link in menuList"
        :key="link.title"
        :name="link.title"
        :icon="link.icon"
        :label="link.title" :to="link.link"/>
      </q-tabs>
      </q-footer>

-->

    <q-drawer
    content-class="bg-secondary"
     :breakpoint = "600"
    show-if-above v-model="left" side="left" elevated
    :width="250"
    >
             <!-- <q-scroll-area class="fit"> -->
          <q-list v-for="(menuItem, index) in menuList" :key="index">

            <q-item
             class="text-grey-1"
            clickable :active="menuItem.label === 'Outbox'"
            :to="menuItem.link"
            v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>

           <q-separator v-if="menuItem.separator" />

          </q-list>
       <!-- </q-scroll-area> -->

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'

const menuList = [

  {
    icon: 'account_circle',
    label: 'Login',
    link: '/login',
    separator: true
  },
  {
    icon: 'person_add',
    label: 'Register',
    link: '/register',
    separator: true
  },
  {
    icon: 'search',
    label: 'Search',
    link: '/search',
    separator: true
  }
  /*
  ,
  {
    icon: 'delete',
    label: 'Trash',
    separator: false
  },
  {
    icon: 'error',
    label: 'Spam',
    separator: true
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false
  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
    separator: false
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false
  }
  */
]

export default {
  data () {
    return {
      drawer: false,
      left: false,
      menuList
    }
  },
  computed: {
    ...mapState('auth', ['loggedIn'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    logout () {
      this.logoutUser()
    }
  },
  watch: {
    loggedIn (newValue) {
      if (newValue) {
        this.$q.notify('You are now logged in')
      } else {
        this.$q.notify('You are now logged out')
      }
    }
  }
}
</script>

<style>

@media screen and (min-width : 599px){
.q-tabs{
  display: true;
}
}

.q-drawer  .q-router-link--active{
    color : #ffd31d !important
  }

@media screen and (max-width : 500px) {
.UM_title{
    font-size: 30px !important;
  }
}

@media (max-width: @screen-sm) {
.UM_title{
    font-size: 14px;
    }
}

</style>
