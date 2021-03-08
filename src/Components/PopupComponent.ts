import renderElement from "../Utils/renderElement";
import Store from "../Utils/Store";


export class PopupComponent {
    parentElement: HTMLElement;
    container: HTMLElement;
    overlay: HTMLElement;

    store: Store;

    constructor(parentElement: HTMLElement,store: Store) {
        this.parentElement = parentElement;
        this.store = store;

        this.hide = this.hide.bind(this);
        this.dispose = this.dispose.bind(this);
    }

    render() {
        this.container = renderElement(this.parentElement,'div',['popup-container']);
        this.overlay = renderElement(this.parentElement,'div',['popup-overlay']);

        this.overlay.addEventListener('click',this.hide);
    }

    hide(e: MouseEvent) {
        e.stopPropagation();
        this.dispose();
    }

    dispose() {
        this.parentElement.removeChild(this.container);
        this.parentElement.removeChild(this.overlay);

        this.store.hidePopup();
    }

    addContainerStyle(className: string) {
        this.container.classList.add(className);
    }

}