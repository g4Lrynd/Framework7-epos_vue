<template>
  <f7-page>
    <f7-navbar title="Sapindaceae" back-link="Back"></f7-navbar>
    <f7-block strong>
      <f7-row>
        <f7-col width="33">
          <f7-button fill v-on:click="addToItems(254)">Horse Chestnut</f7-button>
        </f7-col>
        <f7-col width="33">
          <f7-button fill v-on:click="addToItems(255)">Sugar Maple</f7-button>
        </f7-col>
        <f7-col width="33">
          <f7-button fill v-on:click="addToItems(256)">Lychee</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
import SidePanel from '../components/SidePanel.vue';
import App from '../components/app.vue';

export default {
  data() {
    return {

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
