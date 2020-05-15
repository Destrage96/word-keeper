<template>
    <div class="starred-words__container">
        <div v-if="emptyWordsList === true" class="empty-list">
            <p>Список пуст</p>
        </div>
        <draggable v-model="wordsList"
                   @start="drag=true"
                   @end="drag=false">

            <div v-for="word in wordsList"
                 class="word__wrap"
                 :key="word.index">

                <div class="word__head">
                    <a @click="$_onWordClick(word.word)" class="word-link">
                        <span class="word">{{ word.word }}</span>

                        <span class="word__part-of-speech" v-if="word.results">
                            {{ word.results[0].partOfSpeech }}
                        </span>

                        <span v-if="word.results">
                            {{ $_wordContentCrop(word.results[0].definition) }}
                        </span>
                    </a>

                    <a @click.prevent="$_onStarredWords(word)" :class="$_starredWordChange(word.word)">
                        <font-awesome-icon fas icon="star" style="margin-right: 20px"/>
                    </a>
                </div>

                <div class="word__content" v-if="wordClick === word.word">
                    <div v-if="word.pronunciation || word.rhymes" style="margin-bottom: 20px">
                        [ {{ $_pronunciationValue(word.rhymes || word.pronunciation) || word.pronunciation }} ]
                    </div>

                    <div v-if="word.results">
                        <p class="word__content-title">Definition:</p>

                        <div v-for="item in word.results"
                             class="word-definition"
                             :key="item.index">
                            <font-awesome-icon far icon="circle" style="font-size: 8px"/>
                            {{item.definition}}
                        </div>
                    </div>

                    <div v-else>
                        нет описания
                    </div>
                </div>
            </div>
        </draggable>
    </div>
</template>

<script>
    import draggable from 'vuedraggable';

    export default {
        name: "starred-words",
        components: {
            draggable
        },

        mounted() {
            this.starredWords = this.$store.getters['starred-words/LIST'] || [];
            this.$root.$on('on-search-words', this.$_onSearch);
            this.$root.$on('part-of-speech', this.$_onChangePartOfSpeech);
            this.$root.$on('on-search-words-clear', this.$_onSearch);
        },

        beforeDestroy() {
            this.wordsList = this.starredWords;
            this.$root.$off('on-search-words');
            this.$root.$off('part-of-speech');
            this.$root.$off('on-search-words-clear');
        },

        data: function () {
            return {
                wordClick: false,
                starredWords: [],
                partOfSpeechChange: []
            }
        },

        computed: {
            wordsList: {
                get() {
                    return this.$store.getters['starred-words/LIST'] || [];
                },

                set(value) {
                    if (this.partOfSpeechChange.length === 0 && value.length === 0) {
                        return this.$store.commit('starred-words/SET_LIST_WORDS', this.starredWords)
                    }

                    return this.$store.commit('starred-words/SET_LIST_WORDS', value)
                }
            },

            emptyWordsList() {
                return _.isEmpty(this.wordsList) ? true : false;
            },
        },

        methods: {
            $_wordContentCrop(definition) {
                let clamp = '...';
                if (definition.length > 60) {
                    return definition.slice(0, 60) + clamp;
                }
                return definition;
            },

            $_onWordClick: function (v) {
                if (v === this.wordClick) {
                    return this.wordClick = !this.wordClick;
                }
                return this.wordClick = v;
            },

            $_onStarredWords(word) {
                let v = this.wordsList.map(item => item.word);
                if (v.includes(word.word)) {
                    this.$store.dispatch('starred-words/DELETED_WORD', word);
                } else {
                    this.$store.dispatch('starred-words/SAVE_WORD', word);
                }
                this.starredWords = this.wordsList;
            },

            $_pronunciationValue(value) {
                let pronunciation = Object.entries(value)[0];
                return pronunciation[1];
            },

            $_starredWordChange(word) {
                if (this.wordsList.find(item => item.word === word)) {
                    return 'red-class-words';
                }
                return 'blue-class-words';
            },

            $_onSearch(query) {
                let obj = this.starredWords;
                let newArray = [];
                const queries = query.toLowerCase();
                for (let key in obj) {
                    let el = [obj[key].word];

                    _.forEach(el, val => {
                        if (val.toLowerCase().indexOf(queries) != -1) {
                            newArray.push(obj[key]);
                        }
                    })
                }
                if (_.isEmpty(query)) {
                    return this.wordsList = this.starredWords;
                }
                return this.wordsList = newArray;
            },

            $_onChangePartOfSpeech(value) {
                this.partOfSpeechChange = value;
                if (this.starredWords.length > 0) {
                    this.wordsList = this.starredWords.filter(word => word.results
                        && this.partOfSpeechChange.includes(word.results[0].partOfSpeech));
                }
            }
        }
    }
</script>

<style lang="less">
    .starred-words__container {
        overflow: hidden;
        position: relative;
        word-break: break-word;
        width: 100%;

        .word__wrap {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            border: 2px dashed #afb8e2;
            background-color: aliceblue;
            border-radius: 5px;
            margin-bottom: 15px;
            padding: 10px;

            .word__head {
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: auto;

                .word-link {
                    color: black;
                    width: 100%;

                    .word {
                        font-size: 16px;
                        font-weight: bold;
                        color: #b64700;
                    }

                    .word__part-of-speech {
                        color: #8709a3;
                        font-style: italic;
                    }
                }
            }

            .word__content {
                width: 100%;
                padding-top: 10px;
                border-top: 2px solid #afb8e2;

                .word__content-title {
                    font-weight: bold;
                    font-style: italic;
                }

                .word-definition {
                    margin-left: 20px;
                }
            }
        }
    }
</style>