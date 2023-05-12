<template>
    <div class="list">
        <div 
            v-for="item in items" 
            :key="item?.date" 
            class="item" 
            :class="{'item--green': item.isCalendarDayOff, 'item--orange': item.isToday}"
        >
            <div class="item__date">{{ item.date }}</div>
            <div class="item__day">{{ item.dayOfWeek }}</div>
            <div class="item__value">{{ item.value }} ({{ item.description }})</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ScheduleItem } from '../store';

export default defineComponent({
    props: {
        items: {
            type: Array as PropType<ScheduleItem[]>,
            default: () => []
        }
    },
    setup() {
        return {};
    },
})
</script>

<style scoped>
.list {
    display: block;
    padding: 0 10px;
}
.item {
    display: flex;
    padding: 10px 5px;
    box-sizing: border-box;
    border-top: 1px solid #DBE2EF;
    color: #000c;
}

.item:first-child {
    border-top: none;
}

.item--green {
    background-color: #F1F7B5;
}
.item--orange {
    background-color: #FD8A8A;
}
.item__date {
    min-width: 100px;
}
.item__day {
    min-width: 70px;
}
.item__value {
    min-width: 100px;
}


</style>
