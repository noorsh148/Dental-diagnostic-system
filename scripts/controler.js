var predictions;

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
  sendImage = canvas.toDataURL("image/jpeg", 1.0);
  axios({
    method: "POST",
    url: "https://detect.roboflow.com/teeth-detection-and-numbering-agi2i/10",
    params: {
      api_key: "NvTvcum4o3Uys68hJOQu",
    },
    data: sendImage,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(function (response) {
      predictions = response.data["predictions"];
      console.log(predictions);
      animate();
    })
    .catch(function (error) {
      console.log(error.message);
    });
});
