<template>
  <f7-page name="home">
    <f7-navbar>
      <f7-nav-title sliding>Menu</f7-nav-title>
    <f7-nav-right class="destiny-nav">

      <f7-segmented strong class="destiny-button">
        <f7-button v-on:click="isActive=false">Take out</f7-button>
        <f7-button v-bind:class="{ 'button-active': isActive }" v-on:click="isActive=true">Eat in</f7-button>
      </f7-segmented>

    </f7-nav-right>

    </f7-navbar>

    <f7-block strong class="categories-block">

          <f7-button large fill color="blue"
          v-for="category in categories"
          v-on:click="selecto(category.id, category.name)"
          :key="category.id"
          >{{ category.name }}</f7-button>

    </f7-block>

      <f7-block-title class="category-title">{{ title }}</f7-block-title>

      <f7-block strong class="items-block">

        <f7-button large fill color="lightblue"
        v-for="item in menu"
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
        categories: categories,
        menu: menu,

        isActive: true,
        eatDestination: '',

        selection: '',
        title: categories[0].name,
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
        if (this.isActive === true) {
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
