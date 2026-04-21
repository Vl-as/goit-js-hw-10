import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handlerSubmit);

function handlerSubmit(e) {
  e.preventDefault();
  const delay = +form.elements.delay.value;
  if (delay < 0) return;
  const state = form.elements.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(mes => {
      iziToast.success({
        message: mes,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.error({
        message: error,
        position: 'topRight',
      });
    });
  form.reset();
}
