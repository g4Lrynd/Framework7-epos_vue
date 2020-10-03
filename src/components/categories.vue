<template>
    <div class="test">
        <a href="#" @click="click">Click me</a>
    </div>
</template>
<style>
</style>
<script>
    export default {
        data() {
            return {
            };
        },
        methods: {
            click() {
                alert('Clicked');
            }
        },
        on : {
        }
    };
</script>