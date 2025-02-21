import Navigo from "navigo";
import { path } from "../Models/Costants";
import { ExternalNumber } from "../Models/ExternalNumber";
import { PackageSet } from "../Models/PBXPackage";
import { CalculationService } from "../Services/CalculationService";
import { ExternalNumbersService } from "../Services/ExternalNumbersService";
import { PBXPackageService } from "../Services/PBXPackageService";
import renderElement from "../Utils/renderElement";
import Store, { EVENTS } from "../Utils/Store";
import { PBXPackagesComponent } from "./BPXPackagesComponent";
import { CalculationComponent } from "./CalculationComponent";
import { CartComponent } from "./CartComponent";
import { ErrorComponent } from "./ErrorComponent";
import { ExternalNumbersComponent } from "./ExternalNumbersComponent";
import { NumberPopupComponent } from "./NumbersPopupComponent";
import { PopupComponent } from "./PopupComponent";

export class App {
    parentElement: HTMLElement;
    store: Store;
    router: Navigo;
    numbers: ExternalNumber[];
    packageSet: PackageSet;

    leftContainer: HTMLElement;
    rightContainer: HTMLElement;

    cart: CartComponent;
    popup: PopupComponent;
    calculator: CalculationService;

    constructor(parentElement: HTMLElement, store: Store, router: Navigo) {
        this.parentElement = parentElement;
        this.store = store;
        this.router = router;

        this.openExternalNumber = this.openExternalNumber.bind(this);
        this.openSummaryPopup = this.openSummaryPopup.bind(this);
        this.addNumberToCart = this.addNumberToCart.bind(this);
        this.addPackageToCart = this.addPackageToCart.bind(this);
        this.downloadSummary = this.downloadSummary.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
    }

    render() {
        const container = renderElement(this.parentElement,'div',['left-container']);
        this.leftContainer = renderElement(container,'div',['wrapper']);
        this.rightContainer = renderElement(this.parentElement,'div',['right-container']);

        this.renderOffers();
        this.renderCart();

        //this.initRoutes();

        this.store.eventEmmiter.addEvent(EVENTS.OPEN_EXTERNAL_NUMBER,this.openExternalNumber);
        this.store.eventEmmiter.addEvent(EVENTS.ADD_NUMBER_TO_CART,this.addNumberToCart);
        this.store.eventEmmiter.addEvent(EVENTS.ADD_PACKAGE_TO_CART,this.addPackageToCart);
        this.store.eventEmmiter.addEvent(EVENTS.OPEN_SUMMARY_POPUP,this.openSummaryPopup);
        this.store.eventEmmiter.addEvent(EVENTS.DOWNLOAD_SUMMARY,this.downloadSummary);
        this.store.eventEmmiter.addEvent(EVENTS.HIDE_POPUP,this.hidePopup);
    }

    async renderOffers() {
        renderElement(this.leftContainer,'div',['header-title'],'SIP-Калькулятор');
        renderElement(this.leftContainer,'div',['numbers-subtitle'],'Внешние номера');

        await this.renderExternalNumbers();
        await this.renderPBXPackages();

        const logo = renderElement(this.leftContainer,'img',['logo']) as HTMLImageElement;
        logo.src = `${path.public}/images/logo.svg`;
    }

    async renderExternalNumbers() {
        try {
            this.numbers = await ExternalNumbersService.getInstance().getExternalNumbers();
            new ExternalNumbersComponent(this.numbers,this.leftContainer,this.store).render();
        } catch (err) {
            new ErrorComponent(err).render();
        }
    }

    async renderPBXPackages() {
        try {
            this.packageSet = await PBXPackageService.getInstance().getPBXPackages();
            new PBXPackagesComponent(this.packageSet,this.leftContainer,this.store).render();
        } catch (err) {
            new ErrorComponent(err).render();
        }
    }

    renderCart() {
        this.calculator = CalculationService.getInstance();
        this.cart = new CartComponent(this.rightContainer,this.store,this.calculator);
        this.cart.render();
    }

    initRoutes() {
        this.router.on(`${path.root}/`,() => {});
        this.router.on(`${path.root}/number/:id`,this.openExternalNumber);
        this.router.resolve();
    }

    openExternalNumber() {
        setTimeout(() => {
            const id = this.store.externalNumberId;
            const number = this.numbers.find((num) => num.id === id);
            this.popup = new NumberPopupComponent(number, this.leftContainer, this.store);
            this.popup.render();
        },0);
    }

    addNumberToCart() {
        const order = this.store.numberOrder;
        this.cart.addNumber(order);
    }

    addPackageToCart() {
        const order = this.store.packageOrder;
        this.cart.addPackage(order);
    }

    openSummaryPopup() {
        console.log(this.popup,this.calculator.isEmptyOrder());
        if (this.popup || this.calculator.isEmptyOrder()) return;

        this.popup = new CalculationComponent(this.leftContainer,this.store,this.calculator);
        this.popup.render();
    }

    async downloadSummary() {
        if (!(this.popup instanceof CalculationComponent)) return;
        window.print();
    }

    hidePopup() {
        this.popup = undefined;
    }
}