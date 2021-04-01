import { ExternalNumber } from "../Models/ExternalNumber";

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
        if (!this.numbers) await this.fetchDataFromServer();
        this.validateNumbers();
        return this.numbers;
    }

    private async fetchDataFromServer() {
        const responce = await fetch('http://services.api.bn.by/api/SIPCalculator/GetAllExternalNumbers',{
            headers: {
                "Content-Type": "application/json",
                "access_token": "lzdjkhnglkzdjhrzjklg3249857rsigrsldu4tgh3wlo57rlkj_wsioeu762"
            }
        });
        this.numbers = await responce.json();
    }

    private validateNumbers() {
        this.numbers.forEach((number,id) => {
            if (!number.id) this.numbers[id].id = id;
        })
    }
}