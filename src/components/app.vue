<template>
  <f7-app :params="f7params" >

  <!-- Left panel with cover effect when hidden -->
  <f7-panel right cover theme-dark :visible-breakpoint="960">
    <f7-view>
      <f7-page>


        <side-panel></side-panel>

      </f7-page>
    </f7-view>
  </f7-panel>


  <!-- Your main view, should have "view-main" class -->
  <f7-view main class="safe-areas" url="/"></f7-view>


    <!-- Popup -->
    <f7-popup id="my-popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Popup">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <p>Popup content goes here.</p>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-login-screen id="my-login-screen">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Login</f7-login-screen-title>
          <f7-list form>
            <f7-list-input
              type="text"
              name="username"
              placeholder="Your username"
              :value="username"
              @input="username = $event.target.value"
            ></f7-list-input>
            <f7-list-input
              type="password"
              name="password"
              placeholder="Your password"
              :value="password"
              @input="password = $event.target.value"
            ></f7-list-input>
          </f7-list>
          <f7-list>
            <f7-list-button title="Sign In" @click="alertLoginData"></f7-list-button>
            <f7-block-footer>
              Some text about login information.<br>Click "Sign In" to close Login Screen
            </f7-block-footer>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>
  </f7-app>
</template>
<script>
  import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
  import cordovaApp from '../js/cordova-app.js';
  import routes from '../js/routes.js';
  import SidePanel from '../components/SidePanel.vue';
  import menu from '../js/menu.js';
  import Vue from 'vue'

  export default {

    items: [],
    nextItemID: 1,

    checkItems(button_id) {
      for (const i in this.items) {
        if (button_id == this.items[i].spesh_id) {
          return true;
        }
      }
    },

    getItem(button_id) {
      let length = menu.length;

      for (var i = 0; i < length; i += 1) {
          if (button_id == menu[i].button_id) {
            if (this.checkItems(menu[i].button_id)) {
              this.updateItem(menu[i].button_id);
            }
            else {
              this.items.push({

                id: this.nextItemID++,
                name: menu[i].name,
                price: menu[i].price,
                spesh_id: menu[i].button_id,
                quantity: 1, });

                console.table(this.items);
                console.table(menu);

                break;
            }
          }
        }
    },

    updateItem(spesh_id) {
      for (const i in this.items) {
        if (spesh_id == this.items[i].spesh_id) {
          Vue.set(this.items, 'quantity', this.items[i].quantity++);
          console.table(this.items);
          console.table(menu);
        }
      }
      //var newPrice = (this.items[i].quantity * menu[i].price)+menu[i].price;
      //newPrice = parseFloat(newPrice.toFixed(2));

      //Vue.set(this.items[i], this.items[i], (this.items[i].price=newPrice));


    },

    components: {
      'side-panel': SidePanel
    },

    data() {
      return {
        // Framework7 Parameters
        f7params: {
          id: 'io.framework7.myapp', // App bundle ID
          name: 'project_epos', // App name
          theme: 'auto', // Automatic theme detection

          // App routes
          routes: routes,

        // Input settings
          input: {
            scrollIntoViewOnFocus: Device.cordova && !Device.electron,
            scrollIntoViewCentered: Device.cordova && !Device.electron,
          },
          // Cordova Statusbar settings
          statusbar: {
            iosOverlaysWebView: true,
            androidOverlaysWebView: false,
          },
        },

      // Login screen data
        username: '',
        password: '',
      }
    },

    methods: {
      alertLoginData() {
        this.$f7.dialog.alert('Username: ' + this.username + '<br>Password: ' + this.password, () => {
          this.$f7.loginScreen.close();
        });
      },
    },

    mounted() {
      this.$f7ready((f7) => {
        // Init cordova APIs (see cordova-app.js)
        if (Device.cordova) {
          cordovaApp.init(f7);
        }
        // Call F7 APIs here
      });
    }
  }

</script>
