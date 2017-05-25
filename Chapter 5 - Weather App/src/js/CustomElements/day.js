import '../skycons';

export default class Day extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this._shadowRoot.innerHTML = `
      <style>
        .day {
          width: 22vw;
        }
        .day {
          display: flex;
          flex-direction: column;
          background-color: grey;
          border-radius: 5px;
          margin-bottom: 10px;
        }
        .day-icon {
          max-width: 20vw;
        }
        .day-image {
          flex: 1;
          align-self: center;
          padding: 2vh;
        }
        .day-details {
          flex: 2;
          text-align: center;
        }
        @media only screen and (min-width: 737px) {
          .day-location {
            display: none;
          }
          .day-summary {
            display: none;
          }
        }
        @media only screen and (max-width: 736px) {
          .day {
            flex-direction: row;
            width: 90vw;
            height: 42vh;
          }
          .day-icon {
            max-height: 40vh;
            max-width: 40vw;
          }
          .day-details {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: space-between;
            height: 30vh;
            text-align: right;
            font-size: 3vw;
            margin: 2vw;
            padding-right: 2vw;
          }
          .day-cover-title {
            font-size: 8vw;
          }
          .day-temp {
            font-size: 8vw;
          }
        }
      </style>
      <div class="day">
        <div class="day-image">
          <canvas id="dayIcon" class="day-icon"></canvas>
        </div>
        <div class="day-details">
          <div class="day-title-area">
            <h1 class="day-cover-title">Sunny</h1>
          </div>
          <div class="day-detail-area">
            <h1 class="day-temp">25° C</h1>
            <p class="day-location">Chennai</p>
            <p class="day-summary">Drizzle starting this evening.</p>
            <p class="day-time">Monday, Jul 13.</p>
          </div>
        </div>
      </div>
    `;

    let skycons = new Skycons({"color": "black"});
    skycons.add(this._shadowRoot.querySelector('#dayIcon'), Skycons.RAIN);
    skycons.play();
  }

}
