import { PackageSet } from "../Models/PBXPackage";

export default function getPBXPackages() {
    return packageSet;
}

const packageSet: PackageSet = {
    packages: [
        {
            name: 'BASIC',
            description: '',
            functions: [
                {id: 1, included: true},{id:2,included: true},{id:3,included: false},{id:4,included: false},{id:5,included: false},{id:6,included: false},{id:7,included: false}
            ]
        },
        {
            name: 'Package 1',
            description: '',
            functions: [
                {id: 1, included: true},{id:2,included: true},{id:3,included: false},{id:4,included: false},{id:5,included: false},{id:6,included: false},{id:7,included: false}            ]
        },
        {
            name: 'Package 2',
            description: '',
            functions: [
                {id: 1, included: true},{id:2,included: true},{id:3,included: false},{id:4,included: false},{id:5,included: false},{id:6,included: false},{id:7,included: false}            ]
        },
        {
            name: 'Package 3',
            description: '',
            functions: [
                {id: 1, included: true},{id:2,included: true},{id:3,included: false},{id:4,included: false},{id:5,included: false},{id:6,included: false},{id:7,included: false}            ]
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