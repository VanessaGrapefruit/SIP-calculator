import Navigo from "navigo";
import { NumberOrder } from "../Models/NumberOrder";
import EventEmitter from "./EventEmmiter";

export enum EVENTS {
    OPEN_EXTERNAL_NUMBER = 'OPEN_EXTERNAL_NUMBER',
    ADD_NUMBER_TO_CART = 'ADD_NUMBER_TO_CART',
}

export default class Store {
    eventEmmiter: EventEmitter;
    router: Navigo;

    numberOrder: NumberOrder;

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
}