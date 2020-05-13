<template>
    <div class="page-words__container">
        <div class="content-search" >
            <Search/>
            <PartOfSpeechCheckbox/>
        </div>

        <Words :words="words" :loading="loading"/>
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
        this.words = this.$store.getters['words/LIST'] || [];
        this.$root.$on('on-search-words', this.$_onSearch);
        this.$root.$on('part-of-speech', this.$_onChangePartOfSpeech);
    },

    beforeDestroy() {
        this.$root.$off('on-search-words');
    },

    data() {
        return {
            words: [],
            loading: false,
            partOfSpeechChange: []
        }
    },

    methods: {
        async fetchWords(words) {
            this.loading = true;
            try {
                this.words = await this.$store.dispatch('words/FETCH_LIST', { words: words });
                if(this.partOfSpeechChange.length > 0) {
                    this.words = this.words.filter(word => word.results
                                                        && this.partOfSpeechChange.includes(word.results[0].partOfSpeech));
                }
            } catch (e) {
                throw e;
                // this.$root.$emit(this.EVENT_ID_ALERT_SHOW, {
                //     type: 'error',
                //     text: 'Ошибка загрузки данных'
                // })
            } finally {
                this.loading = false;
            }
        },

        async $_onSearch(query) {
            this.loading = true;
            try {
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
            if(this.words.length > 0) {
                this.words = this.$store.getters['words/LIST'];
                this.words = this.words.filter(word => word.results
                                                    && this.partOfSpeechChange.includes(word.results[0].partOfSpeech));
            }

            if (this.partOfSpeechChange.length === 0){
                this.words = this.$store.getters['words/LIST'];
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
            width: 50%;
            margin-right: 50px;
        }
    }
</style>

