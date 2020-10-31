<template>
  <f7-page>
    <f7-navbar :title="this.items[itemId].name" back-link="Back"></f7-navbar>
    <f7-block strong style="margin: 0px; padding: 0px">

      <f7-list v-for="cat in optionsCats" :key="cat.id">
      <f7-list-item divider :title="cat.name"></f7-list-item>
      <f7-list-item 
      v-for="i in options"
      v-if="cat.id == i.category"
      :key="i.id"
      :title="count +' '+ i.name" 
      >
        <f7-stepper :buttons-only="true" small raised bg-color="gray" color="black" slot="after" @stepper:change="setQuantity(i.name)"></f7-stepper>
      </f7-list-item>

    </f7-list>

    </f7-block>
  </f7-page>
</template>
<script>

import App from '../components/app.vue';
import sidepanel from '../components/sidepanel.vue';
import Options from '../js/options.js'
import OptionsCategories from '../js/optionCategories.js'

export default {
  data() {
    return {
      pageId: this.$f7route.params.id, // index of the items inside accordian in sidepanel.vue
      itemId: this.$f7route.params.index, // index of the item in items array, points to WHAT item

      items: App.items,
      count: 0,

      options: Options, // used to populate options in options.js
      optionsCats: OptionsCategories, // same but for categories

      // find item id and pass it here 
      //item: Service.getDish(this.$f7route.params.id),
    };
  },
  methods: {

   setQuantity(i, value) {
      this.items[this.itemId][this.pageId].push({name: i})
      console.table(this.items[this.itemId][this.pageId])
    },
  }
};
</script>
