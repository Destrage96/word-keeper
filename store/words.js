import _ from 'lodash';

const __SESSION_WORDS_LIST_KEY = '__intl_wk_words_list';

export const state = () => ({
    list: JSON.parse(localStorage.getItem(__SESSION_WORDS_LIST_KEY)) || null
});

export const getters = {
    LIST: (state) => {
        return state.list
    },

    GET_BY_WORDS: (state) => (id) => {
        const list = state.list || [];
        return list.filter(function (item) {
            return item.id === id
        })[0];
    }
};

export const mutations = {
    SET_LIST: (store, list) => {
        if (list.length > 0) {
            store.list = list;
            localStorage.setItem(__SESSION_WORDS_LIST_KEY, JSON.stringify(list));
        }
    },
};

export const actions = {
    SAVE_LIST({commit}, list) {
        commit('SET_LIST', list);
    },

    CLEAR({commit}) {
        commit('SET_LIST', null);
    },

    async FETCH_LIST({commit, state}, {words}) {

        try {
            let wordsList = [];
            for (let i in words){
                let word = await this.$api.words.fetchListWords(words[i]);
                wordsList.push(word.word);
            }
            // console.log(wordsList, 'store')
            if (wordsList.length > 0) {
                commit('SET_LIST', wordsList);
            }
            return wordsList || []
        } catch (e) {
            throw e;
        }
    }
};