class Shape {
  constructor(center, w, h) {
    this.center = center;
    this.w = w;
    this.h = h;
    this.middle = null;
    this.tl = null;
    this.tr = null;
    this.bl = null;
    this.br = null;
    this.divided = false;
  }

  divide() {
    if (!this.divided) {
      const w = this.w / 3;
      const h = this.h / 3;
      const xOff = this.w / 3;
      const yOff = this.h / 3;
      this.middle = new Shape(this.center, w, h);
      this.tl = new Shape(createVector(this.center.x, this.center.y - yOff), w, h);
      this.tr = new Shape(createVector(this.center.x, this.center.y + yOff), w, h);
      this.br = new Shape(createVector(this.center.x + xOff, this.center.y), w, h);
      this.bl = new Shape(createVector(this.center.x - xOff, this.center.y), w, h);
      this.divided = true;
    } else {
      this.middle.divide();
      this.tl.divide();
      this.tr.divide();
      this.br.divide();
      this.bl.divide();
    }
  }

  show() {
    if (!this.divided) {
      rect(this.center.x, this.center.y, this.w, this.h);
    } else {
      this.middle.show();
      this.tl.show();
      this.tr.show();
      this.br.show();
      this.bl.show();
    }
  }
}

let generation = 0;
let shape;

function generate() {
  if (generation < 10) {
    background(255);
    shape.divide();
    shape.show();
    generation++;
  }
}

function setup() {
  const canvas = document.querySelector('canvas');
  if (canvas) canvas.remove();
  createCanvas(1200, 1200);
  frameRate(30);
  background(255);
  rectMode(CENTER);
  noStroke();
  fill(0);

  shape = new Shape(createVector(width / 2, height / 2), width, height);
  shape.show();
}

function draw() {}

function windowResized() {
  setup();
}

function mousePressed() {
  generate();
}
