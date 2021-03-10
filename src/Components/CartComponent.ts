import { ExternalNumber } from "../Models/ExternalNumber";
import { NumberOrder } from "../Models/NumberOrder";
import { PackageOrder } from "../Models/PackageOrder";
import renderElement from "../Utils/renderElement";
import Store, { EVENTS } from "../Utils/Store";

export class CartComponent {
    parentElement: HTMLElement;
    container: HTMLElement;
    numberContainer: HTMLElement;
    packageContainer: HTMLElement;

    store: Store;

    constructor(parentElement: HTMLElement, store: Store) {
        this.parentElement = parentElement;
        this.store = store;

        this.removeNumber = this.removeNumber.bind(this);
        this.removePackage = this.removePackage.bind(this);
        this.togglePackageContainer = this.togglePackageContainer.bind(this);
    }

    render() {
        this.container = renderElement(this.parentElement,'div',['cart-container']);

        this.renderHeader();
        this.renderNumberContainer();
        this.renderPackageContainer();

        this.renderFistPay();
        this.renderMonthlyFee();

        this.store.eventEmmiter.addEvent(EVENTS.PBX_CHECKBOX_TOGGLED,this.togglePackageContainer);
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

    addPackage(order: PackageOrder) {
        this.packageContainer.innerHTML = '';
        const pack = order.package;

        const topContainer = renderElement(this.packageContainer,'div',['container']);
        const botContainer = renderElement(this.packageContainer,'div',['container']);

        renderElement(topContainer,'div',['title'],pack.name);
        renderElement(botContainer,'div',['description'],pack.description);

        if(pack.isDefault) return;
        renderElement(topContainer,'div',['employees'],`Сотрудников: ${order.employees}`);

        const deleteBtn = renderElement(botContainer,'div',['btn']);
        const icon = renderElement(deleteBtn,'img',[]) as HTMLImageElement;
        icon.src = '../../public/images/delete.svg';
        deleteBtn.addEventListener('click',this.removePackage);
    }

    removePackage(e: MouseEvent) {
        this.packageContainer.innerHTML = '';
        this.store.removePackageFromCart();
    }

    togglePackageContainer() {
        this.packageContainer.classList.toggle('disabled');
    }
}