import menu from './menu.js'

export default {

    items: [],
    getBasket() {
        return items;
    },

    getItem(id) {
        for (var i = 0; i < menu.length; i+= 1) {
            if (menu[i].id == id) {
                this.items.push(menu[i]);
                
                console.log(this.items);
            }
        }
    }
}