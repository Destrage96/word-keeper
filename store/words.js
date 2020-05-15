const __SESSION_WORDS_LIST_KEY = '__intl_wk_words_list';

export const state = () => ({
    list: JSON.parse(localStorage.getItem(__SESSION_WORDS_LIST_KEY)) || null
});

export const getters = {
    LIST: (state) => {
        return state.list
    }
};

export const mutations = {
    SET_LIST: (store, list) => {
        store.list = list;
        localStorage.setItem(__SESSION_WORDS_LIST_KEY, JSON.stringify(list));
    }
};

export const actions = {
    async FETCH_LIST({commit, state}, {words}) {

        try {
            let wordsList = [];
            for (let i in words) {
                let word = await this.$api.words.fetchListWords(words[i]);
                wordsList.push(word.word);
            }
            if (wordsList.length > 0) {
                commit('SET_LIST', wordsList);
            }
            return wordsList || []
        } catch (e) {
            throw e;
        }
    }
};