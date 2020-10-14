<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar>
      <f7-nav-title sliding>Menu</f7-nav-title>
    <f7-nav-right style="margin-right: 16px;">

      <f7-segmented strong style="width: 220px">
        <f7-button v-on:click="isActive=false">Take out</f7-button>
        <f7-button v-bind:class="{ 'button-active': isActive }" v-on:click="isActive=true">Eat in</f7-button>
      </f7-segmented>

    </f7-nav-right>

    </f7-navbar>

    <!-- Toolbar
    <f7-toolbar bottom>
      <f7-link login-screen-open="#my-login-screen">Sign out</f7-link>
    </f7-toolbar>
    -->

    <f7-block strong style="margin-top: 0px; margin-bottom: 0px; display: flex; flex-wrap: wrap;">


          <f7-button large fill color="blue" href="/sapindaceae/" data-view=".view-bottom">Sapindaceae</f7-button>

          <f7-button large fill color="blue">Category</f7-button>


    </f7-block>
    <!-- Page content-->

      <f7-view class="view-bottom" url="/dynamic-route/" data-view="current"></f7-view>



  </f7-page>


</template>

<script>
import SidePanel from '../components/SidePanel.vue';

  export default {

    components: {
      SidePanel
    },

    data() {
      return {

        isActive: true,
        eatDestination: '',

      }
    },
    methods: {
      finalDestiny() {
        if (this.isActive == true) {
          this.eatDestination = "Eat In";
          return this.eatDestination;
        }
        else {
          this.eatDestination = "Take Out";
          return this.eatDestination;
        }
      },

      addToItems(button_id) {
        SidePanel.getItem(button_id);
      },

    },

  }
</script>
