<template>
    <div class="words__container demo-spin">
        <div v-for="word in words"
             class="word__wrap"
             :key="word.index">
            <div class="word__head">
                <a @click="$_onWordClick(word.word)" class="word-link">
                    <span class="word">{{ word.word }}</span>

                    <span v-if="word.pronunciation">
                        <span v-if="word.pronunciation.all">[ {{ word.pronunciation.all  }} ]</span>
                        <span v-else>[ {{ word.pronunciation }} ]</span>
                    </span>

                    <span class="word__part-of-speech"  v-if="word.results">{{ word.results[0].partOfSpeech }}</span>

                    <span v-if="word.results">{{ $_wordContentCrop(word.results[0].definition) }}</span>
                </a>

                <a @click.prevent="$_onStarredWord(word)"
                   :class="$_onStarredWordClass(word)">
                    <font-awesome-icon fas icon="star" style="margin-right: 20px"/>
                </a>
            </div>

            <div class="word__content" v-if="wordClick === word.word && word.results">
                <p class="word__content-title">Definition:</p>
                <div v-for="item in word.results"
                     class="word-definition"
                     :key="item.index">
                    <font-awesome-icon far icon="circle" style="font-size: 8px"/> {{item.definition}}
                </div>
            </div>
        </div>

        <Spin fix v-if="loading = true">
            <Icon type="ios-loading"
                  size=18
                  class="demo-spin-icon-load"/>
            <div>Loading</div>
        </Spin>
    </div>
</template>

<script>
    export default {
        name: "word",

        props: {
            words: {
                type: Array,
                default: []
            },

            loading: {
                type: Boolean,
                default: false
            }
        },

        data: function () {
            return {
                wordClick: false,
                activeWord: ''
            }
        },

        methods: {
            $_wordContentCrop(definition) {
                let clamp = '...';
                if (definition.length > 60) {
                    return definition.slice(0, 60) + clamp;
                }
                return definition;
            },

            $_onWordClick: function(v) {
                if(v === this.wordClick) {
                    return this.wordClick = !this.wordClick;
                }
                return this.wordClick = v;
            },

            $_onStarredWord(word) {
                //вызов стора и проверка есть ли в нём слово
                if(this.words.includes(word)) {
                    console.log('Delete')
                }
                //удаление (реализовать в сторе)
            },

            $_onStarredWordClass(word) {
                //вызов стора и проверка есть ли в нём слово
                //поправить классы у звёздочки
                if(this.words.includes(word)) {
                    return 'blue-class-words';
                }
                return 'red-class-words';
            }
        }
    }
</script>

<style lang="less">
    .words__container {
        width: 45%;
        overflow: hidden;
        position: relative;
        word-break: break-word;
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

                .blue-class-words {
                    color: blue;
                    font-size: 18px;
                }

                .red-class-words {
                    color: red;
                    font-size: 18px;
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

        .demo-spin-icon-load{
            animation: ani-demo-spin 1s linear infinite;
        }
        @keyframes ani-demo-spin {
            from { transform: rotate(0deg);}
            50%  { transform: rotate(180deg);}
            to   { transform: rotate(360deg);}
        }
        .demo-spin{
            height: 100px;
            position: relative;
        }
    }
</style>