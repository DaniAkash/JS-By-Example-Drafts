export default function registrationApi(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(), 3000);
  });
}
