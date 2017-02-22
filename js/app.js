var INITIAL_PLAYER_WIDTH = 202;
var INITIAL_PLAYER_HEIGHT = 400;
var CANVAS_HEIGHT = 606;
var CANVAS_WIDTH = 505;

var Enemy = function(x,y) {
    this.sprite = 'images/enemy-bug.png';
    this.x  = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * (100)) + 50;
    this.width = 50;
    this.height = 50;
}

Enemy.prototype.update = function(dt) {
    for(var  i=0; i< 4; i++){
      enemies[i].x  += dt * enemies[i].speed;

      if(enemies[i].x > 505){
         enemies[i].x = -100;
         enemies[i].speed = Math.floor(Math.random() * (100)) + 50
      }
    }

}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

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

var enemyX = -100, enemyY = 50;
var enemies = [];
for(var i=0; i< 4; i++){
  var enemy = new Enemy(enemyX,enemyY);

  enemyY +=85;
  enemies.push(enemy);

}
var player = new Player(INITIAL_PLAYER_WIDTH, INITIAL_PLAYER_HEIGHT);
var allEnemies = enemies;


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
