const chars = [];
const allChars = [
  'a', '8', 'c', 'C', 'h', 'H', 'i', 'I', 'k', 'o',
  '9', 's', 't', 'w', 'x', 'y', 'Y', '^',
];
let fonts;
let canvas;
let frameBorder;

function preload() {
  fonts = [
    loadFont('VoynichBlackLetter.ttf'),
    loadFont('VoynichGrotesque.ttf'),
    loadFont('VoynichInscriptional.ttf'),
    loadFont('VoynichModern.ttf'),
    loadFont('VoynichOld.ttf'),
    loadFont('VoynichSlab.ttf'),
  ];
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  frameRate(30);
  frameBorder = width * 0.15; // 15% of the width

  for (let i = 1; i < 300; i++) {
    chars.push({
      x: random(0, width),
      y: random(0, height),
      char: random(allChars),
      size: random(12, 64),
      fontNum: floor(random(0, 6)),
      speedX: random(1, 5) * 0.1 * random([-1, 1]),
      speedY: random(1, 5) * 0.1 * random([-1, 1]),
      color: color(random(128) + random(128), random(128) + random(128), random(128) + random(128)),
    });
  }
}

function draw() {
  background(0);
  for (const char of chars) {
    drawChar(char);
    moveChar(char);
  }

  noFill();
  stroke(20);
  strokeWeight(frameBorder);
  rect(0, 0, width, height);
  stroke(40);
  strokeWeight(frameBorder * 0.8);
  rect(0, 0, width, height);
}

function drawChar(char) {
  noStroke();
  fill(char.color);
  textSize(char.size);
  textFont(fonts[char.fontNum]);
  text(char.char, char.x, char.y);
}

function moveChar(char) {
  char.x += char.speedX;
  if (char.x > width) {
    char.x = 0;
  }
  if (char.x < 0) {
    char.x = width;
  }
  char.y += char.speedY;
  if (char.y > height) {
    char.y = 0;
  }
  if (char.y < 0) {
    char.y = height;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  frameBorder = width * 0.15;
}
