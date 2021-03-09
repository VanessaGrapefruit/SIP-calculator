export interface PackageSet {
    packages: PBXPackage[];
    functions: PBXFunction[];
}

export interface PBXPackage {
    name: string;
    description: string;
    functions: PBXFunctionState[];
}

export interface PBXFunctionState{
    id: number;
    included: boolean;
}

export interface PBXFunction {
    id: number;
    name: string;
    description: string;
}