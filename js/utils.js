function toggle(id) {
    var div = document.getElementById(id);
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    } else {
        div.style.display = 'block';
    }
}

function hide(id) {
    var div = document.getElementById(id);
    div.style.display = 'none';
}

function show(id) {
    var div = document.getElementById(id);
    div.style.display = 'block';
}

function addRowInTable(tableId, src, type, id) {
    // Находим нужную таблицу
    var tbody = document.getElementById(tableId).getElementsByTagName('TBODY')[0];

    // Создаем строку таблицы и добавляем ее
    var row = document.createElement("TR");

    row.setAttribute('id', "row" + id);

    tbody.appendChild(row);

    // Создаем ячейки в вышесозданной строке
    // и добавляем тх
    var td1 = document.createElement("TD");
    var td2 = document.createElement("TD");
    var td4 = document.createElement("TD");

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td4);

    // Наполняем ячейки
    td1.innerHTML = src;
    td2.innerHTML = type;
    td4.innerHTML = "<button type=\"button\" id='deleteRow" + id + "' class=\"btn btn-danger\" OnClick=\"deleteRow(this.id);\">Удалить</button>";

    row.ondblclick = function (e) {
        if (!e)
            e = window.event;
        var sender = e.srcElement || e.target;

        //maybe some nested element.. find the actual table cell parent.
        while (sender && sender.nodeName.toLowerCase() !== "tr")
            sender = sender.parentNode;

        playElement(src, type);
    };
}

function deleteRow(idButton) {

    var idRow = "row" + idButton.replace("deleteRow", "");
    var row = document.getElementById(idRow);

    if (row.cells[0].innerHTML.indexOf(currentPlay.src) !== -1){

        document.getElementById("error").innerHTML="Ошибка при удалении !";
        show("error");
    }
    else
        row.remove();
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}