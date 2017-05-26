import './general';
import validateRegistrationForm from './services/formValidation/registrationForm';
import registrationApi from './services/apiCalls/registration';

class Home {

  constructor() {
    this.$form = document.querySelector('#registrationForm');
    this.$username = document.querySelector('#username');
    this.$email = document.querySelector('#email');
    this.$phone = document.querySelector('#phone');
    this.$age = document.querySelector('#age');
    this.$profession = document.querySelector('#profession');
    this.$experience = document.querySelector('#experience');
    this.$comment = document.querySelector('#comment');
    this.$submit = document.querySelector('#submit');
    this.$loadingIndicator = document.querySelector('#loadingIndicator');

    this.$form.addEventListener('submit', (event) => {
      this.onFormSubmit(event);
    });
  }

  getValues() {
    return {
      username: this.$username.value,
      email: this.$email.value,
      phone: this.$phone.value,
      age: this.$age.value,
      profession: this.$profession.value,
      experience: this.$experience.value,
      comment: this.$comment.value,
    };
  }

  onFormSubmit() {
    event.preventDefault();

    const formValues = this.getValues();
    const formStatus = validateRegistrationForm(formValues);

    this.submitForm(formValues);
    // if(formStatus.isValid) {
    //   this.clearErrors();
    // } else {
    //   this.clearErrors();
    //   this.highlightErrors(formStatus.result);
    // }
  }

  submitForm(formValues) {
    // this.$submit.classList.add('hidden');
    // this.$loadingIndicator.classList.remove('hidden');
    registrationApi(formValues)
    .then((result) => {
      // this.$submit.classList.remove('hidden');
      // this.$loadingIndicator.classList.add('hidden');
      console.log(result);
    })
    .catch(() => {
      // this.$submit.classList.remove('hidden');
      // this.$loadingIndicator.classList.add('hidden');
      alert('Error');
    });
  }

  highlightErrors(result) {
    if(!result.username) {
      this.$username.parentElement.classList.add('has-error');
    }
    if(!result.phone) {
      this.$phone.parentElement.classList.add('has-error');
    }
    if(!result.email) {
      this.$email.parentElement.classList.add('has-error');
    }
    if(!result.age) {
      this.$age.parentElement.classList.add('has-error');
    }
    if(!result.profession) {
      this.$profession.parentElement.classList.add('has-error');
    }
    if(!result.experience) {
      this.$experience.parentElement.classList.add('has-error');
    }
  }

  clearErrors() {
      this.$username.parentElement.classList.remove('has-error');
      this.$phone.parentElement.classList.remove('has-error');
      this.$email.parentElement.classList.remove('has-error');
      this.$age.parentElement.classList.remove('has-error');
      this.$profession.parentElement.classList.remove('has-error');
      this.$experience.parentElement.classList.remove('has-error');
  }

}

window.addEventListener("load", () => {
  new Home();
});
