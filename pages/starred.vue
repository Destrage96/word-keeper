<template>
    <div class="words-starred__container">
        <div class="content-search">
            <Search/>
            <PartOfSpeechCheckbox/>
        </div>

        <StarredWord class="content-words"/>
    </div>
</template>

<script>
    import Search from '../components/search';
    import PartOfSpeechCheckbox from '../components/part-of-speech-checkbox';
    import StarredWord from "../components/starred-word";

    export default {
        components: {
            StarredWord,
            Search,
            PartOfSpeechCheckbox
        }
    }
</script>

<style lang="less">
    .words-starred__container {
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
        .words-starred__container {
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