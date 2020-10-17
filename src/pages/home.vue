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

          <f7-button large fill color="blue"
          v-for="(category, index) in categories"
          v-on:click="selecto(category.id, category.name)"
          :key="category.id"
          >{{ category.name }}</f7-button>


    </f7-block>
    <!-- Page content-->

      <!--<f7-view class="view-bottom" url="/dynamic-route/" data-view="current"></f7-view>-->
      <f7-block-title>{{ title }}</f7-block-title>
      <f7-block strong style="display: flex; flex-wrap: wrap;">

        <f7-button large fill color="lightblue"
        v-for="(item, index) in menu"
        v-if="item.category == selection"
        v-on:click="addToItems(item.button_id)"
        :key="item.button_id"
        >{{item.name}}</f7-button>

    </f7-block>

  </f7-page>



</template>

<script>
import sidepanel from '../components/sidepanel.vue';
import categories from '../js/categories.js';
import menu from '../js/menu.js';
import App from '../components/app.vue';

  export default {

    components: {
      sidepanel
    },

    data() {
      return {
        isActive: true,
        eatDestination: '',

        categories: categories,
        menu: menu,

        selection: '',
        title: 'Home',
      }
    },
    methods: {

      addToItems(button_id) {
        App.getItem(button_id);

        this.$root.$emit('update', false);
      },

      selecto(id, name) {
        this.selection = id;
        this.title = name;
      },

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

    },

  }
</script>
