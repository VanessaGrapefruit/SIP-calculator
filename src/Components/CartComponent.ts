import { ExternalNumber } from "../Models/ExternalNumber";
import { NumberOrder } from "../Models/NumberOrder";
import renderElement from "../Utils/renderElement";

export class CartComponent {
    parentElement: HTMLElement;
    container: HTMLElement;
    numberContainer: HTMLElement;
    packageContainer: HTMLElement;

    constructor(parentElement: HTMLElement) {
        this.parentElement = parentElement;

        this.removeNumber = this.removeNumber.bind(this);
    }

    render() {
        this.container = renderElement(this.parentElement,'div',['cart-container']);

        this.renderHeader();
        this.renderNumberContainer();
        this.renderPackageContainer();

        this.renderFistPay();
        this.renderMonthlyFee();
    }

    renderHeader() {
        const header = renderElement(this.container,'div',['header']);
        header.textContent = 'Расчет стоимости оказания услуг по SIP-телефонии';
    }

    renderNumberContainer() {
        this.numberContainer = renderElement(this.container,'div',['numbers-container']);
    }

    renderPackageContainer() {
        this.packageContainer = renderElement(this.container,'div',['package-container']);
        renderElement(this.packageContainer,'div',['title'],'BASIC');
        renderElement(this.packageContainer,'div',['content'],
            'Стандартный пакет. включенный в каждый тарифный план SIP');
    }

    renderFistPay() {
        this.renderPayContainer('Установочная плата',
            'Единоразовый платеж при подключении','0.00');
    }

    renderMonthlyFee() {
        this.renderPayContainer('Ежемесячная абонентская плата', 
            'Ежемесячная плата за использование SIP-телефонии','0.00');
    }

    renderPayContainer(title: string, desc: string, value: string) {
        const container = renderElement(this.container,'div',['pay-container']);

        const content = renderElement(container,'div',['content']);
        renderElement(content,'div',['title'],title);
        renderElement(content,'div',['desc'],desc);

        renderElement(container,'div',['value'],value);
    }

    addNumber(order: NumberOrder) {
        const element = renderElement(this.numberContainer,'div',['number']);
        const div = renderElement(element,'div',['container']);

        const imageDiv = renderElement(div,'div',['image']);
        const img = renderElement(imageDiv,'img',[]) as HTMLImageElement;
        img.src = `../../public/images/${order.number.image}`;

        const content = renderElement(div,'div',['content']);
        renderElement(content,'div',['name'],`${order.number.name} номер`);
        renderElement(content,'div',['count'],`Количество номеров: ${order.numsCount}`);
        renderElement(content,'div',['count'],`Количество линий: ${order.trunksCount}`);

        const buttons = renderElement(element,'div',['btns-container']);
        const editBtn = renderElement(buttons,'div',['btn']);
        const deleteBtn = renderElement(buttons,'div',['btn']);

        const editIcon = renderElement(editBtn,'img',['icon']) as HTMLImageElement;
        const deleteIcon = renderElement(deleteBtn,'img',['icon']) as HTMLImageElement;

        deleteBtn.addEventListener('click',this.removeNumber);

        editIcon.src = '../../public/images/edit.svg';
        deleteIcon.src = '../../public/images/delete.svg';
    }

    removeNumber(e: MouseEvent) {
        const target = e.target as HTMLElement;
        const element = target.closest('.number') as HTMLElement;
        this.numberContainer.removeChild(element);
    }
}