<template>
  <q-layout view="hHh lpR fFf">
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />

<!-- <link href="https://fonts.googleapis.com/css2?family=Niconne&display=swap" rel="stylesheet"> -->

    <q-header reveal elevated class="bg-secondary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <div class="row">
            <div class="col-auto q-mr-xs">
              <!-- <q-avatar square size="42px">
                <img src="statics/icons/favicon-128x128.png" contain />
              </q-avatar> -->
              <!-- <q-avatar square size="42px">
                <img src="~assets/logos/LogoMakr_Ring_RED.png" contain />
              </q-avatar>               -->

            <!-- <q-avatar square > -->
                <img         
                style="height: 50px;"
              class="my_logo" src="~assets/logos/rings_diamond_heart.svg" />
              <!-- </q-avatar>  -->

            </div>

             <div
              class="col-auto text-primary UM_title"
              style="font-family: 'Great Vibes', cursive ;font-size: 36px"
            > 
            <span class="text-white">Umiya</span>Matrimony.<span class="text-white">com</span>

            </div>

            <!-- <div
              class="col-auto text-secondary UM_title"
              style="font-family: 'Great Vibes', cursive; font-size: 35px"
            >            
              UmiyaMatrimony.com
               </div> -->
          </div>
        </q-toolbar-title>

      </q-toolbar>

    </q-header>

    <q-drawer
      content-class="bg-primary"
      :breakpoint="600"
      v-model="left"
      show-if-above
      side="left"
      elevated
      :width="250"
    >
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
    separator: true,
    role: 'user'

  },
  {
    icon: 'vpn_key',
    label: 'Change Password',
    link: '/change-password',
    loggedIn: true,
    separator: true
    // No roles means it is applicable for both
  },
  {
    icon: 'fas fa-tasks',
    label: 'Admin Approve Profile',
    link: '/admin-approval',
    loggedIn: true,
    separator: true,
    role: 'admin'
  },
  {
    icon: 'fas fa-tools',
    label: 'Admin Update Profile',
    link: '/admin-update-profile',
    loggedIn: true,
    separator: true,
    role: 'admin'
  }

]

export default {
  data () {
    return {
      drawer: false,
      left: false,
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
    }, // end of showMenuItem

    checkRole (role, menuItemRole) {
    //  console.log("Menu Item", role,menuItemRole)
      if (menuItemRole === undefined || menuItemRole === null) {
        return true
      } else if (menuItemRole === role) {
        return true
      } else if (menuItemRole !== role) {
        return false
      } else {
        return false
      }
    }

  },
  computed: {
    ...mapState('auth', ['loggedIn', 'role']),
    filteredMenuList () {
      var filterMenuList = []
      var loggedInStatus = this.loggedIn
      var menuItemLoginStatus, menuItem
      var role = this.role
      for (menuItem of this.menuList) {
        // console.log("Menu Item", menuItem, menuItem.role)
        menuItemLoginStatus = menuItem.loggedIn
        if (menuItemLoginStatus === undefined || menuItemLoginStatus === null) {
          if (this.checkRole(role, menuItem.role)) { filterMenuList.push(menuItem) }
        } else if (menuItemLoginStatus === false) {
          if (loggedInStatus === false) {
            if (this.checkRole(role, menuItem.role)) { filterMenuList.push(menuItem) }
          } else {
          // Don't add
            continue
          }
        } else if (menuItemLoginStatus === true) {
          if (loggedInStatus === true) {
            if (this.checkRole(role, menuItem.role)) { filterMenuList.push(menuItem) }
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

<style >
@media screen and (min-width: 599px) {
  .q-tabs {
    display: true;
  }
}


.q-drawer .q-router-link--active {
  color: #d63447 !important; 
   /* color : $primary !important; */
}

@media screen and (max-width: 500px) {
  .UM_title {
    font-size: 26px !important;
  }

  .my_logo{
    height: 40px !important;
  }
}

@media (max-width: @screen-sm) {
  .UM_title {
    font-size: 14px;
  }
}

</style>
