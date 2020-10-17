<template>
  <f7-page style="padding-top: 0px;">
    <f7-navbar no-shadow><f7-nav-title >Sapindaceae</f7-nav-title></f7-navbar>
      <f7-block strong style="margin-top: 0px; margin-bottom: 0px; display: flex; flex-wrap: wrap;">

        <f7-button custom fill large color="lightblue"
        v-for="(item, index) in menu"
        v-on:click="addToItems(item.button_id)"
        :key="item.button_id"
        >{{item.name}}</f7-button>

    </f7-block>
  </f7-page>
</template>
<script>
import sidepanel from '../components/sidepanel.vue';
import App from '../components/app.vue';
import menu from '../js/menu.js';

export default {
  data() {
    return {
      menu: menu,
    }
  },
  methods: {

    addToItems(button_id) {
      App.getItem(button_id);

      this.$root.$emit('update', false);
    }
  },
}
</script>
