import { ExternalNumber } from "../Models/ExternalNumber";

export function getExternalNumbers() {
    return numbers;
}

const numbers : ExternalNumber[] = [
    {
        name: 'Золотой',
        level: 1,
        description: 'Одинаковые 4 цифры, или 3 последние цифры равны нулю, или цифры зеркальны.',
        examples: ['+375 740 740 9999','+375 740 740 9000','+375 740 740 9229'],
        image: 'Gold.png',
        numberFirstPay: 40,
        numberMonthlyFee: 3,
        trunkFirstPay: 10,
        trunkMonthlyFee: 7,
    },
    {
        name: 'Серебрянный',
        level: 2,
        description: 'Одинаковые 4 цифры, или 3 последние цифры равны нулю, или цифры зеркальны.',
        examples: ['+375 740 740 9999','+375 740 740 9000','+375 740 740 9229'],
        image: 'Silver.png',
        numberFirstPay: 40,
        numberMonthlyFee: 3,
        trunkFirstPay: 10,
        trunkMonthlyFee: 7,
    },
    {
        name: 'Бронзовый',
        level: 3,
        description: 'Одинаковые 4 цифры, или 3 последние цифры равны нулю, или цифры зеркальны.',
        examples: ['+375 740 740 9999','+375 740 740 9000','+375 740 740 9229'],
        image: 'Bronze.png',
        numberFirstPay: 40,
        numberMonthlyFee: 3,
        trunkFirstPay: 10,
        trunkMonthlyFee: 7,
    },
    {
        name: 'Случайный',
        level: 4,
        description: 'Одинаковые 4 цифры, или 3 последние цифры равны нулю, или цифры зеркальны.',
        examples: ['+375 740 740 9999','+375 740 740 9000','+375 740 740 9229'],
        image: 'Random.png',
        numberFirstPay: 40,
        numberMonthlyFee: 3,
        trunkFirstPay: 10,
        trunkMonthlyFee: 7,
    },
]