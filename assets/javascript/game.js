var sediousHealth = 100;
var jokerHealth = 130;
var sauronHealth = 150;
var voldemortHealth = 180;
var players = [];

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
var sedious = new Villains('sedious', sediousHealth, 10, 15, 0);
players.push(sedious);
var joker = new Villains('joker', jokerHealth, 15, 12, 0);
players.push(joker);
var sauron = new Villains('sauron', sauronHealth, 20, 9, 0);
players.push(sauron);
var voldemort = new Villains('voldemort', voldemortHealth, 25, 6, 0);
players.push(voldemort);

function initializePlayer() {

    //show initial health
    $("#healthSedious").text(sedious.health);
    $("#healthJoker").text(joker.health);
    $("#healthSauron").text(sauron.health);
    $("#healthVoldemort").text(voldemort.health);

}

function getPlayerStatus(playerClicked) {
    for (var i = 0; i < players.length; i++) {
        var element = players[i];
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
    for (var i = 0; i < players.length; i++) {
        var element = players[i];

        if (element.name == playerClicked) {
            element.status = 3;
        }

    }
}
function reOrgPlayers() {


    for (var i = 0; i < players.length; i++) {
        var player = players[i];
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
    }

}


$(document).ready(function () {

    // Your code here...
    initializePlayer();

    $(".player").on("click", function () {
        var col = $(this);
        var playerClicked = $(this).attr("id");
        var playerStatus = getPlayerStatus(playerClicked);
        //beginning of game
        if (playerStatus == 0) {
            selectChosenOne(playerClicked);
            console.log("inside click " + playerStatus + " " + sedious.status);

        }
        //already chose your player now selection opponent
        else if (playerStatus == 2) {
            selectOpponunt(playerClicked);
        }
        reOrgPlayers();


    });


});

