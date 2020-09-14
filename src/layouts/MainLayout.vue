<template>
  <q-layout view="hHh lpR fFf">
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <div class="row">
            <div class="col-auto q-mr-xs">
              <q-avatar square size="42px">
                <img src="~assets/logos/LogoMakr_Ring_RED.png" size="50%" />
              </q-avatar>
            </div>
            <div
              class="col-auto text-secondary UM_title"
              style="font-family: 'Great Vibes', cursive ;font-size: 36px"
            >
              <span class="text-white">Umiya</span>Matrimony.
              <span class="text-white">com</span>
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
      :breakpoint="600"
      show-if-above
      v-model="left"
      side="left"
      elevated
      :width="250"
    >
      <!-- <q-scroll-area class="fit"> -->
      <q-list
        v-for="(menuItem, index) in filteredMenuList"
        :key="index"
      >
        <q-item exact class="text-grey-1" :to="menuItem.link"
         v-ripple>
          <q-item-section avatar>
            <q-icon :name="menuItem.icon" />
          </q-item-section>
          <q-item-section>{{ menuItem.label }}</q-item-section>
        </q-item>

        <q-separator v-if="menuItem.separator" />
      </q-list>
<!--
      <q-list>
        <q-item v-if="!loggedIn" exact class="text-grey-1" to="/login" v-ripple>
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>Login</q-item-section>
        </q-item>
        <q-item v-else exact class="text-grey-1" clickable @click="logout" v-ripple>
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>Logout</q-item-section>
        </q-item>

      </q-list> -->
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
    icon: 'home',
    label: 'Home',
    link: '/',
    separator: true
  },
  {
    icon: 'toggle_on',
    label: 'Login',
    link: '/login',
    separator: true,
    loggedIn: false

  },
  {
    icon: 'toggle_off',
    label: 'Logout',
    link: '/logout',
    separator: true,
    loggedIn: true,
    clicable: true
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
  },
  {
    icon: 'assignment_ind',
    label: 'Profile',
    link: '/profile',
    loggedIn: true,
    separator: true
  },
  {
    icon: 'edit',
    label: 'Update Profile',
    link: '/update-profile',
    loggedIn: true,
    separator: true
  }


]

export default {
  data () {
    return {
      drawer: false,
      left: true,
      menuList
    }
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    logout () {
      this.logoutUser()
      this.$q.notify({
        type: 'positive',
        message: 'You are now logged out'
      })
      this.$router.push('/')
    },
    showMenuItem (menuItem) {
      var loggedInStatus = this.loggedIn
      var menuItemLoginStatus = menuItem.loggedIn
      if (menuItemLoginStatus === undefined || menuItemLoginStatus === null) {
        return true
      } else if (menuItemLoginStatus === false) {
        if (loggedInStatus === false) {
          return true
        } else {
          return false
        }
      } else if (menuItemLoginStatus === true) {
        if (loggedInStatus === true) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    } // end of showMenuItem

  },
  computed: {
    ...mapState('auth', ['loggedIn']),
    filteredMenuList () {
      var filterMenuList = []
      var loggedInStatus = this.loggedIn
      var menuItemLoginStatus, menuItem
      for (menuItem of this.menuList) {
        menuItemLoginStatus = menuItem.loggedIn
        if (menuItemLoginStatus === undefined || menuItemLoginStatus === null) {
          filterMenuList.push(menuItem)
        } else if (menuItemLoginStatus === false) {
          if (loggedInStatus === false) {
            filterMenuList.push(menuItem)
          } else {
          // Don't add
            continue
          }
        } else if (menuItemLoginStatus === true) {
          if (loggedInStatus === true) {
            filterMenuList.push(menuItem)
          } else {
          // Don't add
            continue
          }
        } else {
        // Don't add
          continue
        }
      } // end of showMenuItem
      return filterMenuList
    }

  }
}
</script>

<style>
@media screen and (min-width: 599px) {
  .q-tabs {
    display: true;
  }
}

.q-drawer .q-router-link--active {
  color: #ffd31d !important;
}

@media screen and (max-width: 500px) {
  .UM_title {
    font-size: 30px !important;
  }
}

@media (max-width: @screen-sm) {
  .UM_title {
    font-size: 14px;
  }
}
</style>
