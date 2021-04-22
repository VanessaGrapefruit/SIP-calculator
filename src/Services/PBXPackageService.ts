import { PackageSet } from "../Models/PBXPackage";
//import packageSet from './packages.json';

export class PBXPackageService {
    private packageSet: PackageSet;
    private static instance: PBXPackageService;

    private constructor() {}

    static getInstance() {
        if (!this.instance)
            this.instance = new PBXPackageService();
        return this.instance;
    }

    async getPBXPackages() {
        if (!this.packageSet) await this.fetchDataFromServer();
        //if (!this.packageSet) this.packageSet = packageSet;
        return this.packageSet;
    }

    private async fetchDataFromServer() {
        const responce = await fetch('https://services.api.bn.by/api/SIPCalculator/GetAllPackages',{
            headers: {
                "Content-Type": "application/json",
                "access_token": "lzdjkhnglkzdjhrzjklg3249857rsigrsldu4tgh3wlo57rlkj_wsioeu762"
            }
        });
        if (!responce.ok) throw new Error('failed to load packages from API');
        this.packageSet = await responce.json();
    }
}