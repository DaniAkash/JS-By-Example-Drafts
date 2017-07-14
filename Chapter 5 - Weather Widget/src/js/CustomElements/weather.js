import '../skycons';
import apiCall from './apiCall';

export default class weather extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({mode: 'open'});
    this.latitude = this.getAttribute('lat');
    this.longitude = this.getAttribute('long');
  }

  static get observedAttributes() {return ['lat', 'long']; }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'lat') {
      this.latitude = newValue;
    }
    if(attr === 'long') {
      this.longitude = newValue;
    }
    if(this.latitude && this.longitude) {
      apiCall(`getWeather/${this.latitude},${this.longitude}`, {}, 'GET')
        .then(response => {

          this.$city.textContent = response.city;
          this.$temperature.textContent = response.currently.temperature;
          this.$summary.textContent = response.currently.summary;

          let skycons = new Skycons({"color": "black"});
          skycons.add(this.$icon, Skycons[response.currently.icon.toUpperCase().replace('-','_')]);
          skycons.play();
        })
        .catch(() => {
        });
    }
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
          <h2 id="city">Loading...</h2>
        </div>
        <div class="details">
          <canvas id="dayIcon" class="day-icon"></canvas>
          <div class="text">
            <h2 class="text-content" id="temperature">--</h2>
            <p class="text-content" id="time">--</p>
            <p class="text-content" id="summary">--</p>
          </div>
        </div>
      </div>
    `;

    this.$icon = this._shadowRoot.querySelector('#dayIcon');
    this.$city = this._shadowRoot.querySelector('#city');
    this.$temperature = this._shadowRoot.querySelector('#temperature');
    this.$summary = this._shadowRoot.querySelector('#summary');

    setInterval(this.displayTime.bind(this), 1000);

    if(this.latitude && this.longitude) {
      apiCall(`getWeather/${this.latitude},${this.longitude}`, {}, 'GET')
        .then(response => {

          this.$city.textContent = response.city;
          this.$temperature.textContent = response.currently.temperature;
          this.$summary.textContent = response.currently.summary;

          let skycons = new Skycons({"color": "black"});
          skycons.add(this.$icon, Skycons[response.currently.icon.toUpperCase().replace('-','_')]);
          skycons.play();
        })
        .catch(() => {
        });
    }
  }
}
