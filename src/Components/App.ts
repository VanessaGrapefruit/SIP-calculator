import Navigo from "navigo";
import { ExternalNumber } from "../Models/ExternalNumber";
import { getExternalNumbers } from "../Services/ExternalNumbersService";
import getPBXPackages from "../Services/PBXPackageService";
import renderElement from "../Utils/renderElement";
import Store, { EVENTS } from "../Utils/Store";
import { PBXPackagesComponent } from "./BPXPackagesComponent";
import { CartComponent } from "./CartComponent";
import { ExternalNumbersComponent } from "./ExternalNumbersComponent";
import { NumberPopupComponent } from "./NumbersPopupComponent";
import { PackagesTableComponent } from "./PackagesTableComponent";

export class App {
    parentElement: HTMLElement;
    store: Store;
    router: Navigo;
    numbers: ExternalNumber[];

    leftContainer: HTMLElement;
    rightContainer: HTMLElement;

    cart: CartComponent;

    constructor(parentElement: HTMLElement, store: Store, router: Navigo) {
        this.parentElement = parentElement;
        this.store = store;
        this.router = router;

        this.openExternalNumber = this.openExternalNumber.bind(this);
        this.addNumberToCart = this.addNumberToCart.bind(this);
    }

    render() {
        const container = renderElement(this.parentElement,'div',['left-container']);
        this.leftContainer = renderElement(container,'div',['wrapper']);
        this.rightContainer = renderElement(this.parentElement,'div',['right-container']);

        this.renderOffers();
        this.renderCart();

        this.initRoutes();

        this.store.eventEmmiter.addEvent(EVENTS.ADD_NUMBER_TO_CART,this.addNumberToCart);
    }

    renderOffers() {
        renderElement(this.leftContainer,'div',['header-title'],'SIP-Калькулятор');
        renderElement(this.leftContainer,'div',['numbers-subtitle'],'Внешние номера');

        this.numbers = getExternalNumbers();
        new ExternalNumbersComponent(this.numbers,this.leftContainer,this.store).render();

        const packageSet = getPBXPackages();
        new PBXPackagesComponent(packageSet,this.leftContainer,this.store).render();
    }

    renderCart() {
        this.cart = new CartComponent(this.rightContainer);
        this.cart.render();
    }

    initRoutes() {
        this.router.on('/',() => {});
        this.router.on('/number/:id',this.openExternalNumber);
        this.router.resolve();
    }

    openExternalNumber() {
        setTimeout(() => {
            const id = +window.location.pathname.split('/').pop();
            const number = this.numbers[id];
            new NumberPopupComponent(number, this.leftContainer, this.store).render();
        },0);
    }

    addNumberToCart() {
        const order = this.store.numberOrder;
        this.cart.addNumber(order);
    }
}