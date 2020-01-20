$(document).ready(function() {
    $('.localidad').click(function() {
        $('.tarjeta').addClass('off');
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
            $('#datos_' + $(this).attr('id')).removeClass('off');
        }.bind(this));
    });

    $('.tarjeta p').click(function() {
        $('.tarjeta').addClass('off');
    });

    $('#mapa').click(function() {
        $('.tarjeta').addClass('off');
    }).children().click(function() {
        return false;
    });
});