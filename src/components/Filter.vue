<template>
    <div class="filter">
        <input class="input" type="date" :value="dateStart" @change="changeDateStart">
        <input class="input" type="date" :value="dateEnd" @change="changeDateEnd">
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import format from 'date-fns/format';

export default defineComponent({
    props: {
        defaultDateStart: {
            type: Date,
            required: false,
        },
        defaultDateEnd: {
            type: Date,
            required: false,
        }
    },
    setup(props, { emit }) {
        return {
            dateStart: computed(() => formatDate(props.defaultDateStart)),
            dateEnd: computed(() => formatDate(props.defaultDateEnd)),

            changeDateStart(event: InputDateEvent) {
                emit('update:dateStart', new Date(event?.target?.value));
            },
            changeDateEnd(event: InputDateEvent) {
                emit('update:dateEnd', new Date(event?.target?.value));
            }
        };
    },
})

function formatDate(date?: Date | string) {
    if (!date) {
        return '';
    }
    if (typeof date === 'string') {
        return date;
    }
    return format(date, 'yyyy-MM-dd');
}

type InputDateEvent = Event & { target: { value: string } };
</script>

<style scoped>
.filter {
    display: flex;
    padding: 10px 10px;
    background-color: #9EA1D4;
}
.input {
    display: block;
    width: 100%;
    height: 35px;
    margin: 0 0 0 5px;
    padding: 8px 5px 5px;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 10px;
    border-radius: 3px;
    border: none;
    background-color: #fff;
}
.input:first-child {
    margin: 0 5px 0 0;
}
</style>
