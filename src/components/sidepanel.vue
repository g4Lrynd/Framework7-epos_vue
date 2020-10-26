<template>
    <div id="SidePanel">
      <f7-navbar v-bind:title="titlePrefix">{{ saleEnd ? change : itemsTotal() }}</f7-navbar>

      <f7-page-content style="margin: 0em; padding: 0em; height: 38%">

        <f7-list list accordion-opposite style="margin: 0em;">
          <f7-list-item accordion-item
          v-for="(item, index) in items"
          :key="item.id"
          :title="item.quantity + ' ' + item.name"
          >

            <f7-button round slot="after" style="padding-right: 0px"
            icon-f7="multiply"
            icon-color="pink"
            icon-size="23px"
            v-on:click="removeItem(index)">
            </f7-button>

            <f7-accordion-content>

              <f7-block>

                <template v-for="(n, index) in item.quantity">

                  <f7-list-item :title="index+1" smart-select :smart-select-params="{openIn: 'page'}">
                    <select name="options" multiple>
                      <optgroup label="Extras">
                        <option value="cheese">Extra Cheese</option>
                        <option value="egg">Extra egg</option>
                      </optgroup>
                      <optgroup label="Sauces">
                        <option value="ketch">Extra Ketch</option>
                        <option value="mayo">Extra Mayo</option>
                      </optgroup>
                      <optgroup label="Remove">
                        <option value="ketch">Remove Ketch</option>
                        <option value="mayo">Remove Mayo</option>
                      </optgroup>
                    </select>
                  </f7-list-item>

                </template>

              </f7-block>

            </f7-accordion-content>

          </f7-list-item>

        </f7-list>
      </f7-page-content>



    <f7-block strong bottom style="padding-right: 12%; padding-left: 12%; margin-bottom: 0px; position: fixed; width: 100%; bottom: 0;">
      <!--
      <f7-block-title type="number" style="margin-bottom: 10px; padding: 5px; font-size: 1.4em; ">£{{ current || '0.00' }}</f7-block-title>

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
       -->
        <f7-block style="padding: 0em; margin-top: 20px; margin-bottom: 0px">
          <f7-button fill color="green" v-on:click="reset()">Cash</f7-button>
        </f7-block>

    </f7-block>
  </div>
</template>
<script>
import { Component } from 'framework7';
import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
import App from '../components/app.vue';
import menu from '../js/menu.js';

export default {
  data() {
    return {

      // Keypad output
      current: '',

      // Items in list
      items: App.items,

      options: App.options,

      // Subtotal of all items in items
      total: '',

      titlePrefix: 'Total: ',

      change: '',

      saleEnd: false,

    }
  },

  methods: {

    removeItem(index) {
      this.$delete(this.items, index);

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
    },

    keypad(number) {
      if (this.current == '' && number == 0) {
        this.current = '';
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
