import { ExternalNumbersComponent } from './Components/ExternalNumbersComponent';
import { getExternalNumbers } from './Services/ExternalNumbersService';
import './Styles/index.scss';

const element = document.createElement("h1");
element.textContent = "SIP-Калькулятор";
document.body.appendChild(element);

const numbers = getExternalNumbers();
new ExternalNumbersComponent(numbers,document.body).render();