import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
const input = document.querySelector('input');
let delay;
input.addEventListener('input', (e) => {
    delay = e.currentTarget.value;
});
form.addEventListener('submit', (e) => {
    e.preventDefault();
    function promise(delay,state) {
       return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (state === 'fulfilled') {
                    resolve(delay)
                } else {
                    reject(delay)
                }
            }, delay);
        })
    }
    promise(delay, form.elements.state.value)
        .then(delay => {
    iziToast.show({
        message: `✅ Fulfilled promise in ${delay} ms`,
         messageColor: '#FFFFFF',
        backgroundColor: '#59A10D',
         position: 'topRight',
    })
}).catch(delay => {
   iziToast.show({
       message: `❌ Rejected promise in ${delay}ms`,
         messageColor: '#FFFFFF',
        backgroundColor: '#EF4040',
        position: 'topRight',
    })
})
form.reset();
})
