import { Cost, NumberCost, PackageCost, TotalCost } from "../Models/Cost";
import { NumberOrder } from "../Models/NumberOrder";
import { PackageOrder } from "../Models/PackageOrder";

export class CalculationService {
    private numbers: NumberOrder[];
    private package: PackageOrder;

    private static instance: CalculationService;

    constructor() {
        this.numbers = [];
    }

    public static getInstance() {
        if (!this.instance)
            this.instance = new CalculationService();
        return this.instance;
    }

    setPackage(order: PackageOrder) {
        this.package = order;
    }

    removePackage() {
        this.package = null;
    }

    addNumber(order: NumberOrder) {
        this.numbers.push(order);
    }

    removeNumber(index: number) {
        if (index < 0 || index >= this.numbers.length) {
            throw new Error('Index must me greather than -1 and less than numbers length');
        }
        this.numbers.splice(index,1);
    }

    getTotalCost() : TotalCost {
        let firstPay = 0, monthlyFee = 0;
        for (const order of this.numbers) {
            const cost = this.getNumberCost(order);
            firstPay += cost.numbersCost.firstPay + cost.trunksCost.firstPay;
            monthlyFee += cost.numbersCost.monthlyFee + cost.trunksCost.monthlyFee;
        }
        if (this.package) {
            const cost = this.getPackageCost();
            firstPay += cost.cost.firstPay;
            monthlyFee += cost.cost.monthlyFee;
        }
        return {firstPay,monthlyFee};
    }

    getNumberCost(order: NumberOrder) : NumberCost {
        const number = order.number;
        const numbersCost: Cost = {
            count: order.numsCount,
            firstPay: number.numberFirstPay * order.numsCount,
            monthlyFee: number.numberMonthlyFee * order.numsCount
        }
        const trunksCost: Cost = {
            count: order.trunksCount,
            firstPay: number.trunkFirstPay * order.trunksCount,
            monthlyFee: number.trunkMonthlyFee * order.trunksCount,
        }
        return {number,numbersCost,trunksCost};
    }

    getPackageCost() : PackageCost {
        const cost: Cost = {
            count: this.package.employees,
            firstPay: this.package.package.firstPay * this.package.employees,
            monthlyFee: this.package.package.monthlyFee * this.package.employees
        }
        return {package: this.package.package,cost};
    }
}