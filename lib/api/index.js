import words from '../api/words';

export default $axios => ({
  words: words($axios),
})
