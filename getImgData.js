const image = document.getElementById("image");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

function drawLine(startX, startY, endX, endY) {
  // For better performance bunch calls to lineTo WITHOUT beginPath() and stroke() inbetween.
  context.beginPath(); // resets the current path
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
}

var rgbArray = [];

image.onload = () => {
  canvas.width = image.width;
  canvas.height = image.height;
  context.drawImage(image, 0, 0, 600, 600);
  const imageData = context.getImageData(0, 0, image.width, image.height);

  // Create a 2D array to store RGB values
  rgbArray = [];

  for (let y = 0; y < image.height; y++) {
    const row = [];
    for (let x = 0; x < image.width; x++) {
      const index = (y * image.width + x) * 4; // Each pixel has 4 values: R, G, B, and A.
      const r = imageData.data[index];
      const g = imageData.data[index + 1];
      const b = imageData.data[index + 2];
      row.push({ r: r, g: g, b: b });
    }
    rgbArray.push(row);
  }

  // Now, rgbArray contains the RGB values of each pixel in the image.
};

// Load the image
image.src = "mona.jpg";
