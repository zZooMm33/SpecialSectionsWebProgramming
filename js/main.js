function addPizza(button) {
    var parentNode = button.parentNode;

    var name = parentNode.getElementsByClassName('name')[0].innerText;
    var number = parentNode.getElementsByClassName('number')[0].value;
    var price = parentNode.getElementsByClassName('price')[0].innerText;

    addRowInTable("table-pizza", name, number, price);
}

function order() {
    var address = document.getElementById("address").value;
    var phone_number = document.getElementById("phone_number").value;

    if (address === "") alert("Ошибка ! \nВведите ардрес.");
    else if (phone_number === "") alert("Ошибка ! \nВведите номер телефона.");
    else if (!ValidPhone(phone_number)) alert("Ошибка ! \nНомер телефона введен неправильно.");
}

function ValidPhone(myPhone) {
    var re = /[\+]\d{1}\s[\(]\d{3}[\)]\s\d{3}[\-]\d{2}[\-]\d{2}/;
    var valid = re.test(myPhone);
    return valid;
}