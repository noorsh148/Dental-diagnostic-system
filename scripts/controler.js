var body = document.querySelector('body');
var sidebar = body.querySelector('nav');
var toggle = body.querySelector(".toggle");
var searchBtn = body.querySelector(".search-box");
var modeSwitch = body.querySelector(".toggle-switch");
var modeText = body.querySelector(".mode-text");
var detection = body.querySelector(".detection");
var canvas = document.querySelector('canvas');
var predictions;


toggle.addEventListener("click", () =>
{
	sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click", () =>
{
	sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click", () =>
{
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


detection.addEventListener("click", () =>
{
	console.log("detect...");
	var image = canvas.toDataURL("image/jpeg", 1.0);
	axios(
		{
			method: "POST",
			url: "https://detect.roboflow.com/teeth-detection-and-numbering-agi2i/10",
			params:
			{
				api_key: "NvTvcum4o3Uys68hJOQu"
			},
			data: image,
			headers:
			{
				"Content-Type": "application/x-www-form-urlencoded"
			}
		})
		.then(function(response)
		{
			predictions = response.data['predictions'];
			animate();
		})
		.catch(function(error)
		{
			console.log(error.message);
		});
})


function animate()
{
	requestAnimationFrame(animate);

	predictions.forEach(boundingBox =>
	{
		centerX = boundingBox['x']
		centerY = boundingBox['y']

		x = centerX - boundingBox['width'] / 2
		y = centerY - boundingBox['height'] / 2

		width = boundingBox['width']
		height = boundingBox['height']

		confidence = boundingBox['confidence']
		classType = boundingBox['class'];

		var dis = Math.sqrt(Math.pow(mouse.x - centerX, 2) + Math.pow(mouse.y - centerY, 2))


		if (dis <= 50)
		{
			c.beginPath();
			c.lineWidth = "1";
			c.strokeStyle = "rgba(255,0,0,0.1)";
			c.rect(x, y, width, height);
			c.stroke();
		}
		else
		{
			c.beginPath();
			c.lineWidth = "1";
			c.strokeStyle = "rgba(0,255,0,0.1)";
			c.rect(x, y, width, height);
			c.stroke();
		}

		c.font = "10px Arial ";
		c.fillText(classType, centerX, centerY);
	});
}


var mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('mousemove',
	function(event)
	{
		var canvasPos = canvas.getBoundingClientRect();
		mouse.x = Math.round(event.clientX - canvasPos.left);
		mouse.y = Math.round(event.clientY - canvasPos.top);
	})