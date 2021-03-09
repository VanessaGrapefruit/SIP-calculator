import { PackageSet } from "../Models/PBXPackage";
import renderElement from "../Utils/renderElement";
import Store from "../Utils/Store";
import { PackagesTableComponent } from "./PackagesTableComponent";

export class PBXPackagesComponent extends PackagesTableComponent {
    container: HTMLElement;

    constructor(packageSet: PackageSet,parentElement: HTMLElement,store: Store) {
        super(packageSet,parentElement,store);
    }

    render() {
        this.container = renderElement(this.parentElement,'div',['package-header']);
        this.renderTitle();

        super.render();
    }

    renderTitle() {
        renderElement(this.container,'div',['title'],'Пакеты функций виртуальной АТС');
    }
}