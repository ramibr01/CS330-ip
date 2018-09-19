function addToList() {
    item = document.getElementById('nameinput').value;
    quantity = document.getElementById('numofitems').value;
    section = document.getElementById('section').value;
    storename = document.getElementById('storename').value;
    price = document.getElementById('price').value;

    let headers = [item, quantity, storename, section, price];

    if (item != "") {
        let my_table = document.querySelector('#itemtable');

        let itemRow = document.createElement('tr');

        var x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
        itemRow.appendChild(x);
        
        for (let i of headers) {
            let cell = document.createElement('td');
            cell.innerHTML = i;
            itemRow.appendChild(cell);

            my_table.appendChild(itemRow);
        }
    }
}
