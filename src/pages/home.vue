<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar :sliding="false">
      <f7-nav-title sliding>Menu</f7-nav-title>
    </f7-navbar>

    <!-- Toolbar-->
    <f7-toolbar bottom>
      <f7-link login-screen-open="#my-login-screen">Sign out</f7-link>
    </f7-toolbar>
    
    <f7-block strong>
      <f7-row>
        <f7-col width="33">
          <f7-button fill href="/sapindaceae/">Sapindaceae</f7-button>
          <br>
          <f7-button fill>Category</f7-button>
        </f7-col>
        <f7-col width="33">
          <f7-button fill>Category</f7-button>
          <br>
          <f7-button fill>Category</f7-button>
        </f7-col>
        <f7-col width="33">
          <f7-button fill>Category</f7-button>
          <br>
          <f7-button fill>Category</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
    <!-- Page content-->
    <f7-block>
    <f7-row>
        <f7-col width="33">
          <f7-button fill link="/about/">Category</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>

<script>
  import basket from '../js/items_checkout.js';

  export default {
    data() {
      return {
        
      }
    },
    methods: {

      addToItems(button_id) {
        basket.getItem(button_id);
        
        },
      
    }, 
  }
</script>