export default class ImageCard extends HTMLElement {

  static get observedAttributes() {
    return [
      'data-name',
      'data-img',
      'data-url',
    ];
  }

  constructor() {
    super();

    this.shadowDOM = this.attachShadow({mode: 'open'});
    this.shadowDOM.innerHTML = `
      <img src="default.png" alt="This is just and image" width="150" height="150" class="product-img">
      <a href="#" class="product-name">Default Text</a>
    `;
  }

  connectedCallback() {
    console.log('connected');
  }

}
