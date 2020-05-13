<template>
    <div class="search">
        <div class="search-input">
            <Input v-model="query"
                   search
                   style="margin-right: 25px"
                   placeholder="Поиск"/>

            <Button type="primary"
                    @click="$_onSearch">
                <font-awesome-icon fas icon="search"/>
            </Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "search",

        data: function () {
            return {
                query: ''
            }
        },
        methods: {
            $_onSearch() {
                return this.$root.$emit('on-search-words', this.query);
            }
        }
    }
</script>

<style lang="less">
    .search {
       .search-input {
           width: 100%;
           display: flex;
           margin-bottom: 30px;
       }
    }
</style>