import menu from './menu.js'

export default {

    //subTotal: '',
    items: [],
    nextItemID: 4,

    getItem(button_id) {
        for (var i = 0; i < menu.length; i+= 1) {
            if (menu[i].button_id == button_id) {
                this.items.push({

                    id: this.nextItemID++,
                    name: menu[i].name,
                    price: menu[i].price,
                    quantity: menu[i].quantity++,
                });

                //this.subTotal += menu[i].price;
                //console.log(this.subTotal);

                console.log(this.items);
            }
        }
    }
}
