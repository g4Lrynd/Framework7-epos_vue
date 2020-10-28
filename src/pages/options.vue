<template>
  <f7-page>
    <f7-navbar :title="this.$f7route.params.id" back-link="Back"></f7-navbar>
    <f7-block strong style="margin: 0px; padding: 0px">

      <f7-list v-for="cat in optionsCats">
      <f7-list-item divider :title="cat.name"></f7-list-item>
      <f7-list-item 
      v-for="i in options"
      v-if="cat.id == i.category"
      :key="i.id"
      :title="count1 +' '+ i.name" 
      >
        <f7-stepper :buttons-only="true" small raised bg-color="gray" color="black" slot="after" @stepper:change="set1"></f7-stepper>
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

      count1: 0,
      count2: 0,
      itemOptions: App.options,
      options: Options,
      optionsCats: OptionsCategories,

      // find item id and pass it here 
      //item: Service.getDish(this.$f7route.params.id),
    };
  },
  methods: {

    set1(value) {
      this.count1 = value;
    },
  }
};
</script>
