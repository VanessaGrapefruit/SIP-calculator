import './Styles/index.scss';
import Navigo from 'navigo';
import Store from './Utils/Store';
import { App } from './Components/App';
import { path } from './Models/Costants';

const router = new Navigo(null);
const store = new Store(router);

new App(document.body,store,router).render();