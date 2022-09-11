import axios from 'axios';
export const getQuote = async () => {
  return axios
    .get('https://api.quotable.io/random')
    .then((res) => res.data.content)
    .catch((err) => {
      throw err;
    });
};

export const getRandomFact = async () => {
  return axios
    .get('https://uselessfacts.jsph.pl/random.json?language=en')
    .then((res) => res.data.text)
    .catch((err) => {
      throw err;
    });
};

export const getRandomJoke = async () => {
  return axios
    .get('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    })
    .then((res) => res.data.joke)
    .catch((err) => {
      throw err;
    });
};
