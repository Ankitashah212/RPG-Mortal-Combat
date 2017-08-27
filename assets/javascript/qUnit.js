var sediousHealth = 100;
var jokerHealth = 130;
var sauronHealth = 150;
var voldemortHealth = 180;
var players = [];
var chosenOneName;
var chosenOneAttackPower;
var ChosenOneCounter;
var opponentName;
var oppoCounter;
var player; // temp object to use with all loops
var availableOppo = 3;
var flagOppo = false;
var lost = false;

//constructor for players
function Villains(name, health, attackPower, basePower, counterAttack, status) {
    //treating this kinda like pk so that html can have fk that relates to the element
    this.name = name;
    this.health = health;
    this.basePower = basePower;
    this.attackPower = attackPower;
    this.counterAttack = counterAttack;
    // 0 player , 1 chosen one, 2 available to attack, 3 defender, 4 defeated
    this.status = status;
}

//make an array of villains 
var sedious = new Villains('sedious', sediousHealth, 25, 25, 5, 0);
players.push(sedious);
var joker = new Villains('joker', jokerHealth, 11, 11, 10, 0);
players.push(joker);
var sauron = new Villains('sauron', sauronHealth, 10, 10, 20, 0);
players.push(sauron);
var voldemort = new Villains('voldemort', voldemortHealth, 9, 9, 25, 0);
players.push(voldemort);

function displayPlayerHealth() {
    //show initial health
    $("#healthSedious").text(sedious.health);
    $("#healthJoker").text(joker.health);
    $("#healthSauron").text(sauron.health);
    $("#healthVoldemort").text(voldemort.health);
}

//get the palyer status - chosenOne - available to attack, deffender or defeated
function getPlayerStatus(playerClicked) {
    for (var i = 0; i < players.length; i++) {
        element = players[i];
        if (element.name == playerClicked) {
            return element.status;
        }
    }
}

//set the player we chose to be
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

//picks opponent we chose
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

//after every change reset the player arrangemet to reflect the change
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

//once both parties are decided -set players for combat
//set corresponding variables
function setPlayers() {
    //get data needed to capture correct fighters
    for (var i = 0; i < players.length; i++) {
        player = players[i];
        if (player.status == 1) {
            chosenOneName = players[i].name;
            chosenOneAttackPower = players[i].attackPower;
            ChosenOneCounter = players[i].counterAttack;
        }
        else if (player.status == 3) {
            opponentName = players[i].name;
            oppoCounter = players[i].counterAttack;
        }
    }
}

function updateMessage() {
    if (availableOppo == 0) {
        $("#scoreUpdate").text("Winner Of The Game !!! Reset to Play Again");
        $("#attack").prop('disabled', true);
    }
    else if (lost) {
        $("#attack").prop('disabled', true);
        $("#scoreUpdate").text("sorry ! looks like you lost!! please reset to play again!!");
    }
    else {
        if (chosenOneName == undefined) {
            $("#scoreUpdate").text("Please Select a Player");
        }
        else if (opponentName == undefined) {
            $("#scoreUpdate").text("Please Select an Opponent");
        }
        else {
            $("#scoreUpdate").text(opponentName + " damaged you by " + oppoCounter + "\n"
                + " you attacked back for " + chosenOneAttackPower + " damage");
        }
    }
}

// damage the opponent
function doTheDamage() {
    for (var i = 0; i < players.length; i++) {
        player = players[i];
        if ((player.name == opponentName)) {
            //it is so unfair that opponent never learns!!!
            player.health -= chosenOneAttackPower;
            console.log(player.health);
            if (player.health < 1) {
                console.log("in here");
                player.status = 4;
                flagOppo = false;
                oppoCounter = undefined;
                opponentName = undefined;
                $("#scoreUpdate").text("you won!! Please select another opponent");
                availableOppo--;
            }
        }
    }
}

//reflect the damage done to player
function takeTheDamage() {
    if (opponentName != undefined) {
        for (var i = 0; i < players.length; i++) {
            player = players[i];
            if ((player.name == chosenOneName)) {
                console.log("oppo name " + opponentName);
                player.health -= oppoCounter;
                player.attackPower += player.basePower;
                if (player.health < 1) {
                    lost = true;
                }
            }
        }
    }
}

function attack() {
    setPlayers();
    doTheDamage();
    takeTheDamage();
    updateMessage();
}

 