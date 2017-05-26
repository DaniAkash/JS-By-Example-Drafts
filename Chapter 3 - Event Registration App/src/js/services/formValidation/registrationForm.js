export default function validateRegistrationForm(form) {

  const result = {
    username: validateUserName(form.username),
    email: validateEmail(form.email),
    phone: validatePhone(form.phone),
    age: validateAge(form.age),
    profession: validateProfession(form.profession),
    experience: validateExperience(form.experience),
  };

  let each, isValid = true;
  for(each in result) {
    isValid = isValid && result[each];
  }

  return {
    isValid,
    result,
  };

}

function validateUserName(name) {
  return name.length > 3 ? true: false;
}

function validateEmail(email) {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone);
}

function validateAge(age) {
  return age >= 10 && age <= 25 ? true: false;
}

function validateProfession(value) {
  return value ? true : false;
}

function validateExperience(experience) {
  return experience > 0 && experience < 4 ? true : false;
}
