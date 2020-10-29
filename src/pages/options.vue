<template>
  <f7-page>
    <f7-navbar :title="pageId" back-link="Back"></f7-navbar>
    <f7-block strong style="margin: 0px; padding: 0px">

      <f7-list v-for="cat in optionsCats" :key="cat.id">
      <f7-list-item divider :title="cat.name"></f7-list-item>
      <f7-list-item 
      v-for="i in options"
      v-if="cat.id == i.category"
      :key="i.id"
      :title="itemOptions[0][1].count1 +' '+ i.name" 
      >
        <f7-stepper :buttons-only="true" small raised bg-color="gray" color="black" slot="after" @stepper:change="setQuantity"></f7-stepper>
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

      pageId: this.$f7route.params.id,
      count1: 0,

      itemOptions: 
      [
        {
          name: 'test',
          1: {
            count1: 0,
          },
        }
      ],

      options: Options,
      optionsCats: OptionsCategories,

      // find item id and pass it here 
      //item: Service.getDish(this.$f7route.params.id),
    };
  },
  methods: {

   setQuantity(value) {
      let options = {};
      this.itemOptions[0]['options'] = [{quantity: 3}];

      console.log(this.itemOptions[0]);
    },
  }
};
</script>
