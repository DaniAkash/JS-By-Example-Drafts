import "../../node_modules/bootstrap/less/bootstrap.less";
import '../css/styles.css';

import 'bootstrap';

class home {
    constructor() {
      this.canvas = document.getElementById('imgCanvas');

      this.createCanvas();
    }

    createCanvas() {
      let ctx = this.canvas.getContext('2d');

      let deviceWidth = window.innerWidth;
      let canvasWidth = Math.min(640, deviceWidth-30);
      let canvasHeight = Math.min(480, deviceWidth-30);

      document.getElementById('width').value = this.canvas.width = canvasWidth;
      document.getElementById('height').value = this.canvas.height = canvasHeight;
    }
}

new home();
