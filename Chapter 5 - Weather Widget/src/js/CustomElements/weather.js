import '../skycons';

export default class weather extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({mode: 'open'});
  }

  displayTime() {
    const date = new Date();
    const displayTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const $time = this._shadowRoot.querySelector('#time');
    $time.textContent = displayTime;
  }

  connectedCallback() {
    this._shadowRoot.innerHTML = `
      <style>
        .weather-container {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          background-color: silver;
          justify-content: space-between;
        }
        .title {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .details {
          flex: 2;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }
        .day-icon {
          flex: 1;
          max-height: 100%;
          max-width: 100%;
        }
        .text {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .text-content {
          margin: 0px;
        }
      </style>
      <div class="weather-container">
        <div class="title">
          <h2>Chennai, CH</h2>
        </div>
        <div class="details">
          <canvas id="dayIcon" class="day-icon"></canvas>
          <div class="text">
            <h2 class="text-content">32° C</h2>
            <p class="text-content" id="time">03:04 pm</p>
            <p class="text-content">Drizzle</p>
          </div>
        </div>
      </div>
    `;

    let skycons = new Skycons({"color": "black"});
    skycons.add(this._shadowRoot.querySelector('#dayIcon'), Skycons.RAIN);
    skycons.play();
    setInterval(this.displayTime.bind(this), 1000);
  }
}
