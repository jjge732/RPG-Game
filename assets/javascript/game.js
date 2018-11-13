//defines variables to be used in the program
let characterAttack = 0;
let characterHP = 0;
let defenderHP = 0;
let defenderCounterAttack = 0;
let attack;

//allows use on small screen
// if(window.matchMedia('(max-width: 730px)').matches) {
    
// }
// else {
    //dynamically adds on click function to character class
    $('body').on('click', '.character', function() {
        //turns off click functionality
        $('.character').off('click');
        //moves clicked fighter to your character area
        $('#chosenCharacter').append(this);
        //adds id to fighter clicked on to identify it as the user's character
        $(this).attr('id', 'yourCharacter');
        //removes character class from user's chosen character
        $(this).removeClass('character');
        //sets user's HP to that of the chosen character
        characterHP = parseInt($(this).attr('data-hp'));
        //adds id to all other fighters to indicate they are attackable
        $('#attackableEnemies').append($('.character'));
        //adds classes to be used later to other fighters
        $('.character').attr('class', 'imageContainer possibleEnemy enemy');
        //removes class of character from other fighters to stop multiple characters being selected as the user's character
        $('.character').remove('character');
    })

    //dynamically adds on click functionality to other fighters
    $('body').on('click', '.possibleEnemy', function() {
        //turns off click functionality
        $('.possibleEnemy').off('click');
        //adds id of opponent to chosen enemy
        $(this).attr('id', 'opponent');
        //moves chosen enemy to defender area
        $('#defender').append(this);
        //updates opponent HP to value of selected fighter
        defenderHP = parseInt($('#opponent').attr('data-hp'));
        //removes class of possible enemy from selected fighter
        $('.enemy').removeClass('possibleEnemy');
        //creates attack button and sets attack variable to this creation
        attack = $("<button id='attackButton'>");
        //adds button to div with id fight section
        $('#fightSection').append(attack);
        //sets text of attack button to attack
        attack.html('Attack');
    })

    //dynamically adds functionality to attack button
    $('body').on('click', '#attackButton', function() {
        //updates character attack after each attack
        characterAttack += parseInt($('#yourCharacter').attr('data-attack'));
        //sets enemy counterattack to value of selected enemy
        defenderCounterAttack = parseInt($('#opponent').attr('data-counterattack'));
        //changes defender HP by the value of character's attack
        defenderHP -= characterAttack;
        //updates display of enemy HP
        $('#opponent').data('hp', defenderHP);
        //checks if the enemy is still healthy enough to continue
        if (defenderHP > 0) {
            //adjusts user's HP by the value of the selected opponents counterattack
            characterHP -= defenderCounterAttack;
            $('aside').html(`You attacked for ${characterAttack} damage! <br> You were attacked for ${defenderCounterAttack} damage!`)
        }
        else {
            //removes attack button
            attack.remove();
            //adds classes back to other fighters not yet fought
            $('.enemy').attr('class', 'imageContainer possibleEnemy enemy');
            $('aside').html(`You attacked for ${characterAttack} damage and defeated ${$('#opponent .HP').attr('data-name')}!`);
            //removes opponent if they are not healthy enough to continue
            $('#opponent').remove();
        }
        //chceks if the user is able to keep attacking
        if (characterHP <= 0) {
            $('aside').html(`You attacked for ${characterAttack} damage! However, your opponent attacked for ${defenderCounterAttack} damage and defeated you.`);
            attack.remove();    //removes attack button if user's fighter cannot continue
        }
    })

    //updates display of user's and enemy's HP
    $('body').on('click', function() {
        $('#yourCharacter .HP').html($('#yourCharacter .HP').attr('data-name') + ': ' +characterHP);
        $('#opponent .HP').html($('#opponent .HP').attr('data-name') + ': ' + defenderHP);
    })
//}