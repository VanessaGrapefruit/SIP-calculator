import { ExternalNumbersComponent } from './Components/ExternalNumbersComponent';
import { getExternalNumbers } from './Services/ExternalNumbersService';
import './Styles/index.scss';
import renderElement from './Utils/renderElement';

const leftContainer = renderElement(document.body,'div',['left-container']);
const rightContainer = renderElement(document.body,'div',['right-container']);

const element = document.createElement("h1");
element.textContent = "SIP-Калькулятор";
leftContainer.appendChild(element);

const numbers = getExternalNumbers();
new ExternalNumbersComponent(numbers,leftContainer).render();