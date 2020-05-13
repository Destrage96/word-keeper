<template>
    <CheckboxGroup v-model="partOfSpeech"
                   class="part-of-speech__container"
                   @on-change="$_onChangePartOfSpeech">
        <Checkbox label="noun">
            <span>Noun</span>
        </Checkbox>
        <Checkbox label="verb">
            <span>Verb</span>
        </Checkbox>
        <Checkbox label="adjective">
            <span>Adjective</span>
        </Checkbox>
    </CheckboxGroup>
</template>

<script>
    export default {
        name: "part-of-speech-checkbox",
        data: function () {
            return {
                partOfSpeech: [],
            }
        },
        methods: {
            $_onChangePartOfSpeech() {
                return this.$root.$emit('part-of-speech', this.partOfSpeech);
            }
        }
    }
</script>

<style lang="less">
    .part-of-speech__container {
        display: flex;
        flex-direction: column;

        .ivu-checkbox-wrapper + span, .ivu-checkbox + span {
            margin-left: 5px;
        }
    }
</style>