import { PackageSet } from "../Models/PBXPackage";

export default function getPBXPackages() {
    return packageSet;
}

const packageSet: PackageSet = {
    packages: [
        {
            name: 'BASIC',
            description: 'Стандартный пакет. включенный в каждый тарифный план SIP',
            //isDefault: true,
            firstPay: 12,
            monthlyFee: 4,
            functions: [
                {functionId: 1, included: true},{functionId:2,included: true},{functionId:3,included: false},{functionId:4,included: false},{functionId:5,included: false},{functionId:6,included: false},{functionId:7,included: false}
            ]
        },
        {
            name: 'Package 1',
            description: 'Стандартный пакет. включенный в каждый тарифный план SIP',
            //isDefault: false,
            firstPay: 12,
            monthlyFee: 4,
            functions: [
                {functionId: 1, included: true},{functionId:2,included: true},{functionId:3,included: true},{functionId:4,included: false},{functionId:5,included: false},{functionId:6,included: false},{functionId:7,included: false}            ]
        },
        {
            name: 'Package 2',
            description: 'Стандартный пакет. включенный в каждый тарифный план SIP',
            //isDefault: false,
            firstPay: 12,
            monthlyFee: 4,
            functions: [
                {functionId: 1, included: true},{functionId:2,included: true},{functionId:3,included: true},{functionId:4,included: true},{functionId:5,included: true},{functionId:6,included: false},{functionId:7,included: false}            ]
        },
        {
            name: 'Package 3',
            description: 'Стандартный пакет. включенный в каждый тарифный план SIP',
            //isDefault: false,
            firstPay: 12,
            monthlyFee: 4,
            functions: [
                {functionId: 1, included: true},{functionId:2,included: true},{functionId:3,included: true},{functionId:4,included: true},{functionId:5,included: true},{functionId:6,included: true},{functionId:7,included: true}            ]
        },
    ],
    functions: [
        {
            id: 1,
            name: '3-х сторонняя конференция (3WAY)',
            description: '',
        },
        {
            id: 2,
            name: 'Запрет анонимных вызовов (ACB)',
            description: '',
        },
        {
            id: 3,
            name: 'Автодозвон (Autoredial)',
            description: '',
        },
        {
            id: 4,
            name: 'Автодозвон с обратным вызовом (AutoredialWithCB)',
            description: '',
        },
        {
            id: 5,
            name: 'Переадресация вызова по занятости (CFB)',
            description: '',
        },
        {
            id: 6,
            name: 'Переадресация вызова по неответу (CFNR)',
            description: '',
        },
        {
            id: 7,
            name: 'Переадресация по недоступности (CFOS)',
            description: '',
        },
    ]
}