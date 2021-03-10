import { PackageOrder } from "../Models/PackageOrder";
import { PackageSet } from "../Models/PBXPackage";
import renderElement from "../Utils/renderElement";
import Store from "../Utils/Store";
import { PackagesTableComponent } from "./PackagesTableComponent";

export class PBXPackagesComponent extends PackagesTableComponent {
    container: HTMLElement;
    employeesInput: HTMLInputElement;

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
        const container = renderElement(this.container,'div',['employees']);

        const content = renderElement(container,'div',['content']);
        renderElement(content,'div',['title'],'Количество сотрудников');
        renderElement(content,'div',['subtitle'],'Необходимо указать для расчета стоимости пакета');

        this.employeesInput = renderElement(container,'input',[]) as HTMLInputElement;
        this.employeesInput.value = '4';
        this.employeesInput.type = 'number';
    }

    addPackageToCart(e: MouseEvent) {
        super.addPackageToCart(e);

        const pack = this.getPackage(e);
        const order: PackageOrder = {
            package: pack,
            employees: +this.employeesInput.value
        }
        this.store.addPackageToCart(order);
    }
}