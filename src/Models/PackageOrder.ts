import { PBXFunction, PBXPackage } from "./PBXPackage";

export interface PackageOrder {
    package: PBXPackage;
    functions?: PBXFunction[];
    employees: number;
}