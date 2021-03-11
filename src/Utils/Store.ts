import Navigo from "navigo";
import { NumberOrder } from "../Models/NumberOrder";
import { PackageOrder } from "../Models/PackageOrder";
import EventEmitter from "./EventEmmiter";

export enum EVENTS {
    OPEN_EXTERNAL_NUMBER = 'OPEN_EXTERNAL_NUMBER',
    ADD_NUMBER_TO_CART = 'ADD_NUMBER_TO_CART',
    ADD_PACKAGE_TO_CART = 'ADD_PACKAGE_TO_CART',
    PBX_CHECKBOX_TOGGLED = 'PBX_CHECKBOX_TOGGLED',
}

export default class Store {
    eventEmmiter: EventEmitter;
    router: Navigo;

    numberOrder: NumberOrder;
    packageOrder: PackageOrder;

    constructor(router: Navigo) {
        this.eventEmmiter = new EventEmitter();
        this.router = router;
    }

    openExternalNumber(id: string) {
        this.router.navigate(`number/${id}`);
    }

    hidePopup() {
        this.router.navigate('/');
    }

    addNumberToCart(order: NumberOrder) {
        this.numberOrder = order;
        this.eventEmmiter.emit(EVENTS.ADD_NUMBER_TO_CART);
    }

    addPackageToCart(order: PackageOrder) {
        this.packageOrder = order;
        this.eventEmmiter.emit(EVENTS.ADD_PACKAGE_TO_CART);
    }

    tooglePBXCheckbox() {
        console.log('toggle from store');
        this.eventEmmiter.emit(EVENTS.PBX_CHECKBOX_TOGGLED);
    }
}