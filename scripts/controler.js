var predictions = [];
var teethPredictions;
var fixedPredictions;

leftSidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

searchButton.addEventListener("click", () => {
  sidebar.classList.remove("close");
});

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeText.innerText = "Light mode";
  } else {
    modeText.innerText = "Dark mode";
  }
});

detection.addEventListener("click", () => {
  console.log("detect...");
  predictions = [];
  sendImage = canvas.toDataURL("image/jpeg", 1.0);
  teethDetection(sendImage);
  fixedTeethDetection(sendImage);
});

function teethDetection(img) {
  axios({
    method: "POST",
    url: "https://detect.roboflow.com/teeth-detection-and-numbering-agi2i/10",
    params: {
      api_key: "NvTvcum4o3Uys68hJOQu",
    },
    data: img,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(function (response) {
      teethPredictions = response.data["predictions"];
      predictions = predictions.concat(teethPredictions);
    })
    .catch(function (error) {
      console.log(error.message);
    });
}

function fixedTeethDetection(img) {
  axios({
    method: "POST",
    url: "https://detect.roboflow.com/mergedata-gkvhk/1",
    params: {
      api_key: "NvTvcum4o3Uys68hJOQu",
    },
    data: img,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(function (response) {
      fixedPredictions = response.data["predictions"];
      predictions = predictions.concat(fixedPredictions);
      animate();
    })
    .catch(function (error) {
      console.log(error.message);
    });
}
