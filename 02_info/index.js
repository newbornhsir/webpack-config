import logo from './logo.svg';
import './index.css';
import './createImage';
const img = new Image();
img.src = logo;
document.body.appendChild(img);
console.log('i am index');
if (module.hot) {
  console.log('hot');
  console.log('yes');
}
(() => {
  console.log('arrow function')
})();