/**
* When files are dropped onto it the default action of all modern browsers, 
* is to try and open them. 
* Thus the first thing we need to do is surpressing that default action.
*
* Note that both of these listeners are needed.
* Attaching a listener to the drop event only is not sufficient for most browsers.
*/
window.addEventListener("dragover",function(e){
    e.preventDefault();
  },false);
  window.addEventListener("drop",function(e){
    e.preventDefault();
  },false);
  
  /**
  * @function
  * EventHandler. Gives a visual indication a dropzone was entered.
  * Note that this is called every ~350ms as long as the drag continues.
  *
  * This function could also be attached to the ondragenter event in order to be more resourceful.
  * However the results may appear a little more sluggish.
  */
  document.getElementById("wrapper").ondragover = function(eventArgs) {
    var wrapper = document.getElementById("wrapper");
    if (!wrapper.classList.contains("dragover")) {
      wrapper.classList.add("dragover");
    }
  }
  
  /**
  * @function
  * EventHandler. Removes the visual indicator for being in a dropzone.
  */
  document.getElementById("wrapper").ondragleave = function(eventArgs) {
    var wrapper = document.getElementById("wrapper");
    if (wrapper.classList.contains("dragover")) {
      wrapper.classList.remove("dragover");
    }
  }
  
  /**
  * @function
  * EventHandler. Pushes the dropped file into a reader.
  *
  * Note that older browsers may not know the dataTransfer property.
  * If dataTransfer is undefined the browser used is not capable of drag and drop file transmission.
  */
  document.getElementById("wrapper").ondrop = function(eventArgs) {
    var dt = eventArgs.dataTransfer;
    if (dt.items.length == 1) {
      if (dt.items[0].kind == "file") {
        var reader = new FileReader();
        reader.onload = readFile;
        reader.readAsDataURL(dt.items[0].getAsFile());
      }
    }
  }
  
  /**
  * @function
  * EventHandler. Pushes the attached file into a reader.
  */
  document.getElementById("upload").onchange = function (eventArgs) {
    input = document.getElementById("upload");
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = readFile;
      reader.readAsDataURL(input.files[0]);
    }
  }
  
  /**
  * @function
  * EventHandler. Called when a reader finishes reading a file.
  * Sets the read file as background image.
  */
  function readFile(e) {
    var wrapper = document.getElementById("wrapper");
    wrapper.style.display = "none";
    document.getElementById("target").style.backgroundImage = "url(" + e.target.result + ")";
  }