function remove (arr, indexes) {
    var arrayOfIndexes = [].slice.call(arguments, 1);  // (1)
    return arr.filter(function (item, index) {         // (2)
        return arrayOfIndexes.indexOf(index) == -1;      // (3)
    });
}