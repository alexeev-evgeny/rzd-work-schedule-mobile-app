<template>
    <div class="root">
        <List class="list" :items="schedule" />
        <Filter
            class="filter"
            :defaultDateStart="dateStart"
            :defaultDateEnd="dateEnd"
            @update:dateStart="changeDateStart"
            @update:dateEnd="changeDateEnd"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Filter from './components/Filter.vue';
import List from './components/List.vue';
import useStore from './store';

export default defineComponent({
    components: {
        List,
        Filter
    },

    setup() {
        const store = useStore();
        return {
            schedule: store.schedule,
            dateStart: store.dateStart,
            dateEnd: store.dateEnd,
            changeDateStart: store.changeDateStart,
            changeDateEnd: store.changeDateEnd
        };
    },
})
</script>

<style scoped>
.root {
    display: block;
    position: relative;
    max-width: 1280px;
    min-height: 100%;
    margin: 0 auto;
    padding: 10px 0 60px;
    background-color: #fff;
}
.filter {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>