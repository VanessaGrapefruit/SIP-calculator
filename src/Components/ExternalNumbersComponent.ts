import { ExternalNumber } from "../Models/ExternalNumber";
import { getNumberDescription } from "../Utils/getNumberDescription";
import renderElement from "../Utils/renderElement";
import Store from "../Utils/Store";
import { path } from "../Models/Costants";

export class ExternalNumbersComponent {
    private numbers: ExternalNumber[];
    private parentElement: HTMLElement;
    private overlay: HTMLElement;
    private container: HTMLElement;

    private store: Store;

    constructor(numbers: ExternalNumber[],parentElement: HTMLElement,store: Store) {
        this.numbers = numbers;
        this.parentElement = parentElement;
        this.store = store;

        this.openPopup = this.openPopup.bind(this);
        this.onDescriptionMouseEnter = this.onDescriptionMouseEnter.bind(this);
    }

    render() {
        this.overlay = renderElement(this.parentElement,'div',['external-numbers__overlay']);
        this.container = renderElement(this.overlay,'div',['external-numbers__container']);
        this.numbers.forEach((number) => {
            this.renderNumber(number);
        });
    }

    renderNumber(number: ExternalNumber) {
        const element = renderElement(this.container,'div',['external-number']);
        element.dataset.id = number.id.toString();
        element.addEventListener('click',this.openPopup);

        this.renderNumberImage(element,number);
        this.renderNumberContent(element,number);
        this.renderDescriptionButton(element,number);
    }

    openPopup(e: MouseEvent) {
        const target = e.target as HTMLElement;
        const element = this.getClosestContainer(target);
        const id = element.dataset.id;
        this.store.openExternalNumber(id);
    }

    renderNumberImage(element: HTMLElement,number: ExternalNumber) {
        const img = renderElement(element,'img',[]) as HTMLImageElement;
        img.src = `${path.public}/images/${number.image}`;
    }

    renderNumberContent(element: HTMLElement, number: ExternalNumber) {
        const container = renderElement(element,'div',['content']);
        
        renderElement(container,'div',['level'],`Уровень ${number.level}`);
        renderElement(container,'div',['name'],number.name);
        renderElement(container,'div',['cost'],`${number.numberFirstPay} BYN`);
    }

    renderDescriptionButton(element: HTMLElement, number: ExternalNumber) {
        const mark = renderElement(element,'div',['description-mark']);
        const img = renderElement(mark,'img',['mark']) as HTMLImageElement;
        img.src = `${path.public}/images/question-mark.svg`;
        mark.addEventListener('mouseenter',this.onDescriptionMouseEnter);
    }

    onDescriptionMouseEnter(e: MouseEvent) {
        const target = e.target as HTMLElement;
        const element = this.getClosestContainer(target)
        const number = this.getExternalNumber(element);

        const description = renderElement(this.overlay,'div',['description']);
        description.style.left = `${target.offsetLeft}px`;
        description.style.top = `${target.offsetTop + target.offsetHeight}px`;
        description.innerHTML = getNumberDescription(number);

        const onmouseleave = () => {
            this.overlay.removeChild(description);
            target.removeEventListener('mouseleave',onmouseleave);
        }
        target.addEventListener('mouseleave',onmouseleave);
    }

    getClosestContainer(target: HTMLElement) {
        return target.closest('.external-number') as HTMLElement;
    }

    getExternalNumber(element: HTMLElement) {
        const id = +element.dataset.id;
        return this.numbers.find((number) => number.id === id);
    }
}