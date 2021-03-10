import { PackageOrder } from "../Models/PackageOrder";
import { PackageSet, PBXPackage } from "../Models/PBXPackage";
import renderElement from "../Utils/renderElement";
import Store from "../Utils/Store";

export class PackagesTableComponent {
    parentElement: HTMLElement;
    grid: HTMLElement;

    store: Store;
    packagesSet: PackageSet;

    constructor(packageSet: PackageSet, parentElement: HTMLElement, store: Store) {
        this.packagesSet = packageSet;
        this.parentElement = parentElement;
        this.store = store;

        this.addPackageToCart = this.addPackageToCart.bind(this);
    }

    render() {
        this.grid = renderElement(this.parentElement,'div',['package-container__table']);
        this.grid.style.gridTemplateColumns = 
            `auto repeat(${this.packagesSet.packages.length},1fr)`;

        this.renderHeader();
        for (let i = 0; i < this.packagesSet.functions.length; i++) {
            this.renderRow(i);
        }
        this.renderButtons();
    }

    renderHeader() {
        renderElement(this.grid,'div',['func'],'Название функции').id = 'title';
        for (const pack of this.packagesSet.packages) {
            renderElement(this.grid,'div',['package'],pack.name).id = 'title';
        }
    }

    renderRow(index: number) {
        const func = this.packagesSet.functions[index];
        renderElement(this.grid,'div',['func'],func.name);

        for (const pack of this.packagesSet.packages) {
            const state = pack.functions[index].included;
            const element = renderElement(this.grid,'div',['package']);
            this.renderStateMark(element,state);
        }
    }

    renderStateMark(element: HTMLElement,state: boolean) {
        const mark = renderElement(element,'div',[]);
        if (state) {
            mark.classList.add('check');
            const img = renderElement(mark,'img',[]) as HTMLImageElement;
            img.src = '../../public/images/check-mark.svg';
        } else {
            mark.classList.add('cross');
            const img = renderElement(mark,'img',[]) as HTMLImageElement;
            img.src = '../../public/images/cross-mark.svg';
        }
    }

    renderButtons() {
        renderElement(this.grid,'div',[]);
        this.packagesSet.packages.forEach((pack,id) => {
            this.renderButton(pack,id);
        });
    }

    renderButton(pack: PBXPackage,id: number) {
        if (pack.isDefault) {
            renderElement(this.grid,'div',[]);
            return;
        }
        const container = renderElement(this.grid,'div',['btn-container']);
        renderElement(container,'div',['first'],`${pack.firstPay} BYN`);
        renderElement(container,'div',['monthly'],`${pack.monthlyFee} BYN/мес`);
        const button = renderElement(container,'div',['add-btn'],'Выбрать');
        button.dataset.id = id.toString();
        button.addEventListener('click',this.addPackageToCart);
    }

    getPackage(e: MouseEvent) {
        const target = e.target as HTMLElement;
        const button = target.closest('.add-btn') as HTMLElement;
        const id = +button.dataset.id;
        return this.packagesSet.packages[id];
    }

    addPackageToCart(e: MouseEvent) {

    }
}