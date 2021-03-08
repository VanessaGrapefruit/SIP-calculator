import './Styles/index.scss';
import Navigo from 'navigo';
import Store from './Utils/Store';
import { App } from './Components/App';


const router = new Navigo('/');
const store = new Store(router);

new App(document.body,store,router).render();