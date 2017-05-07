class Meme {
    constructor() {
      console.log('cool');
      this.canvas = document.getElementById('imgCanvas');
      this.topText = document.getElementById('topText');
      this.bottomText = document.getElementById('bottomText');
      this.image = document.getElementById('image');

      this.createCanvas();
      this.addEventListeners();
    }

    createCanvas() {
      let deviceWidth = window.innerWidth;
      let canvasHeight = Math.min(480, deviceWidth-30);
      let canvasWidth = Math.min(640, deviceWidth-30);

      this.canvas.height = canvasHeight;
      this.canvas.width = canvasWidth;

    }

    addEventListeners() {
      this.createMeme = this.createMeme.bind(this);
      let inputNodes = [this.topText, this.bottomText, this.image];
      inputNodes.forEach(element => element.addEventListener('keyup', this.createMeme));
      inputNodes.forEach(element => element.addEventListener('change', this.createMeme));
    }

    resizeCanvas(canvasHeight, canvasWidth) {
      let height = canvasHeight;
      let width = canvasWidth;
      this.canvas.style.height = `${height}px`;
      this.canvas.style.width = `${width}px`;
      while(height > 1000 || width > 1000) {
        height /= 2;
        width /= 2 ;
        this.canvas.style.height = `${height}px`;
        this.canvas.style.width = `${width}px`;
      }
    }

    createMeme() {
      let ctx = this.canvas.getContext('2d');

      if (this.image.files && this.image.files[0]) {
        let reader = new FileReader();
        let image = new Image();

        reader.onload = event => {
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

            ctx.strokeText(this.topText.value.toUpperCase(), this.canvas.width/2, this.canvas.height*(5/100));
            ctx.fillText(this.topText.value.toUpperCase(), this.canvas.width/2, this.canvas.height*(5/100));

            ctx.strokeText(this.bottomText.value.toUpperCase(), this.canvas.width/2, this.canvas.height*(90/100));
            ctx.fillText(this.bottomText.value.toUpperCase(), this.canvas.width/2, this.canvas.height*(90/100));

            this.resizeCanvas(this.canvas.height, this.canvas.width);
          }
          image.src = reader.result;
        }

        reader.readAsDataURL(this.image.files[0]);
      }
    }
}

export const meme = new Meme();
