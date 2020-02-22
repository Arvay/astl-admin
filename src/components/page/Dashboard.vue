<template>
    <div>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
export default {
    name: 'dashboard',
    data() {
        return {
        };
    },
    components: {
        Schart
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
    created() {
    },
    methods: {
    }
};
</script>


<style scoped>
</style>
