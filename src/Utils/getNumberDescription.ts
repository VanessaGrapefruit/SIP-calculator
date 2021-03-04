import { ExternalNumber } from "../Models/ExternalNumber";

export function getNumberDescription(number: ExternalNumber) {
    return `${number.description}<br>Пример:<br>${number.examples.join('<br>')}`;
}