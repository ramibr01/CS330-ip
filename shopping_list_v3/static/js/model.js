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

class Subject {

    constructor() {
        this.handlers = []
    }

    subscribe(fn) {
            this.handlers.push(fn);
        }

    unsubscribe(fn) {
        this.handlers = this.handlers.filter(
            function(item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    }

    publish(msg, someobj) {
        var scope = someobj || window;
        for (let fn of this.handlers) {
            fn(scope, msg)
        }
    }
}

class ShoppingList extends Subject {
    constructor() {
        super()
        this.newItems = [];
    }
    
    addItem(item) {
        this.newItems.push(item);
        this.publish('newitem', this)
    }

    removeItem(item) {
        this.newItems.pop(item);
        this.publish('newitem', this)
    }

    saveList() {
        console.log("this", this.newItems)
        localStorage.setItem("list", JSON.stringify(this.newItems));

        var lst = localStorage.getItem("list");

        return lst
    }

    loadList() {
        // localStorage.setItem("list", JSON.stringify(this.newItems));

        let vals = JSON.parse(window.localStorage.getItem('list'));

        return vals
    }

    removePurchased() {
        let vals = this.newItems;
        // console.log("BEFORE REMOVE", vals)

        for (let item of vals) {
            if (item["_purchased"] == true) {
                // console.log("ITEM(S) TO BE POPPED", item)
                vals.splice(vals.indexOf(item), 1)

            }
        }
        // console.log("AFTER REMOVE", vals)
        return vals
    }

    clearList() {
        this.emptyLst = [];
        this.newItems = this.emptyLst;

        var table = document.getElementById("itemtable");
        while(table.rows.length > 0) {
            table.deleteRow(0);
        }
    }
}