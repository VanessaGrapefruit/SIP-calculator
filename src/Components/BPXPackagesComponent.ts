import { PackageOrder } from "../Models/PackageOrder";
import { PackageSet } from "../Models/PBXPackage";
import renderElement from "../Utils/renderElement";
import Store from "../Utils/Store";
import { PackagesTableComponent } from "./PackagesTableComponent";

export class PBXPackagesComponent extends PackagesTableComponent {
    container: HTMLElement;
    employeesContainer: HTMLElement;
    employeesInput: HTMLInputElement;
    overlay: HTMLElement;

    isDiabled: boolean = false;

    constructor(packageSet: PackageSet,parentElement: HTMLElement,store: Store) {
        super(packageSet,parentElement,store);

        this.onCheckboxChanged = this.onCheckboxChanged.bind(this);
    }

    render() {
        this.container = renderElement(this.parentElement,'div',['package-header']);
        this.renderTitle();
        this.renderCheckMark();
        this.renderEmploeesSelection();

        super.render();

        window.addEventListener('resize',() => {
            this.toggleInteraction();
            this.toggleInteraction();
        })
    }

    renderTitle() {
        renderElement(this.container,'div',['title'],'Пакеты функций виртуальной АТС');
    }

    renderCheckMark() {
        const container = renderElement(this.container,'div',['check-container']);

        const checkbox = renderElement(container,'input',['checkbox']) as HTMLInputElement;
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change',this.onCheckboxChanged);

        renderElement(container,'div',['content'],'Уже есть своя АТС');
    }

    onCheckboxChanged(e: MouseEvent) {
        this.store.tooglePBXCheckbox();
    }

    renderEmploeesSelection() {
        this.employeesContainer = renderElement(this.container,'div',['employees']);

        const content = renderElement(this.employeesContainer,'div',['content']);
        renderElement(content,'div',['title'],'Количество сотрудников');
        renderElement(content,'div',['subtitle'],'Необходимо указать для расчета стоимости пакета');

        this.employeesInput = renderElement(this.employeesContainer,'input',[]) as HTMLInputElement;
        this.employeesInput.value = '4';
        this.employeesInput.type = 'number';
    }

    addPackageToCart(e: MouseEvent) {
        super.addPackageToCart(e);

        const pack = this.getPackage(e);
        const functions = this.packagesSet.functions.filter((func) => {
            const length = pack.functions.filter((func) => func.included).length;
            return func.id <= length;
        })
        const order: PackageOrder = {
            package: pack,
            employees: +this.employeesInput.value,
            functions
        }
        this.store.addPackageToCart(order);
    }

    disable() {
        this.overlay = renderElement(this.employeesContainer,'div',['packages-overlay']);
        this.overlay.style.left = `${this.employeesContainer.offsetLeft}px`;
        this.overlay.style.top = `${this.employeesContainer.offsetTop}px`;
        this.overlay.style.width = `${this.employeesContainer.offsetWidth}px`;
        this.overlay.style.height = `${this.employeesContainer.offsetHeight}px`;

        super.disable();
    }

    enable() {
        this.employeesContainer.removeChild(this.overlay);
        super.enable();
    }
}