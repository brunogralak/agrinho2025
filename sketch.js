let player1, player2;
let coins = [];
let gameTime = 30; // segundos
let startTime;
let gameEnded = false;

function setup() {
  createCanvas(800, 400);
  player1 = createPlayer(100, height / 4, 'red', ['W', 'A', 'S', 'D']);
  player2 = createPlayer(100, 3 * height / 4, 'blue', ['I', 'J', 'K', 'L']);
  spawnCoins(10);
  startTime = millis();
  textSize(20);
}

function draw() {
  background(220);

  if (!gameEnded && millis() - startTime > gameTime * 1000) {
    gameEnded = true;
  }

  drawField();

  if (gameEnded) {
    displayWinner();
  }
}

function drawField() {
  fill(0);
  text("Tempo restante: " + max(0, gameTime - floor((millis() - startTime) / 1000)), width / 2 - 80, 20);
  text("Jogador 1: " + player1.score, 20, 20);
  text("Jogador 2: " + player2.score, width - 160, 20);

  // Draw players
  drawPlayer(player1);
  drawPlayer(player2);

  // Draw coins
  for (let c of coins) {
    fill(255, 215, 0);
    ellipse(c.x, c.y, 20);
  }

  // Check collisions
  collectCoins(player1);
  collectCoins(player2);
}

function keyPressed() {
  if (!gameEnded) {
    movePlayer(player1, key.toUpperCase());
    movePlayer(player2, key.toUpperCase());
  }
}

function createPlayer(x, y, c, keys) {
  return {
    x: x,
    y: y,
    size: 30,
    color: c,
    score: 0,
    keys: keys
  };
}

function movePlayer(p, k) {
  let step = 10;
  if (k === p.keys[0]) p.y -= step;
  if (k === p.keys[1]) p.x -= step;
  if (k === p.keys[2]) p.y += step;
  if (k === p.keys[3]) p.x += step;

  // limites da tela
  p.x = constrain(p.x, 0, width);
  p.y = constrain(p.y, 0, height);
}

function drawPlayer(p) {
  fill(p.color);
  ellipse(p.x, p.y, p.size);
}

function spawnCoins(n) {
  for (let i = 0; i < n; i++) {
    coins.push({
      x: random(50, width - 50),
      y: random(50, height - 50)
    });
  }
}

function collectCoins(player) {
  for (let i = coins.length - 1; i >= 0; i--) {
    let d = dist(player.x, player.y, coins[i].x, coins[i].y);
    if (d < player.size / 2 + 10) {
      coins.splice(i, 1);
      player.score++;
    }
  }

  // Respawn se acabar
  if (coins.length === 0 && !gameEnded) {
    spawnCoins(10);
  }
}

function displayWinner() {
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  if (player1.score > player2.score) {
    text("🏆 Jogador 1 venceu!", width / 2, height / 2);
  } else if (player2.score > player1.score) {
    text("🏆 Jogador 2 venceu!", width / 2, height / 2);
  } else {
    text("🤝 Empate!", width / 2, height / 2);
  }
}
