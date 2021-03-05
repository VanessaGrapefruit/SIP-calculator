import { ExternalNumbersComponent } from './Components/ExternalNumbersComponent';
import { getExternalNumbers } from './Services/ExternalNumbersService';
import './Styles/index.scss';
import renderElement from './Utils/renderElement';
import Navigo from 'navigo';
import { NumberPopupComponent } from './Components/NumbersPopupComponent';

const leftContainer = renderElement(document.body,'div',['left-container']);
const rightContainer = renderElement(document.body,'div',['right-container']);

const router = new Navigo('/');

const element = document.createElement("h1");
element.textContent = "SIP-Калькулятор";
leftContainer.appendChild(element);

const numbers = getExternalNumbers();
new ExternalNumbersComponent(numbers,leftContainer,router).render();

router.on('/number/:id',function() {
    const id = +window.location.pathname.split('/').pop();
    const number = numbers[id];
    new NumberPopupComponent(number ,leftContainer,router).render();
});
router.resolve();