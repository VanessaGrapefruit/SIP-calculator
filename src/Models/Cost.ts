import { ExternalNumber } from "./ExternalNumber";
import { PBXPackage } from "./PBXPackage";

export interface NumberCost {
    number: ExternalNumber;
    numbersCost: Cost;
    trunksCost: Cost;
}

export interface PackageCost {
    package: PBXPackage;
    cost: Cost;
}

export interface Cost {
    count: number;
    firstPay: number;
    monthlyFee: number;
}

export interface TotalCost {
    firstPay: number;
    monthlyFee: number;
}