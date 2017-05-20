import './index';
const deviceWidth = window.innerWidth;

class Meme {
    constructor() {
      this.canvas = document.getElementById('imgCanvas');
      this.topTextInput = document.getElementById('topText');
      this.bottomTextInput = document.getElementById('bottomText');
      this.imageInput = document.getElementById('image');
      this.downloadButton = document.getElementById('downloadMeme');

      this.createCanvas();
      this.addEventListeners();
    }

    createCanvas() {
      let canvasHeight = Math.min(480, deviceWidth-30);
      let canvasWidth = Math.min(640, deviceWidth-30);

      this.canvas.height = canvasHeight;
      this.canvas.width = canvasWidth;
    }

    addEventListeners() {
      this.createMeme = this.createMeme.bind(this);
      this.downloadMeme = this.downloadMeme.bind(this);

      let inputNodes = [this.topTextInput, this.bottomTextInput, this.imageInput];
      inputNodes.forEach(element => element.addEventListener('keyup', this.createMeme));
      inputNodes.forEach(element => element.addEventListener('change', this.createMeme));
      this.downloadButton.addEventListener('click', this.downloadMeme)
    }

    downloadMeme() {
      let imageSource = this.canvas.toDataURL("image/png");
      let att = document.createAttribute('href');
      att.value = imageSource.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
      this.downloadButton.setAttributeNode(att);
    }

    resizeCanvas(canvasHeight, canvasWidth) {
      let height = canvasHeight;
      let width = canvasWidth;
      this.canvas.style.height = `${height}px`;
      this.canvas.style.width = `${width}px`;
      while(height > Math.min(1000, deviceWidth-30) && width > Math.min(1000, deviceWidth-30)) {
        height /= 2;
        width /= 2;
        this.canvas.style.height = `${height}px`;
        this.canvas.style.width = `${width}px`;
      }
    }

    createMeme() {
      let ctx = this.canvas.getContext('2d');

      if (this.imageInput.files && this.imageInput.files[0]) {
        let reader = new FileReader();
        let image = new Image();

        reader.onload = () => {
          image.onload = () => {

            this.canvas.height = image.height;
            this.canvas.width = image.width;
            ctx.clearRect(0, 0, this.canvas.height, this.canvasWidth);
            ctx.drawImage(image,0,0);

            let fontSize = ((this.canvas.width+this.canvas.height)/2)*4/100;
            ctx.lineWidth  = fontSize/5;
            ctx.font = `${fontSize}pt sans-serif`;
            ctx.strokeStyle = 'black';
            ctx.fillStyle = 'white';
            ctx.lineJoin = 'round';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';

            ctx.strokeText(this.topTextInput.value.toUpperCase(), this.canvas.width/2, this.canvas.height*(5/100));
            ctx.fillText(this.topTextInput.value.toUpperCase(), this.canvas.width/2, this.canvas.height*(5/100));

            ctx.strokeText(this.bottomTextInput.value.toUpperCase(), this.canvas.width/2, this.canvas.height*(90/100));
            ctx.fillText(this.bottomTextInput.value.toUpperCase(), this.canvas.width/2, this.canvas.height*(90/100));

            this.resizeCanvas(this.canvas.height, this.canvas.width);
          }
          image.src = reader.result;
        }

        reader.readAsDataURL(this.imageInput.files[0]);
      }
    }
}

export const meme = new Meme();
