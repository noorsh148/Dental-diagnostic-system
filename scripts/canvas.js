var molarColor = "#FF6075";
var premolorColor = "#7CFF7E";
var caninieColor = "#FFFD7C";
var incisorColor = "#49E9FF";

var crownBridge = "#dc00ff";
var filling = "#ff0000";
var implant = "#e9ff00";
var rootCanalObturation = "#00ff2e";

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

    var distance = Math.sqrt(
      Math.pow(mouse.x - centerX, 2) + Math.pow(mouse.y - centerY, 2)
    );

    boxColor(classType);
    if (distance <= 30) {
      context.beginPath();
      context.lineWidth = "1";
      context.rect(x - 3, y - 3, width + 6, height + 6);
      context.stroke();

      context.fillStyle = "#ffffff";
      context.font = "14px Arial ";
      context.fillText(classType, x - 5, y - 5);
    } else {
      context.beginPath();
      context.lineWidth = "1";
      context.rect(x, y, width, height);
      context.stroke();
    }
  });
}

function boxColor(classType) {
  if (classType[1] == "1" || classType[1] == "2") {
    context.strokeStyle = incisorColor;
  } else if (classType[1] == "3") {
    context.strokeStyle = caninieColor;
  } else if (classType[1] == "4" || classType[1] == "5") {
    context.strokeStyle = premolorColor;
  } else if (
    classType[1] == "6" ||
    classType[1] == "7" ||
    classType[1] == "8"
  ) {
    context.strokeStyle = molarColor;
  } else if (classType == "Crown - bridge") {
    context.strokeStyle = crownBridge;
  } else if (classType == "Filling") {
    context.strokeStyle = filling;
  } else if (classType == "Implant") {
    context.strokeStyle = implant;
  } else if (classType == "Root Canal Obturation") {
    context.strokeStyle = rootCanalObturation;
  }
}
