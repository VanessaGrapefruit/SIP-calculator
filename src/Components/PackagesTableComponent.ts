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
    }

    render() {
        this.grid = renderElement(this.parentElement,'div',['package-container__table']);
        this.grid.style.gridTemplateColumns = 
            `auto repeat(${this.packagesSet.packages.length},1fr)`;

        this.renderHeader();
        for (let i = 0; i < this.packagesSet.functions.length; i++) {
            this.renderRow(i);
        }
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
            //const state = pack.functions[index];
            const element = renderElement(this.grid,'div',['package']);
            renderElement(element,'div',[]);
        }
    }
}