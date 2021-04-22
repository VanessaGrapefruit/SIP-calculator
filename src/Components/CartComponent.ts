import { path } from "../Models/Costants";
import { NumberOrder } from "../Models/NumberOrder";
import { PackageOrder } from "../Models/PackageOrder";
import { CalculationService } from "../Services/CalculationService";
import renderElement from "../Utils/renderElement";
import Store, { EVENTS } from "../Utils/Store";

export class CartComponent {
    parentElement: HTMLElement;
    container: HTMLElement;
    numberContainer: HTMLElement;
    packageContainer: HTMLElement;

    firstPayElement: HTMLElement;
    monthlyFeeElement: HTMLElement;

    store: Store;
    calculator: CalculationService;

    constructor(parentElement: HTMLElement, store: Store, calculator: CalculationService) {
        this.parentElement = parentElement;
        this.store = store;
        this.calculator = calculator;

        this.openSummaryPopup = this.openSummaryPopup.bind(this);
        this.printSummary = this.printSummary.bind(this);
        this.editNumber = this.editNumber.bind(this);
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

        this.renderButtons();

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
        this.firstPayElement = this.renderPayContainer('Установочная плата',
            'Единоразовый платеж при подключении','0.00');
    }

    renderMonthlyFee() {
        this.monthlyFeeElement = this.renderPayContainer('Ежемесячная абонентская плата', 
            'Ежемесячная плата за использование SIP-телефонии','0.00');
    }

    renderPayContainer(title: string, desc: string, value: string) {
        const container = renderElement(this.container,'div',['pay-container']);

        const content = renderElement(container,'div',['content']);
        renderElement(content,'div',['title'],title);
        renderElement(content,'div',['desc'],desc);

        return renderElement(container,'div',['value'],value);
    }

    renderButtons() {
        const container = renderElement(this.container,'div',['btns-container__summary']);

        const sendBtn = renderElement(container,'div',['btn','send'],'Скачать PDF');
        const summaryBtn = renderElement(container,'div',['btn','summary'],'Показать расчет');

        sendBtn.addEventListener('click',this.printSummary);
        summaryBtn.addEventListener('click',this.openSummaryPopup);
    }

    openSummaryPopup() {
        this.store.openSummaryPopup();
    }

    printSummary() {
        this.store.printSummary();
    }

    addNumber(order: NumberOrder) {
        if (this.calculator.validateNumberAndChange(order)) {
            this.renderNumber(order);
            this.calculator.addNumber(order);
            this.updatePrices();
        } else {
            const number = this.numberContainer.querySelector(`[data-id="${order.number.id}"]`);
            (number.querySelector('.nums-count') as HTMLElement).textContent = `Количество номеров: ${order.numsCount}`;
            (number.querySelector('.trunks-count') as HTMLElement).textContent = `Количество линий: ${order.trunksCount}`;
            this.updatePrices();
        }
    }

    renderNumber(order: NumberOrder) {
        const element = renderElement(this.numberContainer,'div',['number']);
        element.dataset.id = order.number.id.toString();
        const div = renderElement(element,'div',['container']);

        const imageDiv = renderElement(div,'div',['image']);
        const img = renderElement(imageDiv,'img',[]) as HTMLImageElement;
        img.src = `${path.root}/${path.public}/images/${order.number.image}`;

        const content = renderElement(div,'div',['content']);
        renderElement(content,'div',['name'],`${order.number.name} номер`);
        renderElement(content,'div',['count','nums-count'],`Количество номеров: ${order.numsCount}`);
        renderElement(content,'div',['count','trunks-count'],`Количество линий: ${order.trunksCount}`);

        const buttons = renderElement(element,'div',['btns-container']);
        const editBtn = renderElement(buttons,'div',['btn']);
        const deleteBtn = renderElement(buttons,'div',['btn']);

        const editIcon = renderElement(editBtn,'img',['icon']) as HTMLImageElement;
        const deleteIcon = renderElement(deleteBtn,'img',['icon']) as HTMLImageElement;

        editBtn.addEventListener('click',this.editNumber);
        deleteBtn.addEventListener('click',this.removeNumber);

        editIcon.src = `${path.root}/${path.public}/images/edit.svg`;
        deleteIcon.src = `${path.root}/${path.public}/images/delete.svg`;
    }

    editNumber(e: MouseEvent) {
        const target = e.target as HTMLElement;
        const element = target.closest('.number') as HTMLElement;
        const id = element.dataset.id;
        this.store.openExternalNumber(id);
    }

    removeNumber(e: MouseEvent) {
        const target = e.target as HTMLElement;
        const element = target.closest('.number') as HTMLElement;
        const index = [].indexOf.call(this.numberContainer.children,element);
        this.calculator.removeNumber(index);
        this.updatePrices();
        this.numberContainer.removeChild(element);
    }

    addPackage(order: PackageOrder) {
        this.packageContainer.innerHTML = '';
        const pack = order.package;

        const topContainer = renderElement(this.packageContainer,'div',['container']);
        const botContainer = renderElement(this.packageContainer,'div',['container']);

        renderElement(topContainer,'div',['title'],pack.name);
        renderElement(botContainer,'div',['description'],pack.description);

        renderElement(topContainer,'div',['employees'],`Сотрудников: ${order.employees}`);

        const deleteBtn = renderElement(botContainer,'div',['btn']);
        const icon = renderElement(deleteBtn,'img',[]) as HTMLImageElement;
        icon.src = `${path.root}/${path.public}/images/delete.svg`;
        deleteBtn.addEventListener('click',this.removePackage);

        this.calculator.setPackage(order);
        this.updatePrices();
    }

    removePackage() {
        this.calculator.removePackage();
        this.updatePrices();
        this.packageContainer.innerHTML = '';
    }

    updatePrices() {
        const cost = this.calculator.getTotalCost();
        this.firstPayElement.textContent = `${cost.firstPay}`;
        this.monthlyFeeElement.textContent = `${cost.monthlyFee}`;
    }

    togglePackageContainer() {
        this.removePackage();
        this.packageContainer.classList.toggle('disabled');
    }
}