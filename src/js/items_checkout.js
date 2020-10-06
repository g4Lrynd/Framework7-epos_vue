import Vue from 'vue';
import App from '../components/app.vue';
import menu from './menu.js'

export default {

    //subTotal: '',
    items: [],
    nextItemID: 4,

    getItem(button_id) {
      var length = menu.length;

      for (var i = 0; i < length; i+= 1) {
          if (menu[i].button_id == button_id) {
            if (menu[i].quantity > 2) {
              Vue.$set(this.items, menu[i].quantity, menu[i].quantity++);
            }
            else {
              this.items.push({

                  id: this.nextItemID++,
                  name: menu[i].name,
                  price: menu[i].price,
                  quantity: menu[i].quantity++,
              });



            }

                //this.subTotal += menu[i].price;
                //console.log(this.subTotal);

                console.log(this.items);
          }
      }
    }
}
