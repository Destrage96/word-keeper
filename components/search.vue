<template>
    <div class="search">
        <div class="search-input">
            <Input v-model="query"
                   class="input-text"
                   search
                   style="margin-right: 25px"
                   placeholder="Поиск"/>

            <div class="input-button">
                <Button type="primary"
                        style="margin-right: 25px"
                        @click="$_onSearch">
                    <font-awesome-icon fas icon="search"/>
                </Button>

                <Button type="primary" @click="$_onSearchClear">
                    <span>Очистить</span>
                </Button>
            </div>
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
            },

            $_onSearchClear() {
                this.query = '';
                return this.$root.$emit('on-search-words-clear', this.query);
            }
        }
    }
</script>

<style lang="less">
    .search {
        .search-input {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 30px;

            .input-text {
                max-width: 450px;
                min-width: 250px;
                margin-bottom: 30px;
            }

            .input-button {
                display: flex;
            }
        }
    }
</style>