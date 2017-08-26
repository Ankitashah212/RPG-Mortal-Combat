var sediousHealth = 100;
var jokerHealth = 130;
var sauronHealth = 150;
var voldemortHealth = 180;
var players = [4];

//constructor for players
function Villains(name, health, attackPower, learningPace, status) {
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
var sedious = new Villains('Darth Sedious', sediousHealth, 10, 15, 0);
players.push(sedious);
var joker = new Villains('Joker', jokerHealth, 15, 12, 0);
players.push(joker);
var sauron = new Villains('Sauron', sauronHealth, 20, 9, 0);
players.push(sauron);
var voldemort = new Villains('Lord Voldemort', voldemortHealth, 25, 6, 0);
players.push(voldemort);

function initializePlayer() {

    //show initial health
    $("#healthSedious").text(sedious.health);
    $("#healthJoker").text(joker.health);
    $("#healthSauron").text(sauron.health);
    $("#healthVoldemort").text(voldemort.health);
    //add status - adding dynamically - easier if I want to change my logic
    //everyone starts as player
    $("#sedious").attr("pStatus", 0);
    $("#joker").attr("pStatus", 0);
    $("#sauron").attr("pStatus", 0);
    $("#voldemort").attr("pStatus", 0);

}

function selectChosenOne(playerClicked) {
    
}
function selectOpponunt(playerClicked){

}

$(document).ready(function () {

    // Your code here...
    initializePlayer();

    $(".player").on("click", function () {
        var col = $(this);
        var playerClicked = $(this).attr("id");
        var playerStatus = $(this).attr("pStatus");

        console.log("here" + playerClicked);
        assignPlayers(playerClicked, playerStatus);

        if (playerStatus == 0) {
           selectChosenOne(playerClicked);
        }
        else if (playerStatus == 2) {            
           selectOpponunt(playerClicked);
            //$("#row3").append(col);
            //sedious.status++;
        }

    });


});

