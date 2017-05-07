class Meme {
    constructor() {
      console.log('cool');
      this.canvas = document.getElementById('imgCanvas');
      this.topText = document.getElementById('topText');
      this.bottomText = document.getElementById('bottomText');
      this.canvasHeight = document.getElementById('canvasHeight');
      this.canvasWidth = document.getElementById('canvasWidth');
      this.image = document.getElementById('image');

      this.createCanvas();
      this.addEventListeners();
    }

    createCanvas() {
      let deviceWidth = window.innerWidth;
      let canvasWidth = Math.min(640, deviceWidth-30);
      let canvasHeight = Math.min(480, deviceWidth-30);

      this.canvasWidth.value = this.canvas.width = canvasWidth;
      this.canvasHeight.value = this.canvas.height = canvasHeight;

      // let ctx = this.canvas.getContext('2d');
      // ctx.font = "30px Comic Sans MS";
      // ctx.fillStyle = "red";
      // ctx.textAlign = "center";
      // ctx.fillText("Hello World This is totally awesome isn't it!!!", this.canvas.width/2, this.canvas.height/1.1);
      // ctx.fillText("Hello World This is totally awesome isn't it!!!", this.canvas.width/2, this.canvas.height/5);
    }

    addEventListeners() {
      [this.topText, this.bottomText, this.canvasHeight, this.canvasWidth].forEach(element => element.addEventListener('keyup', this.createMeme));
      this.image.addEventListener('change', this.createMeme);
    }

    createMeme() {
      console.log('create');
    }
}

export const meme = new Meme();
