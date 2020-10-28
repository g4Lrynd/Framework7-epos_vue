<template>
  <f7-app :params="f7params" >

  <!-- Left panel with cover effect when hidden -->
  <f7-panel right cover theme-dark :visible-breakpoint="960">
    <f7-view>

        <side-panel></side-panel>

    </f7-view>
  </f7-panel>


  <!-- Your main view, should have "view-main" class -->
  <f7-view main class="safe-areas" url="/" ></f7-view>



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
  </f7-app>
</template>
<script>
  import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
  import cordovaApp from '../js/cordova-app.js';
  import routes from '../js/routes.js';
  import sidepanel from '../components/sidepanel.vue';
  import menu from '../js/menu.js';
  import Vue from 'vue'

  export default {

    items: [], // aka the basket, this is displayed as list in sidepanel component
    nextItemID: 1,
    options: [],

    // DO SOME OBJECT DESTRUCTERING
    // YOU CAN USE ARROW FUNCTIONS
    // pushes selected menu item from menu.js to items
    getItem(button_id) {
      let length = menu.length;

      for (const i in menu) {
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
              //console.table(menu);

              break;
          }
        }
      }
    },

    // returns false if the a menu item has already been added to items
    checkItems(button_id) {
      for (const i in this.items) {
        if (button_id == this.items[i].spesh_id) {
          return true;
        }
      }
    },

    // instead of adding new item to items it updates the quantity and price 
    updateItem(spesh_id) {
      for (const i in this.items) {
        if (spesh_id == this.items[i].spesh_id) {
          var newPrice = (this.items[i].quantity * menu[i].price)+menu[i].price;
          newPrice = parseFloat(newPrice.toFixed(2));

          Vue.set(this.items, 'price', (this.items[i].price=newPrice));
          Vue.set(this.items, 'quantity', this.items[i].quantity++);
          
        }
      }
    },

    components: {
      'side-panel': sidepanel
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
      }
    },

    methods: {
    
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
