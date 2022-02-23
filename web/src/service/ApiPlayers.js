
export const getPlayers = (data) => {
    return fetch('http://localhost:4000/players',{
        method: 'GET',
        headers: {'content-Type': "application/json"}
    })
    .then(response => response.json())
};

export const createPlayer = (data) => {
    return fetch('http://localhost:4000/players',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'content-Type': "application/json"}
    })
    .then(response => response.json())
};

export const deletePlayer = (data) => {
    return fetch('http://localhost:4000/players',{
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {'content-Type': "application/json"}
    })
    .then(response => response.json())
};
