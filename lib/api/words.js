export default $axios => ({
    async fetchListWords(word) {
        try {
            const getWord = await $axios.$get('words/' + word);
            if (typeof (getWord) === 'object') {
                return {
                    word: getWord,
                };
            }
            return null;
        } catch (error) {
            throw error;
        }
    },

    async searchWords(query) {
        try {
            let list = null;
                list = await $axios.$get('words/?letterPattern=^' + query + '.*$&limit=10');
            if (typeof (list) === 'object') {
                return {
                    list: Object.values(list),
                };
            }
            return null;
        } catch (error) {
            throw error;
        }
    },
});
