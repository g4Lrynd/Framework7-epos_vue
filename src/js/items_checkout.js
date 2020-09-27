import menu from './menu.js'

export default {
    
    subTotal: '',
    items: [],
    nextItemID: 4,

    total() {
        return this.subTotal;
    },

    getItem(name) {
        for (var i = 0; i < menu.length; i+= 1) {
            if (menu[i].name == name) {
                this.items.push({  
                    id: this.nextItemID++,
                    name: menu[i].name,
                    price: menu[i].price
                });
                
                this.subTotal += menu[i].price;
                console.log(this.subTotal);
                
                console.log(this.items);
            }
        }    
    } 
}