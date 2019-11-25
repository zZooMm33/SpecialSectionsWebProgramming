function addPizza(button) {
    var parentNode = button.parentNode;

    var name = parentNode.getElementsByClassName('name')[0].innerText;
    var number = parentNode.getElementsByClassName('number')[0].value;
    var price = parentNode.getElementsByClassName('price')[0].innerText;

    addRowInTable("table-pizza", name, number, price);
}