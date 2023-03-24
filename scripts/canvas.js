var context = canvas.getContext("2d");

var mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", function (event) {
  var canvasPos = canvas.getBoundingClientRect();
  mouse.x = Math.round(event.clientX - canvasPos.left);
  mouse.y = Math.round(event.clientY - canvasPos.top);
});

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, 1000, 500);
  context.drawImage(sourceImage, 0, 0, 1000, 500);

  predictions.forEach((boundingBox) => {
    centerX = boundingBox["x"];
    centerY = boundingBox["y"];

    x = centerX - boundingBox["width"] / 2;
    y = centerY - boundingBox["height"] / 2;

    width = boundingBox["width"];
    height = boundingBox["height"];

    confidence = boundingBox["confidence"];
    classType = boundingBox["class"];

    var dis = Math.sqrt(
      Math.pow(mouse.x - centerX, 2) + Math.pow(mouse.y - centerY, 2)
    );

    if (dis <= 30) {
      context.beginPath();
      context.lineWidth = "1";
      context.strokeStyle = "rgba(0, 255, 206,1)";
      context.rect(x - 3, y - 3, width + 6, height + 6);
      context.stroke();

      context.font = "10px Arial ";
      context.fillText(classType, centerX, centerY);
    } else {
      context.beginPath();
      context.lineWidth = "1";
      context.strokeStyle = "rgba(0, 255, 206,1)";
      context.rect(x, y, width, height);
      context.stroke();
    }
  });
}
