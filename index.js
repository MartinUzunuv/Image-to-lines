function lerp(a, b, t) {
  return a + (b - a) * t;
}

setTimeout(() => {
  context.fillStyle = "white";
  context.fillRect(0, 0, 600, 600);
  context.fillStyle = "black";
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate(Math.PI*1.5);
  context.translate(-canvas.height / 2,-canvas.width / 2);
  context.translate(canvas.width, 0);
  context.scale(-1, 1);
  for (let x = 0; x < 600; x += 1) {
    for (let y = 0; y < 600; y += 1) {
      let value =
        rgbArray[x][y].r / 3 + rgbArray[x][y].g / 3 + rgbArray[x][y].b / 3;
      if (value < 125) {
        rgbArray[x][y].c = true;
        // context.fillRect(x, y, 1, 1);
      } else {
        rgbArray[x][y].c = false;
      }
      rgbArray[x][y].f = false;
    }
  }
  for (let p = Math.PI; p < Math.PI * 3; p += Math.PI / 100) {
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 300) {
      let x1 = 300 + Math.cos(a) * 295;
      let y1 = 300 + Math.sin(a) * 295;
      let x2 = 300 + Math.cos(a + p) * 295;
      let y2 = 300 + Math.sin(a + p) * 295;
      // drawLine(x1, y1, x2, y2);
      let ac = 0;
      for (let t = 0; t < 1; t += 1 / 300) {
        // context.fillRect(lerp(x1, x2, t), lerp(y1, y2, t),2,2);
        let arrX = Math.floor(lerp(x1, x2, t));
        let arrY = Math.floor(lerp(y1, y2, t));
        if (rgbArray[arrX][arrY].c) {
          ac++;
        }
      }
      if (ac > strength) {
        drawLine(x1, y1, x2, y2);
        for (let t = 0; t < 1; t += 1 / 300) {
          let arrX = Math.floor(lerp(x1, x2, t));
          let arrY = Math.floor(lerp(y1, y2, t));
          rgbArray[arrX][arrY].c = false;
        }
      }
    }
  }
  console.log('now')
}, 100);
