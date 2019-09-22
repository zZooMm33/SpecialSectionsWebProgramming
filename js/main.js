function buttonLoadTODOS() {
    clearTable('main-table');

    // Создаём объект класса XMLHttpRequest
    const request = new XMLHttpRequest();
    const url = "https://jsonplaceholder.typicode.com/todos";
    request.open('GET', url, true);

    // Указываем заголовки для сервера, говорим что тип данных, - контент который мы хотим получить должен быть не закодирован.
    request.setRequestHeader('Content-Type', 'application/x-www-form-url');

    // Здесь мы получаем ответ от сервера на запрос, лучше сказать ждем ответ от сервера
    request.addEventListener("readystatechange", () => {
        {
            /*   request.readyState - возвращает текущее состояние объекта XHR(XMLHttpRequest) объекта,
            бывает 4 состояния 4-е состояние запроса - операция полностью завершена, пришел ответ от сервера,
            вот то что нам нужно request.status это статус ответа,
            нам нужен код 200 это нормальный ответ сервера, 401 файл не найден, 500 сервер дал ошибку и прочее...   */
            if (request.readyState === 4 && request.status === 200) {

                var data = JSON.parse(request.responseText);
                var itemsCount = data.length;

                for(var i = 0; i < itemsCount; i++)
                {
                    var item = data[i];

                    var id = item.id;
                    var userId = item.userId;
                    var title = item.title;
                    var completed = item.completed;

                    addRowInTable('main-table', userId, id, title, completed);
                }

                var selectedValue = document.getElementById("filterTODOS").options.selectedIndex;
                changeFilter(selectedValue);
            }
        }});

    // Выполняем запрос
    request.send();

}

function addRowInTable(tableId, userId, id, title, completed) {
    // Находим нужную таблицу
    var tbody = document.getElementById(tableId).getElementsByTagName('TBODY')[0];

    // Создаем строку таблицы и добавляем ее
    var row = document.createElement("TR");
    tbody.appendChild(row);

    // Создаем ячейки в вышесозданной строке
    // и добавляем тх
    var td1 = document.createElement("TD");
    var td2 = document.createElement("TD");
    var td3 = document.createElement("TD");
    var td4 = document.createElement("TD");

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);

    // Наполняем ячейки
    td1.innerHTML = userId;
    td2.innerHTML = id;
    td3.innerHTML = title;
    td4.innerHTML = completed;
}

function clearTable(nameTable) {
    var tableHeaderRowCount = 1;
    var table = document.getElementById(nameTable);
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
}

function buttonTask() {
    alert("2. Typicode. Работа с TODO list\n" +
        "Разработать приложение, которое будет выполнять следующие функции:\n" +
        "•\tСоздание интерфейса для корректного отображения списка TODO\n" +
        "•\tЗапрос с сервера jsonplaceholder.typicode.com на выгрузку всех пунктов списка \n" +
        "•\tОтображение списка в интерфейсе\n" +
        "•\tФильтр по completed (выполнено, не выполнено, все)\n" +
        "•\tСсылка http://jsonplaceholder.typicode.com/\n");
}