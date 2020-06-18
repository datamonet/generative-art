let sketch = function(p) {
  let steps = 8;
  let size = 800;

  p.setup = function() {
    p.createCanvas(size,size);
    p.noStroke();
    p.fill(50);
    p.blendMode(p.OVERLAY);
    p.noLoop();
    p.frameRate(1);
  }

  p.draw = function() {
    p.clear();
    p.fill(22,23,22);
    let s = generate_string(steps);
    display(s);
  }

  function generate_string (d) {
    if (d == 0) {
      let r = p.random(5);
      if (r < 1) return "W";
      return "B";
    }

    let r = p.random(15 + (d * 10));
    if (r < 4) return "W";
    if (r < 20) return "B";
    let ul = generate_string(d - 1);
    let ur = generate_string(d - 1);
    let ll = generate_string(d - 1);
    let lr = generate_string(d - 1);
    return "[" + ul + "-" + ur + "/" + ll + "-" + lr + "]";
  }

  function display(s) {
    let depth = 0;
    for(let i = 0; i < s.length; i++) {
      let t = s[i];
      let cur_size = size / p.pow(2, depth);
      //p.fill(p.random(255),p.random(255),p.random(255));
      if (t == "B") {
        p.rect(0, 0, cur_size-1, cur_size-1);
      } else if (t == "[") {
        depth++;
      } else if (t == "]") {
        p.translate(-cur_size, -cur_size);
        depth--;
      } else if (t == "-") {
        p.translate(cur_size, 0);
      } else if (t == "/") {
        p.translate(-cur_size, cur_size);
      }
    }
  }


}

new p5(sketch);
