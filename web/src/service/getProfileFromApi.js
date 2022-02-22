
const getProfileFromApi = (name) => {
    return fetch('http://localhost:4000/turn',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'name': name,
          },
    })
    .then(response => response.json())
};

export default getProfileFromApi;

// https://github.com/Adalab/promo-o-module-4-pair-14-netflix/blob/master/web/src/services/api-user.js