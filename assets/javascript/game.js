let characterAttack = 0;
let characterHP = 0;
let defenderHP = 0;
let defenderCounterAttack = 0;

$('body').on('click', '.character', function() {
    $('.character').off('click');
    $('#chosenCharacter').append(this);
    $(this).attr('id', 'yourCharacter');
    $(this).removeClass('character');
    characterHP = parseInt($(this).attr('data-hp'));
    $('#attackableEnemies').append($('.character'));
    $('.character').attr('class', 'imageContainer possibleEnemy enemy');
    $('.character').remove('character');
    $('.enemy').on('click', function() {
        $('#defender').append(this);
    })
})

$('body').on('click', '.possibleEnemy', function() {
    $('.possibleEnemy').off('click');
    $(this).attr('id', 'opponent');
    $('#defender').append(this);
    defenderHP = parseInt($('#opponent').attr('data-hp'));
    $('.enemy').removeClass('possibleEnemy');
})

$('body').on('click', '#attackButton', function() {
    if (defenderHP > 0 && characterHP > 0) {
        characterAttack += parseInt($('#yourCharacter').attr('data-attack'));
        defenderCounterAttack = parseInt($('#opponent').attr('data-counterattack'));
        defenderHP -= characterAttack;
        $('#opponent').data('hp', defenderHP);
        if (defenderHP > 0) {
            characterHP -= defenderCounterAttack;
            $('aside').html(`You attacked for ${characterAttack} damage! <br> You were attacked for ${defenderCounterAttack} damage!`)
        }
        else {
            $('#opponent').remove();
            $('.enemy').attr('class', 'imageContainer possibleEnemy enemy');
            $('yourCharacter').data('hp', characterHP);
            $('aside').html(`You attacked for ${characterAttack} damage and defeated your opponent!`)
        }
        if (characterHP <= 0) {
            $('aside').html(`You attacked for ${characterAttack} damage! However, your opponent attacked for ${defenderCounterAttack} damage and defeated you.`);
        }
    }
})

$('body').on('click', function() {
    $('#yourCharacter .HP').html(characterHP);
    $('#opponent .HP').html(defenderHP);
})