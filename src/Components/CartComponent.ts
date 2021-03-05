import renderElement from "../Utils/renderElement";

export class CartComponent {
    parentElement: HTMLElement;
    container: HTMLElement;
    numberContainer: HTMLElement;
    packageContainer: HTMLElement;

    constructor(parentElement: HTMLElement) {
        this.parentElement = parentElement;
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
}