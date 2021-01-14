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
    nextItemID: 1, // gives each added item a unique id

    // used by menu item buttons in home.vue and pushes selected menu item from menu.js to items
    getItem(id) {
      let length = menu.length;

      for (const i in menu) {
        const { name, price, button_id } = menu[i];

        if (id == button_id) {
          if (this.checkItems(button_id)) {
            this.updateItem(button_id);
          }
          else {
            this.items.push({
              id: this.nextItemID++,
              name: name,
              price: price,
              item_id: button_id,
              quantity: 1,
              1: {},
              });

              break;
          }
        }
      }
    },

    // returns false if the a menu item has already been added to items
    checkItems(button_id) {
      for (const i in this.items) {
        if (button_id == this.items[i].item_id) {
          return true;
        }
      }
    },

    // instead of adding new item to items it updates the quantity and price
    updateItem(id) {
      for (const i in this.items) {
        const { item_id, quantity, price } = this.items[i];

        if (id == item_id) {
          var newPrice = (quantity * menu[i].price)+menu[i].price;
          newPrice = parseFloat(newPrice.toFixed(2));

          Vue.set(this.items, 'price', (this.items[i].price = newPrice));
          Vue.set(this.items, 'quantity', this.items[i].quantity++);
          Vue.set(this.items[i], quantity+1, {});

          console.log(this.items[i][quantity+1]);         
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
