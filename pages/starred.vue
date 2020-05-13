<template>
    <div class="words-starred__container">
        <Search class="content-search" />
        <StarredWord/>
    </div>
</template>

<script>
    import Search from '../components/search';
    import StarredWord from "../components/starred-word";
    export default {
        components: {
            StarredWord,
            Search
        }
    }
</script>

<style lang="less">
    .words-starred__container {
        margin-top: 30px;
        display: flex;

        .content-search {
            width: 50%;
            margin-right: 50px;
        }
    }
</style>