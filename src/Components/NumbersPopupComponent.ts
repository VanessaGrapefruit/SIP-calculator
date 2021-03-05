import { ExternalNumber } from "../Models/ExternalNumber";
import { getNumberDescription } from "../Utils/getNumberDescription";
import renderElement from "../Utils/renderElement";
import { PopupComponent } from "./PopupComponent";
import Navigo from 'navigo';

enum NumberCostOptions {
    number = 'number',
    trunk = 'trunk'
}

export class NumberPopupComponent extends PopupComponent {
    private number: ExternalNumber;

    constructor(number: ExternalNumber,parentElement: HTMLElement,router: Navigo) {
        super(parentElement,router);

        this.number = number;
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
        img.src = `../../public/images/${this.number.image}`;

        const content = renderElement(header,'div',['content']);
        renderElement(content,'div',['level'],`Уровень ${this.number.level}`);
        renderElement(content,'div',['name'],`${this.number.name} номер`);
    }

    renderDescription() {
        const description = renderElement(this.container,'div',['popup-description']);
        description.innerHTML = getNumberDescription(this.number);
    }

    renderNumberSelection() {
        this.renderSelection('Количество номеров',NumberCostOptions.number,4);
    }

    renderTrunkSelection() {
        this.renderSelection('Количество линий (Всего)',NumberCostOptions.trunk,16);
    }

    renderSelection(title: string,options: NumberCostOptions,value: number) {
        const container = renderElement(this.container,'div',['selector-container'])

        const content = renderElement(container,'div',['content']);
        renderElement(content,'div',['title'],title);

        const cost = renderElement(content,'div',['cost']);
        if (options === NumberCostOptions.number) {
            renderElement(cost,'div',[],`Установочная плата: ${this.number.numberFirstPay} BYN`);
            renderElement(cost,'div',[],`Абонентская плата: ${this.number.trunkMonthlyFee} BYN`);
        } else {
            renderElement(cost,'div',[],`Установочная плата: ${this.number.trunkFirstPay} BYN`);
            renderElement(cost,'div',[],`Абонентская плата: ${this.number.trunkMonthlyFee} BYN`);
        }

        this.renderInput(container,value);
    }

    renderInput(parent: HTMLElement,value: number) {
        const input = renderElement(parent,'input',[]) as HTMLInputElement;
        input.type = 'number';
        input.value = value.toString();
    }

    renderDividingLine() {
        renderElement(this.container,'div',['dividing-line']);
    }

    renderButtons() {
        const container = renderElement(this.container,'div',['btns-container']);

        const cancel = renderElement(container,'div',['btn','btn-cancel'],'Отменить');
        cancel.addEventListener('click',this.dispose);
        
        const add = renderElement(container,'div',['btn','btn-add'],'Добавить');
    }
}