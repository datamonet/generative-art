let sketch = function(p) {
  let initial_size = 5;
  let initial_deviation = 700;
  let deviation = 120;
  let number_of_interpolations = 5;

  let points;
  let current;

  p.setup = function() {
    p.createCanvas(2000, 1200);
    //p.background("#111");
    p.noFill();
    p.colorMode(p.HSB);
    p.blendMode(p.SOFT_LIGHT);
    p.strokeWeight(2);
    p.noLoop();

  }

  p.draw = function() {
    for (var h = -100; h < p.height; h+=250) {
      init(p.height/2);
      p.stroke(p.random(160)+ 150,100,80, .005);
      for (var i = 0; i < 100; i++) {
        current = update();
        display();
      }
    }
  }
  
  function init (ypos) {
    points = [];
    for (var i = 0; i < initial_size; i++) {
      points.push(p.createVector((i / (initial_size - 1)) * p.width, ypos, 0.1));
    }
    for(let b = 0; b < number_of_interpolations; b++) {
      interpolate(points, initial_deviation);
    }
  }
  
  function update () {
    let c = deep_copy(points);
    for(let b = 0; b < 8; b++) {
      for (let i = 0; i < c.length; i++) {
        move_nearby(c[i], deviation);
      }
    }
    return c;
  }

  function display () {
    p.beginShape();
    p.vertex(0, current[0].y);
    for (let i = 0; i < current.length; i++) {
      p.vertex(current[i].x, current[i].y);
    }
    p.vertex(p.width, current[current.length-1].y);
    p.vertex(p.width,p.height);
    p.vertex(0,p.height);
    p.endShape(p.CLOSE);
  }

  function interpolate (points, sd) {
    for (var i = points.length-1; i > 0; i--) {
      points.splice(i, 0, generate_midpoint(points[i-1], points[i], sd));
    }
  }

  function generate_midpoint (p1, p2, sd) {
    let p3 = p.createVector((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, ((p1.z + p2.z) / 2) * .3 * p.random(.1, 3.5));
    move_nearby(p3, sd);
    return p3;
  }

  let move_nearby = function(pnt, sd) {
    pnt.x = p.randomGaussian(pnt.x, pnt.z * sd);
    pnt.y = p.randomGaussian(pnt.y, pnt.z * sd);
  }

  let deep_copy = function(arr) {
    let narr = [];
    for (var i = 0; i < arr.length; i++) {
      narr.push(arr[i].copy());
    }
    return narr;
  }

  p.keyPressed = function () {
    if (p.keyCode === 80) {
      p.saveCanvas("landslide", "jpeg");
    }
  }
}
new p5(sketch);