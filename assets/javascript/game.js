var sediousHealth = 100;
var jokerHealth = 130;
var sauronHealth = 150;
var voldemortHealth = 180;
var players = [];

var chosenOneName;
var chosenOneAttackPower;

var opponentName;
var opponentAttackPower;
var player; // temp object to use with all loops

var availableOppo = 3;
var flagOppo = false;
var lost = false;


//constructor for players
function Villains(name, health, attackPower, learningPace, status) {
    //treating this kinda like pk so that html can have fk that relates to the element
    this.name = name;
    this.health = health;
    this.attackPower = attackPower;
    //@todo change learning pace according to who you are fightinng - add a 2 dimentional array
    //for now fixed learning power
    this.learningPace = learningPace;
    // 0 player , 1 chosen one, 2 available to attack, 3 defender, 4 defeated
    this.status = status;
}


//make an array of villains 
var sedious = new Villains('sedious', sediousHealth, 9, 15, 0);
players.push(sedious);
var joker = new Villains('joker', jokerHealth, 12, 12, 0);
players.push(joker);
var sauron = new Villains('sauron', sauronHealth, 15, 9, 0);
players.push(sauron);
var voldemort = new Villains('voldemort', voldemortHealth, 18, 6, 0);
players.push(voldemort);

function displayPlayerHealth() {

    //show initial health
    $("#healthSedious").text(sedious.health);
    $("#healthJoker").text(joker.health);
    $("#healthSauron").text(sauron.health);
    $("#healthVoldemort").text(voldemort.health);

}


function getPlayerStatus(playerClicked) {
    for (var i = 0; i < players.length; i++) {
        element = players[i];
        if (element.name == playerClicked) {
            return element.status;
        }
    }
}

function selectChosenOne(playerClicked) {

    for (var i = 0; i < players.length; i++) {
        var element = players[i];
        if (element.name == playerClicked) {
            element.status = 1;
        }
        else {
            element.status = 2;
        }

    }

}
function selectOpponunt(playerClicked) {
    if (!flagOppo) {
        for (var i = 0; i < players.length; i++) {
            var element = players[i];

            if (element.name == playerClicked) {
                element.status = 3;
                flagOppo = true;

            }

        }
    }
}
function reOrgPlayers() {

    for (var i = 0; i < players.length; i++) {
        player = players[i];
        var col = $(player.name);
        if (player.status == 1) {

            $("#default").append($("#" + player.name));
        }
        else if (player.status == 2) {
            $("#available").append($("#" + player.name));
        }
        else if (player.status == 3) {
            $("#opponent").append($("#" + player.name));
        }
        else if (player.status == 4) {
            $("#" + player.name).remove();
        }

    }

}

function setPlayers() {

    //get data needed to capture correct fighters
    for (var i = 0; i < players.length; i++) {
        player = players[i];
        if (player.status == 1) {
            chosenOneName = players[i].name;
            chosenOneAttackPower = players[i].attackPower;
        }
        else if (player.status == 3) {
            opponentName = players[i].name;
            opponentAttackPower = players[i].attackPower;
        }

    }

}

function updateMessage() {
    if (availableOppo == 0) {
        $("#scoreUpdate").text("Winner Of The Game !!! Reset to Play Again");
        $("#attack").prop('disabled', true);

    }
    else if (lost) {

    }
    else {
        if (chosenOneName == undefined) {
            $("#scoreUpdate").text("Please Select a Player");

        }
        else if (opponentName == undefined) {
            $("#scoreUpdate").text("Please Select an Opponent");
        }
        else {
            $("#scoreUpdate").text(opponentName + " damaged you by " + opponentAttackPower + "\n"
                + " you attacked back for " + chosenOneAttackPower + " damage");

        }
    }

}

function doTheDamage() {

    for (var i = 0; i < players.length; i++) {
        player = players[i];
        if (player.name == chosenOneName) {
            if (opponentName != undefined) {
                player.health -= opponentAttackPower;
                player.attackPower += player.learningPace;
            }
            if (player.health < 1) {
                lost = true;
                $("#attack").prop('disabled', true);
                $("#scoreUpdate").text("sorry ! looks like you lost!! please reset to play again!!");
            }

        }
        else if ((player.name == opponentName) && (!lost)) {
            //it is so unfair that opponent never learns!!!
            player.health -= chosenOneAttackPower;

            if (player.health < 1) {
                player.status = 4;
                flagOppo = false;
                opponentAttackPower = undefined;
                opponentName = undefined;
                $("#scoreUpdate").text("you won!! Please select another opponent");
                availableOppo--;

            }
        }
    }
}
function attack() {

    setPlayers();
    doTheDamage();
    updateMessage();
}


$(document).ready(function () {

    displayPlayerHealth();

    $(".player").on("click", function () {
        //reset text for score
        $("#scoreUpdate").text(" ");

        var col = $(this);
        var playerClicked = $(this).attr("id");
        var playerStatus = getPlayerStatus(playerClicked);

        //beginning of game
        if (playerStatus == 0) {
            selectChosenOne(playerClicked);
        }
        //already chose your player now selection opponent
        else if (playerStatus == 2) {
            selectOpponunt(playerClicked);
        }
        reOrgPlayers();
    });

    // reset - at any pont in game if you want to restart or at win or lose - restart
    $("#reset").on("click", function () {
        location.reload();

    });

    $("#attack").on("click", function () {
        attack();
        displayPlayerHealth();
        reOrgPlayers();

    });

});

