import { ExternalNumber } from "../Models/ExternalNumber";
import { getNumberDescription } from "../Utils/getNumberDescription";
import renderElement from "../Utils/renderElement";
import { PopupComponent } from "./PopupComponent";
import Store from "../Utils/Store";
import { NumberOrder } from "../Models/NumberOrder";
import { path } from "../Models/Costants";

enum NumberCostOptions {
    number = 'number',
    trunk = 'trunk'
}

export class NumberPopupComponent extends PopupComponent {
    private number: ExternalNumber;

    private numbersInput: HTMLInputElement;
    private trunksInput: HTMLInputElement;

    constructor(number: ExternalNumber,parentElement: HTMLElement,store: Store) {
        super(parentElement,store);

        this.number = number;
        this.addToCart = this.addToCart.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    render() {
        super.render();
        super.addContainerStyle('number-popup');

        this.renderHeader();
        this.renderDescription();

        this.renderDividingLine();
        this.renderNumberSelection();
        this.renderDividingLine();
        this.renderTrunkSelection();
        this.renderDividingLine();

        this.renderButtons();
    }

    renderHeader() {
        const header = renderElement(this.container,'div',['header']);

        const img = renderElement(header,'img',[]) as HTMLImageElement;
        img.src = `../${path.public}/images/${this.number.image}`;

        const content = renderElement(header,'div',['content']);
        renderElement(content,'div',['level'],`Уровень ${this.number.level}`);
        renderElement(content,'div',['name'],`${this.number.name} номер`);
    }

    renderDescription() {
        const description = renderElement(this.container,'div',['popup-description']);
        description.innerHTML = getNumberDescription(this.number);
    }

    renderNumberSelection() {
        this.numbersInput = this.renderSelection('Количество номеров',NumberCostOptions.number,4);
    }

    renderTrunkSelection() {
        this.trunksInput = this.renderSelection('Количество линий (Всего)',NumberCostOptions.trunk,16);
    }

    renderSelection(title: string,options: NumberCostOptions,value: number) {
        const container = renderElement(this.container,'div',['selector-container'])

        const content = renderElement(container,'div',['content']);
        renderElement(content,'div',['title'],title);

        const cost = renderElement(content,'div',['cost']);
        if (options === NumberCostOptions.number) {
            renderElement(cost,'div',[],`Установочная плата: ${this.number.numberFirstPay} BYN`);
            renderElement(cost,'div',[],`Абонентская плата: ${this.number.numberMonthlyFee} BYN`);
        } else {
            renderElement(cost,'div',[],`Установочная плата: ${this.number.trunkFirstPay} BYN`);
            renderElement(cost,'div',[],`Абонентская плата: ${this.number.trunkMonthlyFee} BYN`);
        }

        return this.renderInput(container,value);
    }

    renderInput(parent: HTMLElement,value: number) {
        const input = renderElement(parent,'input',[]) as HTMLInputElement;
        input.type = 'number';
        input.min = '1';
        input.value = value.toString();
        return input;
    }

    renderDividingLine() {
        renderElement(this.container,'div',['dividing-line']);
    }

    renderButtons() {
        const container = renderElement(this.container,'div',['btns-container']);

        const cancel = renderElement(container,'div',['btn','btn-cancel'],'Отменить');
        cancel.addEventListener('click',this.dispose);
        
        const add = renderElement(container,'div',['btn','btn-add'],'Добавить');
        add.addEventListener('click',this.addToCart);
    }

    addToCart() {
        this.validateInput(this.numbersInput);
        this.validateInput(this.trunksInput);

        const order : NumberOrder = {
            number: this.number,
            numsCount: +this.numbersInput.value,
            trunksCount: +this.trunksInput.value,
        }
        this.store.addNumberToCart(order);
        this.dispose();
    }

    validateInput(input: HTMLInputElement) {
        const value = +input.value;
        if (value < 1) input.value = '1';
    }
}