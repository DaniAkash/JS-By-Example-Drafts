import '../skycons';

export default class Cover extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this._shadowRoot.innerHTML = `
      <style>
        .cover {
          width: 90vw;
          background-color: skyblue;
          margin: 10px;
          border-radius: 15px;
          display: flex;
          height: 50vh;
        }
        .cover-image {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cover-icon {
          max-height: 40vh;
          max-width: 40vw;
        }
        .cover-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-around;
          margin: 2vw;
        }
        .title-area {
          width: 45vw;
        }
        .details-area {
          width: 45vw;
          text-align: right;
        }
        .cover-title {
          text-align: right;
        }
        @media only screen and (max-width: 736px) {
          .cover {
            height: 40vh;
          }
          .cover-details {
            padding-right: 2vw;
          }
          .cover-title {
            font-size: 8vw;
            text-align: right;
          }
          .details-area {
            font-size: 3vw;
            text-align: right;
          }
          .cover-temp {
            font-size: 8vw;
          }
        }
      </style>
      <div class="cover">
        <div class="cover-image">
          <canvas id="coverIcon" class="cover-icon"></canvas>
        </div>
        <div class="cover-details">
          <div class="title-area">
            <h1 class="cover-title">Sunny</h1>
          </div>
          <div class="details-area">
            <h1 class="cover-temp">25° C</h1>
            <p class="cover-location">Chennai</p>
            <p class="cover-summary">Drizzle starting this evening.</p>
            <p class="cover-time">Sunday, Jul 12.</p>
          </div>
        </div>
      </div>
    `;

    let skycons = new Skycons({"color": "black"});
    skycons.add(this._shadowRoot.getElementById("coverIcon"), Skycons.RAIN);
    skycons.play();
  }

}
