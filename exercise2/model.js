'use strict'

class Item {
    constructor(name, quantity, priority, store, section, price) {
        this.name = name;
        this.quantity = quantity;
        this.priority = priority;
        this.store = store;
        this.section = section;
        this.price = price;

        this._purchased = false;

    }

  get purhcased() {
        return this._purchased;
    }

  set purchased(newValue) {
        this._purchased = newValue;
    }
}

class ShoppingList {
    constructor() {
        items = [];
    }
    
    addItem(item) {
        item.push(items);
    }

    cleanList() {
        for (i of items) {
            //if i == purchased
                //remove i
        }
    }

    emptyList() {
        emptyLst = [];
        items = emptyLst;
    }
}
