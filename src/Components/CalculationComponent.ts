import { Cost, NumberCost, PackageCost } from "../Models/Cost";
import { CalculationService } from "../Services/CalculationService";
import renderElement from "../Utils/renderElement";
import Store from "../Utils/Store";
import { PopupComponent } from "./PopupComponent";

export class CalculationComponent extends PopupComponent {
    calculator: CalculationService;

    constructor(parentElement: HTMLElement,store: Store,calculator: CalculationService) {
        super(parentElement,store);
        this.calculator = calculator;
    }

    render() {
        super.render();
        super.addContainerStyle('calculation-popup');

        this.renderHeader();
        this.renderNumbers();
        this.renderPackage();
        this.renderSummaryButtons();
    }

    renderHeader() {
        const header = renderElement(this.container,'div',['header']);
        renderElement(header,'div',['title'],'Детализация заказа SIP-телефонии');
        const logo = renderElement(header,'img',[]) as HTMLImageElement;
        logo.src = '../../public/images/logo.svg';
        this.renderDividingLine();
    }

    renderNumbers() {
        for (const cost of this.calculator.getNumbers()) {
            this.renderNumber(cost);
            this.renderDividingLine();
        }
    }

    //Номер - контейнер с названием и описанием номера и двумя блоками цен (линий и номеров)
    renderNumber(cost: NumberCost) {
        const container = renderElement(this.container,'div',['number']);
        renderElement(container,'div',['name'],`${cost.number.name} номер`);
        renderElement(container,'div',['description'],cost.number.description);
        const costsContainer = renderElement(container,'div',['cost-container']);
        this.renderCostBlock('Количество номеров',cost.numbersCost,costsContainer);
        this.renderCostBlock('Количество линий',cost.trunksCost,costsContainer);
    }

    //Блок цен - две цены (установочная и абонентская) а также количество номеров/линий
    renderCostBlock(title: string,cost: Cost,parent: HTMLElement) {
        const container = renderElement(parent,'div',['cost-block']);
        renderElement(container,'div',['title'],`${title}: ${cost.count}`);

        const wrapper = renderElement(container,'div',['cost-wrapper']);

        const firstPayElement = renderElement(wrapper,'div',['cost']);
        renderElement(firstPayElement,'div',['price'],`${cost.firstPay} BYN`);
        renderElement(firstPayElement,'div',['mark'],'Установочная плата');

        const monthlyFeeElement = renderElement(wrapper,'div',['cost']);
        renderElement(monthlyFeeElement,'div',['price'],`${cost.monthlyFee} BYN/мес`);
        renderElement(monthlyFeeElement,'div',['mark'],'Абонентская плата');
    }

    renderPackage() {
        const cost = this.calculator.getPackageCost();
        if (!cost) return;

        const container = renderElement(this.container,'div',['package']);
        this.renderPackageFunctions(container,cost);
        this.renderCostBlock('Количество сотрудников',cost.cost,container);
    }

    renderPackageFunctions(parent: HTMLElement,cost: PackageCost) {
        const container = renderElement(parent,'div',['functions']);
        renderElement(container,'div',['title'],cost.package.name);

        for (const func of cost.functions) {
            renderElement(container,'div',['func'],func.name);
        }
    }

    renderDividingLine() {
        renderElement(this.container,'div',['dividing-line']);
    }

    renderSummaryButtons() {
        const wrapper = renderElement(this.container,'div',['btns-container']);
        renderElement(wrapper,'div',[]);

        const container = renderElement(wrapper,'div',['btns']);
        const cost = this.calculator.getTotalCost();

        const firstPayElement = renderElement(container,'div',['btn']);
        const monthlyFeeElement = renderElement(container,'div',['btn']);

        renderElement(firstPayElement,'div',['price'],`${cost.firstPay + cost.monthlyFee} BYN`);
        renderElement(firstPayElement,'div',['mark'],'Первый платеж');

        renderElement(monthlyFeeElement,'div',['price'],`${cost.monthlyFee} BYN/мес`);
        renderElement(monthlyFeeElement,'div',['mark'],'Ежемесячный платеж');
    }
}