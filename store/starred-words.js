import _ from 'lodash';

const __SESSION_STARRED_WORDS_LIST_KEY = '__intl_wk_starred_words_list';

export const state = () => ({
    words: JSON.parse(localStorage.getItem(__SESSION_STARRED_WORDS_LIST_KEY)) || []
});

export const getters = {
    LIST: (state) => {
        return state.words
    }
};

export const mutations = {
    SET_LIST_WORD: (store, word) => {
        store.words.push(word);
        localStorage.setItem(__SESSION_STARRED_WORDS_LIST_KEY, JSON.stringify(store.words));
    },

    SET_LIST_WORDS: (store, words) => {
        store.words = words;
        localStorage.setItem(__SESSION_STARRED_WORDS_LIST_KEY, JSON.stringify(store.words));
    }
};

export const actions = {
    SAVE_WORD({commit, getters}, word) {
        let wordsStarred = _.cloneDeep(getters['LIST']);
        if (!_.isEmpty(wordsStarred)) {
            let index = wordsStarred.map(x => {
                return x.word;
            }).indexOf(word.word);

            if (index === -1) {
                commit('SET_LIST_WORD', word);
            }
        } else {
            commit('SET_LIST_WORD', word);
        }
    },

    DELETED_WORD({commit, getters}, word) {
        let wordsStarred = _.cloneDeep(getters['LIST']);
        let index = wordsStarred.map(x => {
            return x.word;
        }).indexOf(word.word);

        if (index !== -1) {
            wordsStarred.splice(index, 1);
        }
        commit('SET_LIST_WORDS', wordsStarred)
    }
};