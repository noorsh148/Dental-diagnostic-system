const body = document.querySelector('body');
sidebar = body.querySelector('nav');
toggle = body.querySelector(".toggle");
searchBtn = body.querySelector(".search-box");
modeSwitch = body.querySelector(".toggle-switch");
modeText = body.querySelector(".mode-text");
detection = body.querySelector(".detection");


toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
})

detection.addEventListener("click", () => {
    console.log("detect...");

    axios({
        method: "POST",
        url: "https://detect.roboflow.com/teeth-detection-and-numbering-agi2i/10",
        params: {
            api_key: "NvTvcum4o3Uys68hJOQu",
            image: "https://meadfamilydental.com/wp-content/uploads/2016/02/dental-x-ray.jpg"
        }
    })
    .then(function(response) {
        console.log(response.data);
    })
    .catch(function(error) {
        console.log(error.message);
    });

})

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
    } else {
        modeText.innerText = "Dark mode";

    }
});

