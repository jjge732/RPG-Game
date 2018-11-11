$('body').on('click', '.character', function() {
    $('.character').off('click');
    $('#chosenCharacter').append(this);
    $(this).attr('id', 'yourCharacter');
    $(this).removeClass('character');
    $('#attackableEnemies').append($('.character'));
    $('.character').attr('class', 'enemy');
    $('span').classList.remove('character');
    $('.character').off('click', '.character');
    $('.enemy').on('click', function() {
        $('#defender').append(this);
    })
})

$('body').on('click', '.enemy', function() {
    $('#defender').append(this);
})