function toggle(id) {
    var div = document.getElementById(id);
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
    else {
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