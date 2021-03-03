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
        image: 'globe.svg',
        firstCost: 40,
        monthlyFee: 10,
    },
    {
        name: 'Серебрянный',
        level: 2,
        description: 'Одинаковые 4 цифры, или 3 последние цифры равны нулю, или цифры зеркальны.',
        examples: ['+375 740 740 9999','+375 740 740 9000','+375 740 740 9229'],
        image: 'globe.svg',
        firstCost: 25,
        monthlyFee: 10,
    },
    {
        name: 'Бронзовый',
        level: 3,
        description: 'Одинаковые 4 цифры, или 3 последние цифры равны нулю, или цифры зеркальны.',
        examples: ['+375 740 740 9999','+375 740 740 9000','+375 740 740 9229'],
        image: 'globe.svg',
        firstCost: 15,
        monthlyFee: 10,
    },
    {
        name: 'Случайный',
        level: 4,
        description: 'Одинаковые 4 цифры, или 3 последние цифры равны нулю, или цифры зеркальны.',
        examples: ['+375 740 740 9999','+375 740 740 9000','+375 740 740 9229'],
        image: 'globe.svg',
        firstCost: 3,
        monthlyFee: 3,
    },
]