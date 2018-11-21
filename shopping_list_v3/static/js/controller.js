var stores = ['Fareway', 'Ace Hardware', 'Caseys', 'The Hatchery', 'Amundsens']
var sections = ['Produce', 'Meats', 'Cereal', 'Canned Goods', 'Frozen Foods', 'Dairy', 'Liquor', 'Tools', 'Clothing']

var shoppingModel = new ShoppingList()
var myView = new ShoppingView(shoppingModel)

function clickedon() {
    let rowcolids = ['itemname', 'qty', 'store', 'section', 'price', 'priority']
    let vals = {}
    for (let cid of rowcolids) {
        vals[cid] = document.getElementById(cid).value;
    }
    
    if (vals.itemname != "" && Number(vals.price)) {
        let it = new Item(vals.itemname, vals.qty, vals.priority, vals.store, vals.section, vals.price)
        shoppingModel.addItem(it)
    }
}

function populateSelect(selectId, sList) {
    let sel = document.getElementById(selectId, sList)
    for (let s of sList) {
        let opt = document.createElement("option")
        opt.value = s
        opt.innerHTML = s
        sel.appendChild(opt)
    }
}

function saveList() {
    var url = '/save';
    var data = shoppingModel.saveList();
    console.log("SAVE DATA",data)

    fetch(url, {
        method: 'POST',
        body: data,
        headers:{
            'Content-Type': 'application/json'
        }
    })
    loadList()
}

function loadList() {
    var url = '/save';
    var data = shoppingModel.loadList();
    console.log("LOAD DATA",data)

    fetch(url, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    myView.redrawList(shoppingModel)
}

function clearList() {
    shoppingModel.clearList()
}

function removePurchased() {
    // console.log("BEFORE MODEL", shoppingModel)
    newLst = shoppingModel.removePurchased()
    // console.log("AFTER MODEL", shoppingModel)

    myView.redrawList(shoppingModel)

}

$(document).ready(function () {
    populateSelect('store', stores)
    populateSelect('section', sections)
    myView.redrawList(shoppingModel)
})
