//CONSTANTS
var INITIAL_PLAYER_WIDTH = 202;
var INITIAL_PLAYER_HEIGHT = 400;
var CANVAS_HEIGHT = 606;
var CANVAS_WIDTH = 505;
// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x  = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * (100)) + 50;
    this.width = 50;
    this.height = 50;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    for(var  i=0; i< 4; i++){
      enemies[i].x  += dt * enemies[i].speed;

      if(enemies[i].x > 505){
         enemies[i].x = -100;
         //Changing speed after reseting an enemy
         enemies[i].speed = Math.floor(Math.random() * (100)) + 50
      }
    }

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
  this.sprite = 'images/char-boy.png';
  this.x  = x;
  this.y = y;
  this.width = 50;
  this.height = 50;
}

Player.prototype.update = function(){
  for(var i=0; i < 4; i++){
    if(Math.floor(enemies[i].x) < Math.floor(player.x) + Math.floor(player.width) &&
       Math.floor(enemies[i].x) + Math.floor(enemies[i].width) > Math.floor(player.x) &&
       Math.floor(enemies[i].y) < Math.floor(player.y) + Math.floor(player.height) &&
       Math.floor(enemies[i].height) + Math.floor(enemies[i].y) > Math.floor(player.y)){
         player.y = INITIAL_PLAYER_HEIGHT;
     }
  }
}

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key){
  switch(key){
    case 'up':
      if(player.y > 0)
         player.y += -82;
      break;
    case 'left':
      if(player.x > 5)
         player.x += -100;
      break;
    case 'right':
      if(player.x < CANVAS_WIDTH - 110)
         player.x += 100;
      break;
    case 'down':
      if(player.y < INITIAL_PLAYER_HEIGHT)
        player.y += 82;

      break;
  }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemyX = -100, enemyY = 50;
var enemies = [];
for(var i=0; i< 4; i++){
  var enemy = new Enemy(enemyX,enemyY);

  enemyY +=85;
  enemies.push(enemy);

}
var player = new Player(INITIAL_PLAYER_WIDTH, INITIAL_PLAYER_HEIGHT);
var allEnemies = enemies;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
