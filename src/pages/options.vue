<template>
  <f7-page>
    <f7-navbar :title="this.$f7route.params.id" back-link="Back"></f7-navbar>
    <f7-block strong>
      <p>The requested routing has worked.</p>
    </f7-block>
  </f7-page>
</template>
<script>
export default {
  data() {
    return {
      // find item id and pass it here 
      //item: Service.getDish(this.$f7route.params.id),
    };
  }
};
</script>
