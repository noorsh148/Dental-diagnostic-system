var body = document.querySelector('body');
var sidebar = body.querySelector('nav');
var toggle = body.querySelector(".toggle");
var searchBtn = body.querySelector(".search-box");
var modeSwitch = body.querySelector(".toggle-switch");
var modeText = body.querySelector(".mode-text");
var detection = body.querySelector(".detection");
var canvas = document.querySelector('canvas');

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
})

detection.addEventListener("click", () => {
    console.log("detect...");
    var image = canvas.toDataURL("image/jpeg", 1.0);
    axios({
        method: "POST",
        url: "https://detect.roboflow.com/teeth-detection-and-numbering-agi2i/10",
        params: {
            api_key: "NvTvcum4o3Uys68hJOQu"
        },
        data: image,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then(function(response) {

        var predictions = response.data['predictions'];
        var c = canvas.getContext('2d');
        
        predictions.forEach(boundingBox =>
        {
            console.log(boundingBox);
           
            centerX = boundingBox['x']
            centerY = boundingBox['y']
           
            x = centerX - boundingBox['width'] / 2
            y = centerY - boundingBox['height'] / 2
           
            width = boundingBox['width']
            height = boundingBox['height']
           
            confidence = boundingBox['confidence']
            classType = boundingBox['class'];

            c.beginPath();
            c.lineWidth = "4";
            c.strokeStyle = "red";
            c.rect(x,y,width,height);
            c.stroke();

            c.font = "30px Arial";
            c.fillText(classType,centerX,centerY);
        });   
    })
    .catch(function(error) {
        console.log(error.message);
    });
})

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark"))
    {
        modeText.innerText = "Light mode";
    } 
    else 
    {
        modeText.innerText = "Dark mode";
    }
});

