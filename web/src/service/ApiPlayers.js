
const ApiPlayers = (data) => {
    return fetch('http://localhost:4000/playersPage',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'content-Type': "application/json"}
    })
    .then(response => response.json())
};

export default ApiPlayers;