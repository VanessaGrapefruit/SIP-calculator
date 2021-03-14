import Navigo from "navigo";
import { path } from "../Models/Costants";
import { NumberOrder } from "../Models/NumberOrder";
import { PackageOrder } from "../Models/PackageOrder";
import EventEmitter from "./EventEmmiter";

export enum EVENTS {
    OPEN_EXTERNAL_NUMBER = 'OPEN_EXTERNAL_NUMBER',
    ADD_NUMBER_TO_CART = 'ADD_NUMBER_TO_CART',
    ADD_PACKAGE_TO_CART = 'ADD_PACKAGE_TO_CART',
    PBX_CHECKBOX_TOGGLED = 'PBX_CHECKBOX_TOGGLED',
    OPEN_SUMMARY_POPUP = 'OPEN_SUMMARY_POPUP',
    HIDE_POPUP = 'HIDE_POPUP'
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
        this.router.navigate(`${path.root}/number/${id}`);
    }

    hidePopup() {
        this.eventEmmiter.emit(EVENTS.HIDE_POPUP);
        this.router.navigate(path.root);
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
        this.eventEmmiter.emit(EVENTS.PBX_CHECKBOX_TOGGLED);
    }

    openSummaryPopup() {
        this.eventEmmiter.emit(EVENTS.OPEN_SUMMARY_POPUP);
    }
}