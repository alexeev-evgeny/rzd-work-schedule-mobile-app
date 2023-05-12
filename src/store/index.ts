import { ref, computed } from 'vue';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import getSchedule, { ScheduleItem as TypeScheduleItem } from './getSchedule';

export default function useStore() {
    const now = new Date();
    const dateStart = ref<Date>(startOfMonth(now));
    const dateEnd = ref<Date>(endOfMonth(now));

    const schedule = computed(() => {
        return getSchedule({
            dateStart: dateStart.value,
            dateEnd: dateEnd.value
        })
    });

    return {
        schedule,
        dateStart,
        dateEnd,

        changeDateStart: (value: Date) => dateStart.value = value,
        changeDateEnd: (value: Date) => dateEnd.value = value,
    };
}

export type ScheduleItem = TypeScheduleItem;