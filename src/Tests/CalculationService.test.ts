import { NumberOrder } from "../Models/NumberOrder";
import { CalculationService } from "../Services/CalculationService";
import { getExternalNumbers } from "../Services/ExternalNumbersService";
import getPBXPackages from "../Services/PBXPackageService";
import * as assert from 'assert';
import { PackageOrder } from "../Models/PackageOrder";

describe('Calculation service tests', function() {
    const calculator = CalculationService.getInstance();
    const numbers = getExternalNumbers();
    const packageSet = getPBXPackages();

    const order: NumberOrder = {
        number: numbers[0],
        numsCount: 2,
        trunksCount: 10
    }

    it('should realize singleton pattern', function() {
        const calculator2 = CalculationService.getInstance();
        assert.equal(calculator,calculator2);
    })

    it('should add and remove numbers', function() {
        calculator.addNumber(order);
        calculator.removeNumber(0);
        const cost = calculator.getTotalCost();
        assert.equal(cost.firstPay,0);
        assert.equal(cost.monthlyFee,0);
    });

    it('should throw on incorrect index', function() {
        try {
            calculator.removeNumber(50);
        } catch (err: any) {
            assert.equal(err.message,'Index must me greather than -1 and less than numbers length');
        }
    })

    it('should set and remove packages', function() {
        const order: PackageOrder = {
            employees: 2,
            package: packageSet.packages[1]
        }
        calculator.setPackage(order);
        calculator.removePackage();
        const cost = calculator.getTotalCost();
        assert.equal(cost.firstPay,0);
        assert.equal(cost.monthlyFee,0);
    })

    const prices = calculator.getNumberCost(order);

    it('should calculate number prices', function() {
        const numbersCost = prices.numbersCost;
        assert.equal(numbersCost.firstPay,80);
        assert.equal(numbersCost.monthlyFee,6);
    });

    it('should calculate trunk prices', function() {
        const trunksCost = prices.trunksCost;
        assert.equal(trunksCost.firstPay,100);
        assert.equal(trunksCost.monthlyFee,70);
    });

    it('should calculate package prices', function() {
        const order: PackageOrder = {
            employees: 2,
            package: packageSet.packages[1]
        }
        calculator.setPackage(order);
        const prices = calculator.getPackageCost();
        assert.equal(prices.cost.firstPay,24);
        assert.equal(prices.cost.monthlyFee,8);
    });

    it('should calculate total prices', function() {
        calculator.addNumber(order);
        const cost = calculator.getTotalCost();
        assert.equal(cost.firstPay,204);
        assert.equal(cost.monthlyFee,84);
    })
});