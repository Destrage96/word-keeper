<template>
    <div class="page-words__container">
        <div class="content-search">
            <Search/>
            <PartOfSpeechCheckbox/>
        </div>

        <Words class="content-words"
               :words="words"
               :loading="loading"/>
    </div>
</template>

<script>
    import Words from '../components/words';
    import PartOfSpeechCheckbox from '../components/part-of-speech-checkbox';
    import Search from '../components/search';

    export default {
        components: {
            Words,
            Search,
            PartOfSpeechCheckbox
        },

        mounted() {
            this.wordsList = this.$store.getters['words/LIST'];
            this.$root.$on('on-search-words', this.$_onSearch);
            this.$root.$on('part-of-speech', this.$_onChangePartOfSpeech);
            this.$root.$on('on-search-words-clear', this.$_onSearch);
        },

        beforeDestroy() {
            this.words = this.wordsList;
            this.$root.$off('on-search-words');
            this.$root.$off('part-of-speech');
            this.$root.$off('on-search-words-clear');
        },

        data() {
            return {
                loading: false,
                partOfSpeechChange: [],
                wordsList: []
            }
        },
        computed: {
            words: {
                get() {
                    return this.$store.getters['words/LIST'] || [];
                },

                set(value) {
                    return this.$store.commit('words/SET_LIST', value)
                }
            }
        },

        methods: {
            async fetchWords(words) {
                this.loading = true;
                try {
                    this.words = await this.$store.dispatch('words/FETCH_LIST', {words: words});
                    this.wordsList = this.words;
                    if (this.partOfSpeechChange.length > 0) {
                        this.words = this.words.filter(word => word.results
                            && this.partOfSpeechChange.includes(word.results[0].partOfSpeech));
                    }
                } catch (e) {
                    throw e;
                } finally {
                    this.loading = false;
                }
            },

            async $_onSearch(query) {
                this.loading = true;
                try {
                    if (_.isEmpty(query)) {
                        return this.words = this.wordsList;
                    }

                    let words = await this.$api.words.searchWords(query);
                    words = Object.values(words.list)[1].data;
                    await this.fetchWords(words);
                } catch (e) {
                    throw e;
                } finally {
                    this.loading = false;
                }

            },

            $_onChangePartOfSpeech(value) {
                this.partOfSpeechChange = value;
                if (this.wordsList.length > 0) {
                    if (this.partOfSpeechChange.length > 0) {
                        return this.words = this.wordsList.filter(word => word.results
                            && this.partOfSpeechChange.includes(word.results[0].partOfSpeech));
                    }
                    return this.words = this.wordsList;
                }
            }
        }
    }
</script>

<style lang="less">
    .page-words__container {
        margin-top: 30px;
        display: flex;
        flex-wrap: wrap;

        .content-search {
            width: 100%;
            margin-right: 50px;
        }

        .content-words {
            width: 100%;
        }
    }

    @media (min-width: 1025px) {
        .page-words__container {
            margin-top: 30px;
            display: flex;
            flex-wrap: wrap;

            .content-search {
                width: 50%;
                margin-right: 50px;
            }

            .content-words {
                width: 45%;
            }
        }
    }
</style>

