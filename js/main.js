ymaps.ready(init);

var placemarks = [
    {
        latitude: 53.30450294688872,
        longitude: 34.303863996173504,
        hintContent: 'БГТУ',
        balloonContent: [
            'БГТУ корпус №2'
        ]
    },
    {
        latitude: 53.303675,
        longitude: 34.305521,
        hintContent: 'Столовая',
        balloonContent: [
            '<h3 class="center">Столовая</h3>' +
            '<div>Время работы</div>' +
            '<ul>\n' +
            '  <li>Понедельник 10:30 – 15:30</li>\n' +
            '  <li>Вторник 10:30 – 15:30</li>\n' +
            '  <li>Среда 10:30 – 15:30</li>\n' +
            '  <li>Четверг 10:30 – 15:30</li>\n' +
            '  <li>Пятница 10:30 – 15:30</li>\n' +
            '  <li>Суббота Выходной</li>\n' +
            '  <li>Воскресенье Выходной</li>\n' +
            '</ul>'

        ],
        iconLayout: 'default#image', // тип макета
        iconImageHref: 'img/icon/dish.png', // путь
        iconImageSize: [28, 28], // размеры
        iconImageOffset: [-14, -14] // по умолчанию левый верхний угол
    },
    {
        latitude: 53.306647,
        longitude: 34.305244,
        hintContent: 'Ресторан',
        balloonContent: [
            '<h3 class="center">Оливье</h3>' +
            '<div>Время работы</div>' +
            '<ul>\n' +
            '  <li>Понедельник 08:00 – 00:00</li>\n' +
            '  <li>Вторник 08:00 – 00:00</li>\n' +
            '  <li>Среда 08:00 – 00:00</li>\n' +
            '  <li>Четверг 08:00 – 00:00</li>\n' +
            '  <li>Пятница 08:00 – 00:00</li>\n' +
            '  <li>Суббота 08:00 – 00:00</li>\n' +
            '  <li>Воскресенье 08:00 – 00:00</li>\n' +
            '</ul>'
        ],
        iconLayout: 'default#image', // тип макета
        iconImageHref: 'img/icon/dish.png', // путь
        iconImageSize: [28, 28], // размеры
        iconImageOffset: [-14, -14] // по умолчанию левый верхний угол
    },
    {
        latitude: 53.303771,
        longitude: 34.300057,
        hintContent: 'Ресторан, бар, паб',
        balloonContent: [
            '<h3 class="center">Бухтиловъ</h3>' +
            '<div>Время работы</div>' +
            '<ul>\n' +
            '  <li>Понедельник 12:00 – 00:00</li>\n' +
            '  <li>Вторник 12:00 – 00:00</li>\n' +
            '  <li>Среда 12:00 – 00:00</li>\n' +
            '  <li>Четверг 12:00 – 00:00</li>\n' +
            '  <li>Пятница 12:00 – 02:00</li>\n' +
            '  <li>Суббота 12:00 – 02:00</li>\n' +
            '  <li>Воскресенье 12:00 – 00:00</li>\n' +
            '</ul>'

        ],
        iconLayout: 'default#image', // тип макета
        iconImageHref: 'img/icon/dish.png', // путь
        iconImageSize: [28, 28], // размеры
        iconImageOffset: [-14, -14] // по умолчанию левый верхний угол
    },
    {
        latitude: 53.301236,
        longitude: 34.313452,
        hintContent: 'Кафе',
        balloonContent: [
            '<h3 class="center">Гриль & бар 13</h3>' +
            '<div>Время работы</div>' +
            '<ul>\n' +
            '  <li>Понедельник 12:00 – 00:00</li>\n' +
            '  <li>Вторник 12:00 – 00:00</li>\n' +
            '  <li>Среда 12:00 – 00:00</li>\n' +
            '  <li>Четверг 10:00 – 00:00</li>\n' +
            '  <li>Пятница 10:00 – 00:00</li>\n' +
            '  <li>Суббота 10:00 – 00:00</li>\n' +
            '  <li>Воскресенье 10:00 – 20:00</li>\n' +
            '</ul>'

        ],
        iconLayout: 'default#image', // тип макета
        iconImageHref: 'img/icon/cafe.png', // путь
        iconImageSize: [28, 28], // размеры
        iconImageOffset: [-14, -14] // по умолчанию левый верхний угол
    },
    {
        latitude: 53.301997,
        longitude: 34.305915,
        hintContent: 'Кафе, бар, паб',
        balloonContent: [
            '<h3 class="center">Чили</h3>' +
            '<div>Время работы</div>' +
            '<ul>\n' +
            '  <li>Понедельник 10:00 – 23:00</li>\n' +
            '  <li>Вторник 10:00 – 23:00</li>\n' +
            '  <li>Среда 10:00 – 23:00</li>\n' +
            '  <li>Четверг 10:00 – 23:00</li>\n' +
            '  <li>Пятница 10:00 – 01:00</li>\n' +
            '  <li>Суббота 10:00 – 01:00</li>\n' +
            '  <li>Воскресенье 10:00 – 23:00</li>\n' +
            '</ul>'

        ],
        iconLayout: 'default#image', // тип макета
        iconImageHref: 'img/icon/cafe.png', // путь
        iconImageSize: [28, 28], // размеры
        iconImageOffset: [-14, -14] // по умолчанию левый верхний угол
    },
    {
        latitude: 53.308263,
        longitude: 34.303029,
        hintContent: 'Быстрое питание',
        balloonContent: [
            '<h3 class="center">Макдоналдс</h3>' +
            '<div>Время работы</div>' +
            '<ul>\n' +
            '  <li>Понедельник 07:00 – 00:00</li>\n' +
            '  <li>Вторник 07:00 – 00:00</li>\n' +
            '  <li>Среда 07:00 – 00:00</li>\n' +
            '  <li>Четверг 07:00 – 00:00</li>\n' +
            '  <li>Пятница 07:00 – 00:00</li>\n' +
            '  <li>Суббота 07:00 – 00:00</li>\n' +
            '  <li>Воскресенье 07:00 – 00:00</li>\n' +
            '</ul>'

        ],
        iconLayout: 'default#image', // тип макета
        iconImageHref: 'img/icon/fast-food.png', // путь
        iconImageSize: [28, 28], // размеры
        iconImageOffset: [-14, -14] // по умолчанию левый верхний угол
    },
    {
        latitude: 53.308375,
        longitude: 34.302294,
        hintContent: 'Пиццерия',
        balloonContent: [
            '<h3 class="center">Bona Pizza\n</h3>' +
            '<div>Время работы</div>' +
            '<ul>\n' +
            '  <li>Понедельник 10:00 – 22:00</li>\n' +
            '  <li>Вторник 10:00 – 22:00</li>\n' +
            '  <li>Среда 10:00 – 22:00</li>\n' +
            '  <li>Четверг 10:00 – 22:00</li>\n' +
            '  <li>Пятница 10:00 – 22:00</li>\n' +
            '  <li>Суббота 10:00 – 22:00</li>\n' +
            '  <li>Воскресенье 10:00 – 22:00</li>\n' +
            '</ul>'

        ],
        iconLayout: 'default#image', // тип макета
        iconImageHref: 'img/icon/fast-food.png', // путь
        iconImageSize: [28, 28], // размеры
        iconImageOffset: [-14, -14] // по умолчанию левый верхний угол
    },
    {
        latitude: 53.305076,
        longitude: 34.303061,
        hintContent: 'Суши-бар, пиццерия',
        balloonContent: [
            '<h3 class="center">Автосуши</h3>' +
            '<div>Время работы</div>' +
            '<ul>\n' +
            '  <li>Понедельник 11:00 – 23:00</li>\n' +
            '  <li>Вторник 11:00 – 23:00</li>\n' +
            '  <li>Среда 11:00 – 23:00</li>\n' +
            '  <li>Четверг 11:00 – 23:00</li>\n' +
            '  <li>Пятница 11:00 – 23:00</li>\n' +
            '  <li>Суббота 11:00 – 23:00</li>\n' +
            '  <li>Воскресенье 11:00 – 23:00</li>\n' +
            '</ul>'

        ],
        iconLayout: 'default#image', // тип макета
        iconImageHref: 'img/icon/sush.png', // путь
        iconImageSize: [28, 28], // размеры
        iconImageOffset: [-14, -14] // по умолчанию левый верхний угол
    },
    {
        latitude: 53.309106,
        longitude: 34.304686,
        hintContent: 'Доставка еды и обедов, суши-бар',
        balloonContent: [
            '<h3 class="center">Чиккен Пицца\n</h3>' +
            '<div>Время работы</div>' +
            '<ul>\n' +
            '  <li>Понедельник 10:00 – 22:00</li>\n' +
            '  <li>Вторник 10:00 – 22:00</li>\n' +
            '  <li>Среда 10:00 – 22:00</li>\n' +
            '  <li>Четверг 10:00 – 22:00</li>\n' +
            '  <li>Пятница 10:00 – 22:00</li>\n' +
            '  <li>Суббота 10:00 – 22:00</li>\n' +
            '  <li>Воскресенье 10:00 – 22:00</li>\n' +
            '</ul>'
        ],
        iconLayout: 'default#image', // тип макета
        iconImageHref: 'img/icon/sush.png', // путь
        iconImageSize: [28, 28], // размеры
        iconImageOffset: [-14, -14] // по умолчанию левый верхний угол
    },
    {
        latitude: 53.307444,
        longitude: 34.306515,
        hintContent: 'Кофейня\n',
        balloonContent: [
            '<h3 class="center">Cat</h3>' +
            '<div>Время работы</div>' +
            '<ul>\n' +
            '  <li>Понедельник 09:00 – 21:00</li>\n' +
            '  <li>Вторник 09:00 – 21:00</li>\n' +
            '  <li>Среда 09:00 – 21:00</li>\n' +
            '  <li>Четверг 09:00 – 21:00</li>\n' +
            '  <li>Пятница 09:00 – 21:00</li>\n' +
            '  <li>Суббота 10:00 – 22:00</li>\n' +
            '  <li>Воскресенье 10:00 – 22:00</li>\n' +
            '</ul>'

        ],
        iconLayout: 'default#image', // тип макета
        iconImageHref: 'img/icon/coffee.png', // путь
        iconImageSize: [28, 28], // размеры
        iconImageOffset: [-14, -14] // по умолчанию левый верхний угол
    }
];

function init(){
    var myMap = new ymaps.Map ("map", {
        center: [53.30450294688872, 34.303863996173504],
        zoom: 15,
        controls: ['rulerControl']
    });

    for (var i = 0; i < placemarks.length; i++) {
        var myPlacemark = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
            {
                hintContent: placemarks[i].hintContent,
                balloonContent: placemarks[i].balloonContent
            },
            {
                iconLayout: placemarks[i].iconLayout,
                iconImageHref: placemarks[i].iconImageHref,
                iconImageSize: placemarks[i].iconImageSize,
                iconImageOffset: placemarks[i].iconImageOffset
            });
        myMap.geoObjects.add(myPlacemark);
    }
}

function buttonTaskOnClick(){
    alert("2. Инициализируйте на странице карту заведений общественного питания," +
        " расположенных в пределах 700м от БГТУ, в качестве меток используйте клипарт," +
        " связанный с типом заведения (кафе, кофейня, закусочная)." +
        " В балунах разместите их полные наименования и время работы.");
}