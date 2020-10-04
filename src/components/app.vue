<template>
  <f7-app :params="f7params" >

  <!-- Left panel with cover effect when hidden -->
  <f7-panel right cover theme-dark :visible-breakpoint="960">
    <f7-view>
      <f7-page>
        <f7-navbar v-bind:title="titlePrefix">{{saleEnd ? change : itemsTotal() }}</f7-navbar>

          <f7-page-content style="margin: 0em; padding: 0em; height: 38%">

            <f7-list style="margin: 0em;">
              <f7-list-item
              v-for="(item, index) in items"
              :key="item.id"
              :title="item.quantity + ' ' + item.name"
              :after="'£' + item.price"
              swipeout>
                <f7-swipeout-actions right>
                  <f7-swipeout-button delete v-on:click="removeItem(index)">Delete</f7-swipeout-button>
                </f7-swipeout-actions>
              </f7-list-item>
            </f7-list>

          </f7-page-content>



        <f7-block strong bottom style="padding-right: 13%; padding-left: 13%; margin: 3px; position: fixed; width: 100%; bottom: 0;">
          <f7-block-title block-title type="number" style="margin-bottom: 10px; padding: 5px; font-size: 1.4em; ">£{{ current || '0.00' }}</f7-block-title>

          <f7-row>
              <f7-col>
                <f7-button fill color="gray" v-on:click="keypad(7)">7</f7-button>
                <br>
                <f7-button fill color="gray" v-on:click="keypad(4)">4</f7-button>
                <br>
                <f7-button fill color="gray" v-on:click="keypad(1)">1</f7-button>
                <br>
                <f7-button fill color="gray" v-on:click="zero()">00</f7-button>
              </f7-col>

              <f7-col>
                <f7-button fill color="gray" v-on:click="keypad(8)">8</f7-button>
                <br>
                <f7-button fill color="gray" v-on:click="keypad(5)">5</f7-button>
                <br>
                <f7-button fill color="gray" v-on:click="keypad(2)">2</f7-button>
                <br>
                <f7-button fill color="gray" v-on:click="keypad(0)">0</f7-button>
              </f7-col>

              <f7-col>
                <f7-button fill color="gray" v-on:click="keypad(9)">9</f7-button>
                <br>
                <f7-button fill color="gray" v-on:click="keypad(6)">6</f7-button>
                <br>
                <f7-button fill color="gray" v-on:click="keypad(3)" id="3">3</f7-button>
                <br>
                <f7-button fill color="pink" v-on:click="current = 0">CLR</f7-button>
              </f7-col>
             </f7-row>

            <f7-block style="padding: 0em; margin-top: 20px; margin-bottom: 0px">
              <f7-button fill color="green" v-on:click="reset()">Cash</f7-button>
            </f7-block>

        </f7-block>

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
  import thing from '../js/items_checkout.js';

  export default {
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

        // Keypad output
        current: '',

        // Items in list
        items: thing.items,

        // Subtotal of all items in items
        total: '',

        titlePrefix: 'Total: ',

        change: '',

        saleEnd: false,
      }
    },

    methods: {
      alertLoginData() {
        this.$f7.dialog.alert('Username: ' + this.username + '<br>Password: ' + this.password, () => {
          this.$f7.loginScreen.close();
        });
      },

      removeItem(index) {
        //const itemIndex = this.items.indexOf(item);
        //this.items.splice(index, 1);
        this.$delete(this.items, index)
        console.log(this.items);

      },

      round(unrounded) {
        const rounded = (Math.round((unrounded) * 1000) / 1000).toFixed(2);
        return rounded;
      },

      itemsTotal() {
        this.total = this.round(this.items.reduce((total, item) => total + item.price, 0));
        return '£' + this.total;

      },

      zero() {
        this.current = this.round(this.current);
        /*
        if (this.current == '') {
          this.current = '';
        }
        else if (this.current < 0.001) {
          this.current = `${this.current}${0}${0}`
          this.current /= 1000;

          this.current = this.round(this.current);
        }

        // Limited to £10,000.0
        else if (this.current < 10000.0) {
          this.current = `${this.current}${0}${0}`
          this.current *= 100;

          this.current = this.round(this.current);
        }
        */
      },

      keypad(number) {
        if (this.current == '' && number == 0) {
          this.current == '';
        }
        else if (this.current < 0.001) {
          this.current = `${this.current}${number}`
          this.current /= 100;

          this.current = this.round(this.current);
        }

        // Limited to £10,000.00
        else if (this.current < 10000.0) {
          this.current = `${this.current}${number}`
          this.current *= 10;

          this.current = this.round(this.current);
        }
      },

      reset() {
        if (this.items.length > 0 && this.current >= this.total) {
          this.saleEnd = true;
          this.titlePrefix = 'Change: ';

          this.change = this.current - this.total;
          this.change = '£' + (this.round(this.change));
          this.current = '';
          this.items.splice(0, this.items.length);

          this.$root.$on('update', (data) => {
            this.saleEnd = false;
            this.titlePrefix = 'Total: ';

          });

          console.log(this.saleEnd);
        }
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
