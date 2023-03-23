window.addEventListener("dragover",function(e){
    e.preventDefault();
  },false);
  window.addEventListener("drop",function(e){
    e.preventDefault();
  },false);
  

  document.getElementById("wrapper").ondragover = function(eventArgs) {
    var wrapper = document.getElementById("wrapper");
    if (!wrapper.classList.contains("dragover")) {
      wrapper.classList.add("dragover");
    }
  }
  
  document.getElementById("wrapper").ondragleave = function(eventArgs) {
    var wrapper = document.getElementById("wrapper");
    if (wrapper.classList.contains("dragover")) {
      wrapper.classList.remove("dragover");
    }
  }
  
  document.getElementById("wrapper").ondrop = function(eventArgs) {
    var dt = eventArgs.dataTransfer;
    if (dt.items.length == 1) {
      if (dt.items[0].kind == "file") {
        var img = new Image();
        img.onload = draw;
        img.onerror = failed;
        img.src = URL.createObjectURL(dt.items[0].getAsFile());
      }
    }
  }
  
  document.getElementById("upload").onchange = function (eventArgs) {
    var img = new Image();
    img.onload = draw;
    img.onerror = failed;
    img.src = URL.createObjectURL(this.files[0]);
  }

  function draw() {
    document.getElementById("wrapper").style.display = "none";
    document.getElementById("target").style.display = "block";
    var canvas = document.querySelector('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(this, 0,0);
  }

  function failed() {
    console.error("The provided file couldn't be loaded as an Image media");
  }


  