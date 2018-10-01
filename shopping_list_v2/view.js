class ShoppingView {
    constructor(model) {
        // The bind() method creates a new function that, when called, has its this keyword set to the provided value.
        model.subscribe(this.redrawList.bind(this))
    }

    redrawList(shoppingList) {
        let tbl = document.getElementById("itemtable")
        tbl.innerHTML = ""
        for (let item of shoppingList.newItems) {
            this.addRow(item, tbl)
        }
    }

    addRow(item, parent) {
        if (item['name'] != "") {
            if (item['price'] != "" && Number(item['price'])) {
                let row = document.createElement("tr")
                row.classList.add(item.priority)

                if (item.priority == 'High') {
                    row.bgColor = '#CD5C5C';
                }

                if (item.priority == 'Medium') {
                    row.bgColor = '#F5F5DC';
                }

                if (item.priority == 'Low') {
                    row.bgColor = '#98FB98';
                }

                let cb = document.createElement("input")
                cb.type = "checkbox"
                cb.classList.add("form-control")

                cb.onclick = function() { 
                    item.purchased = true;
                }

                row.appendChild(cb)

                for (let val of ['name', 'quantity', 'store', 'section', 'price']) {
                    let td = document.createElement("td")
                    td.innerHTML = item[val]
                    row.appendChild(td)
                }

                parent.appendChild(row)

                // cb.onclick = function() { 
                //     item.purchased = true;
                // }
            }
        }
    }
}
