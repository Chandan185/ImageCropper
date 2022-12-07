//funtion to get frames
function getRoundedCanvas(sourceCanvas) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var width = sourceCanvas.width;
  var height = sourceCanvas.height;
  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = "destination-in";
  context.beginPath();
  context.arc(
    width / 2,
    height / 2,
    Math.min(width, height) / 2,
    0,
    2 * Math.PI,
    true
  );
  context.fill();
  return canvas;
}
function getroundedrect(sourceCanvas) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var width = sourceCanvas.width;
  var height = sourceCanvas.height;
  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = "destination-in";
  CanvasRenderingContext2D.prototype.roundRect = function (
    x,
    y,
    width,
    height,
    radius
  ) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    this.beginPath();
    this.moveTo(x + radius, y);
    this.arcTo(x + width, y, x + width, y + height, radius);
    this.arcTo(x + width, y + height, x, y + height, radius);
    this.arcTo(x, y + height, x, y, radius);
    this.arcTo(x, y, x + width, y, radius);
    this.closePath();
    return this;
  };

  var posX = canvas.width / 2 - 100;
  var posY = canvas.height / 2 - 100;

  context.roundRect(0, 0, 400, 400, 64);
  context.fill();
  return canvas;
}
function getheartshape(sourceCanvas) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var w = sourceCanvas.width;
  var h = sourceCanvas.height;
  canvas.width = w;
  canvas.height = h;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, w, h);
  context.globalCompositeOperation = "destination-in";
  var d = Math.min(w, h);
  var k = 0;
  context.moveTo(k, k + d / 4);
  context.quadraticCurveTo(k, k, k + d / 4, k);
  context.quadraticCurveTo(k + d / 2, k, k + d / 2, k + d / 4);
  context.quadraticCurveTo(k + d / 2, k, k + (d * 3) / 4, k);
  context.quadraticCurveTo(k + d, k, k + d, k + d / 4);
  context.quadraticCurveTo(k + d, k + d / 2, k + (d * 3) / 4, k + (d * 3) / 4);
  context.lineTo(k + d / 2, k + d);
  context.lineTo(k + d / 4, k + (d * 3) / 4);
  context.quadraticCurveTo(k, k + d / 2, k, k + d / 4);
  context.fill();
  return canvas;
}

//code
var imagebody = document.getElementById("upload-area");
var uploadbtn = document.getElementById("upload-btn");
var filebtn = document.getElementById("image-input");
var imgbody = document.getElementById("image-body");
var cropbtn = document.querySelector(".crop-btn");
var frame = document.querySelector(".frame-btn");
var frm = document.querySelector(".frame");
var link = document.querySelector(".lnk");
var rotate = document.querySelector(".rotate");
var croppable = false;
filebtn.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", function () {
    const uploaded_img = reader.result;
    if (uploaded_img) {
      imagebody.classList.add("hiddenclass");
      imgbody.style.borderStyle = "None";
      let img = document.createElement("img");
      img.id = "image";
      img.src = uploaded_img;
      imgbody.innerHTML = "";
      imgbody.appendChild(img);
      cropper = new Cropper(img, {
        aspectRatio: 1,
        viewMode: 1,
        ready: function () {
          croppable = true;
        },
      });
      cropbtn.classList.add("visibleclass");
      rotate.classList.add("visibleclass");
    }
  });
  reader.readAsDataURL(this.files[0]);
});
const fileinput = () => {
  filebtn.click();
};
const crop = (e) => {
  if (!croppable) {
    return;
  }
  var cropedImage = cropper
    .getCroppedCanvas({
      width: 400,
    })
    .toDataURL();
  let img = document.createElement("img");
  img.id = "previmg";
  img.src = cropedImage;
  document.getElementById("preview").innerHTML = "";
  document.getElementById("preview").appendChild(img);
};
cropbtn.addEventListener("click", () => {
  frame.classList.add("visible");
  link.classList.add("visible");
  frm.classList.add("visible");
});
const changeframe = (e) => {
  if (e == 1) {
    var cropedImage = cropper.getCroppedCanvas({
      width: 400,
    });
    document.getElementById("previmg").src = cropedImage.toDataURL();
  }
  if (e == 2) {
    var cropedImage = cropper.getCroppedCanvas({
      width: 400,
    });
    document.getElementById("previmg").src =
      getheartshape(cropedImage).toDataURL();
  }
  if (e == 3) {
    var cropedImage = cropper.getCroppedCanvas({
      width: 400,
    });
    document.getElementById("previmg").src =
      getroundedrect(cropedImage).toDataURL();
  }
  if (e === 4) {
    var cropedImage = cropper.getCroppedCanvas({
      width: 400,
    });
    document.getElementById("previmg").src =
      getRoundedCanvas(cropedImage).toDataURL();
  }
  document.getElementById("link").setAttribute("href", previmg.src);
};
function rotateimage() {
  cropper.rotate(90);
}
