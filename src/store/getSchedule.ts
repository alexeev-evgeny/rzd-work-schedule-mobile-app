import add from 'date-fns/add';
import format from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isToday from 'date-fns/isToday';
import isEqual from 'date-fns/isEqual';
import differenceInDays from 'date-fns/differenceInDays';
import localeRu from 'date-fns/locale/ru';

const START_STATUS_DATES = {
    dayShift: new Date('2021-12-29T00:00:00.000Z'),
    nightShift: new Date('2021-12-30T00:00:00.000Z'),
    dayOffFirst: new Date('2021-12-31T00:00:00.000Z'),
    dayOffSecond: new Date('2022-01-01T00:00:00.000Z'),
}
const STATUSES = {
    dayShift: 'дневная смена',
    nightShift: 'ночная смена',
    dayOffFirst: 'выходной',
    dayOffSecond: 'выходной'
}
const DESCRIPTIONS = {
    dayShift: 'в день',
    nightShift: 'в ночь',
    dayOffFirst: 'с ночи',
    dayOffSecond: 'отдых'
}
const STATUSES_CODES = Object.keys(STATUSES);
const DATE_MASK = 'yyyy.MM.dd';
const DAY_OF_WEEK = 'EE';

export default function getWorkDayStatus({ dateStart, dateEnd }: { dateStart: Date, dateEnd: Date }) {
    if (!dateStart || !dateEnd) {
        throw new Error('Не переданы dateStart или dateEnd');
    }

    const start = START_STATUS_DATES.dayShift;
    const end = dateEnd;
    const daysCount = differenceInDays(end, start) + 1;

    const shedule: {date: Date; value: string;}[] = [];
    for (let day = 0; day <= daysCount; day++) {
        const date = add(new Date(start), { days: day });
        const prevValue = shedule[day - 1]?.value || null;
        const prevValueIndex = STATUSES_CODES.indexOf(prevValue || '');
        const hasNextValue = prevValueIndex < STATUSES_CODES.length - 1;
        const value = hasNextValue ? STATUSES_CODES[prevValueIndex + 1] : STATUSES_CODES[0];
        shedule.push({ date, value });
    }

    return shedule.reduce((result: ScheduleItem[], { date, value }) => {
        const isInCurrentPeriod = (isAfter(date, dateStart) && isBefore(date, dateEnd) )
            || isEqual(date, dateStart)
            || isEqual(date, dateEnd);

        if (!isInCurrentPeriod) {
            return result;
        }
        const dayOfWeek = format(date, DAY_OF_WEEK, { locale: localeRu }) ;
        result.push({
            date: format(date, DATE_MASK, { locale: localeRu }),
            value: STATUSES[value],
            description: DESCRIPTIONS[value],
            dayOfWeek,
            isCalendarDayOff: dayOfWeek === 'суб' || dayOfWeek === 'вск',
            isToday: isToday(date),
        }) 
        return result;
    }, []);
}

export type ScheduleItem = {
    date: string;
    value: string;
    dayOfWeek: string;
    description: string;
    isCalendarDayOff: boolean;
    isToday: boolean;
}
