window.onload = function() {
    $(document).tooltip();
    local();
};

function local() {
    $('.localidad').click(function() {
        $('.tarjeta').fadeOut();
        $.get('http://127.0.0.1:3000/localitats?name=' + $(this).attr('id'), function(datos) {
            datos = datos[0];
            switch (datos.weather) {
                case 'Sol':
                    img = 'img/soleado.png';
                    break;

                case 'Nublat':
                    img = 'img/nublado.png';
                    break;

                case 'Pluja':
                    img = 'img/lluvia.png';
                    break;
            }
            $('#datos_' + $(this).attr('id') + ' .img').attr('src', img);
            $('#datos_' + $(this).attr('id') + ' .max').html(datos.max);
            $('#datos_' + $(this).attr('id') + ' .min').html(datos.min);
            $('#datos_' + $(this).attr('id')).fadeIn();
        }.bind(this));
    });

    $('.tarjeta p').click(function() {
        $('.tarjeta').fadeOut();
    });

    $('#mapa').click(function() {
        $('.tarjeta').fadeOut();
    }).children().click(function() {
        return false;
    });
}

function openWeather() {
    var url = 'http://api.openweathermap.org/data/2.5/group?id=6533961,6533957,2512398,6533938,2522092&units=metric&lang=es&APPID=8c13bf64e7b0ea198cee7965841d2551';
    $('.localidad').click(function() {
        var tarjetas = $('.tarjeta');
        let i = 0;

        $.get(url, function(datos) {
            datos = datos.list;

            datos.forEach(element => {
                var titulo = tarjetas[i].children[0].innerHTML;

                if (element.name == titulo) {
                    switch (element.weather[0].main) {
                        case 'Clear':
                            img = 'img/soleado.png';
                            break;

                        case 'Clouds':
                            img = 'img/nublado.png';
                            break;

                        case 'Rain':
                            img = 'img/lluvia.png';
                            break;
                        case 'Thunderstorm':
                            img = 'img/lluvia.png';
                            break;
                    }
                    tarjetas[i].children[2].children[0].children[0].children[1].children[0].src = img;
                    tarjetas[i].children[2].children[0].children[1].children[1].innerHTML = element.main.temp_max;
                    tarjetas[i].children[2].children[0].children[2].children[1].innerHTML = element.main.temp_min;
                    $(element).fadeIn();
                }

                $('.tarjeta p').click(function() {
                    $(element).fadeOut();
                });

                $('#mapa').click(function() {
                    $(element).fadeOut();
                }).children().click(function() {
                    return false;
                });

                i++;
            });
        }.bind(this));
    });
}

function capturar() {
    var resultado;
    var tipo = document.getElementsByName('cambio');
    for (var i = 0; i < tipo.length; i++) {
        if (tipo[i].checked) {
            resultado = tipo[i].value;
        }
    }
    if (resultado == 'local') {
        local();
    } else {
        openWeather();
    }
}