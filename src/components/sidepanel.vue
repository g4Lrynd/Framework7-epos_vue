<template>

    <f7-page id="SidePanel">
      <f7-navbar v-bind:title="titlePrefix">{{ saleEnd ? change : itemsTotal() }}</f7-navbar>

      <f7-page-content class="panel-page">

        <f7-list list accordion-opposite>
          <f7-list-item accordion-item
          v-for="(item, pos) in items"
          :key="item.id"
          :title="item.quantity + ' ' + item.name"
          >
            <f7-button class="remove-button"
            slot="after"
            icon-f7="multiply"
            icon-color="pink"
            icon-size="23px"
            v-on:click="removeItem(pos)">
            </f7-button>

            <f7-accordion-content>
                <f7-list-item
                v-for="(n, index) in item.quantity"
                :title="index+1"
                :key="index"
                :link="`/options/${pos}/${index+1}`">

                <p slot="after" v-for="(value, name) in items[pos][index+1]" style="margin: 0px">{{ value }} {{ name }}</p>
                </f7-list-item>
            </f7-accordion-content>

          </f7-list-item>

        </f7-list>
      </f7-page-content>

    <f7-block v-show="minimise" strong bottom class="keypad-block">

      <f7-block class="block-header">
        <f7-block-title type="number" class="current">£{{ current || '0.00' }}</f7-block-title>
        <f7-button class="keypad-minimise"
          small
          icon-f7="arrow_down_square"
          icon-color="gray"
          icon-size="25px"
          v-on:click="minimise = false">
        </f7-button>
      </f7-block>

      <f7-row >
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
            <f7-button fill color="gray" v-on:click="keypad(3)">3</f7-button>
            <br>
            <f7-button fill color="pink" v-on:click="current = 0">CLR</f7-button>
          </f7-col>
         </f7-row>

        <f7-block class="cash-button">
          <f7-button fill color="green" v-on:click="reset()">Cash</f7-button>
        </f7-block>

    </f7-block>

    <f7-block v-show="!minimise" strong bottom class="keypad-block">

          <f7-button
          fill color="gray"
          icon-material="dialpad"
          icon-color="black"
          icon-size="25px"
          v-on:click="minimise = true">
          </f7-button>

    </f7-block>
  </f7-page>
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
      minimise: false,

      total: '',
      titlePrefix: 'Total: ',
      change: '',
      saleEnd: false,

    }
  },
  methods: {

    removeItem(pos) {
      this.$delete(this.items, pos);
    },

    round(unrounded) {
      const rounded = (Math.round((unrounded) * 1000) / 1000).toFixed(2);
      return rounded;
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
      else {
        this.current = `${this.current}${number}`
        this.current *= 10;
        this.current = this.round(this.current);
      }
    },

    itemsTotal() {
      this.total = this.round(this.items.reduce((total, item) => total + item.price, 0));
      return '£' + this.total;
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
  },

}

</script>
