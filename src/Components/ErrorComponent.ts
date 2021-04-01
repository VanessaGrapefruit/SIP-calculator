import { path } from "../Models/Costants";
import renderElement from "../Utils/renderElement";

export class ErrorComponent {
    error: Error;
    container: HTMLElement;

    constructor(error: Error) {
        this.error = error;

        this.reload = this.reload.bind(this);
    }

    render() {
        document.body.innerHTML = '';
        this.container = renderElement(document.body,'div',['error-container']);

        renderElement(this.container,'div',['description'],'Что-то пошло не так. Попробуйте перезагрузить страницу');
        renderElement(this.container,'div',['error'],this.error.message);
        this.renderReloadButton();

        const logo = renderElement(this.container,'img',['logo']) as HTMLImageElement;
        logo.src = `${path.public}/images/logo.svg`;
    }

    renderReloadButton() {
        const btn = renderElement(this.container,'div',['reload-btn'],'Перезагрузить');
        btn.addEventListener('click',this.reload);
    }

    reload() {
        location.reload();
    }
}