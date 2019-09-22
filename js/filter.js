function changeFilter(value) {
    var tableHeaderRowCount = 1;
    var table = document.getElementById('main-table');
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        var row = table.rows[i];
        if (value == "all"){
            row.style.display = 'table-row';
        }
        else if (value == "true"){
            if (row.cells[3].textContent == "false") row.style.display = 'none';
            else row.style.display = 'table-row';
        }
        else {
            if (row.cells[3].textContent == "true") row.style.display = 'none';
            else row.style.display = 'table-row';
        }
    }
}