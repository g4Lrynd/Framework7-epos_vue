<template>
  <f7-page style="padding-top: 0px;">
    <f7-navbar no-shadow><f7-nav-title sliding>Sapindaceae</f7-nav-title></f7-navbar>
      <f7-block strong style="margin-top: 0px; margin-bottom: 0px; display: flex; flex-wrap: wrap;">

        <f7-button custom fill large color="lightblue" v-on:click="addToItems(0)">Horse Chestnut</f7-button>
        <f7-button custom fill large color="lightblue" v-on:click="addToItems(0)">Horse Chestnut</f7-button>

        <!--
        <f7-row>
          <f7-col width="25">

            <f7-button fill large color="purple" v-on:click="addToItems(0)">Horse Chestnut</f7-button>
            <br>
            <f7-button fill large color="purple" v-on:click="addToItems(1)">Sugar Maple</f7-button>

          </f7-col>
        </f7-row>
      -->
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
