<template>
  <f7-page>
    <f7-navbar :title="this.items[itemId].name + ' ' + pageId" back-link="Back"></f7-navbar>
    <f7-block strong style="margin: 0px; padding: 0px">

      <f7-list v-for="cat in optionsCats" :key="cat.id">
      <f7-list-item divider :title="cat.name"></f7-list-item>
      <f7-list-item 
      v-for="(i, index) in options"
      v-if="cat.id == i.category"
      :key="i.id"
      :title="(items[itemId][pageId][i.name] || 0 )+' '+ i.name" 
      >
      
        <f7-stepper small raised bg-color="gray" color="black" slot="after" 
        :value="items[itemId][pageId][i.name]"
        :buttons-only="true" 
        @stepper:change="setQuantity(i.name, $event)"
        ></f7-stepper>

      </f7-list-item>

    </f7-list>

    </f7-block>
  </f7-page>
</template>
<script>

import App from '../components/app.vue';
import sidepanel from '../components/sidepanel.vue';
import Options from '../js/options.js';
import OptionsCategories from '../js/optionCategories.js';
import Vue from 'vue';

export default {
  data() {
    return {
      options: Options, // used to populate options from options.js
      optionsCats: OptionsCategories, // same but for categories
      pageId: this.$f7route.params.id, // index of the items inside accordian in sidepanel.vue
      itemId: this.$f7route.params.index, // index of the item in items array, points to WHAT item

      items: App.items,
      nextId: 5,
      map: new Map(),
    };
  },

  methods: {

    setQuantity(name, value) {
      let options = this.items[this.itemId][this.pageId];

      this.$set(options, name, value);
      console.log(options[name]);
    },
  }
};
</script>
