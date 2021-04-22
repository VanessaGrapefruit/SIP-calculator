import { ExternalNumber } from "../Models/ExternalNumber";
import numbers from './numbers.json';

export class ExternalNumbersService {
    private numbers: ExternalNumber[];
    private static instance: ExternalNumbersService;

    private constructor() {}

    static getInstance() {
        if (!this.instance) 
            this.instance = new ExternalNumbersService();
        return this.instance;
    }

    async getExternalNumbers() {
        // if (!this.numbers) await this.fetchDataFromServer();
        if (!this.numbers) this.numbers = numbers;
        this.validateNumbers();
        return this.numbers;
    }

    private async fetchDataFromServer() {
        const responce = await fetch('https://services.api.bn.by/api/SIPCalculator/GetAllExternalNumbers',{
            headers: {
                "Content-Type": "application/json",
                "access_token": "lzdjkhnglkzdjhrzjklg3249857rsigrsldu4tgh3wlo57rlkj_wsioeu762"
            }
        });
        if (!responce.ok) throw Error('failed to load external numbers from API');
        this.numbers = await responce.json();
    }

    private validateNumbers() {
        this.numbers.forEach((number,id) => {
            if (!number.id) this.numbers[id].id = id;
        })
    }
}