
const ApiPlayers = (data) => {
    return fetch('http://localhost:4000/playersPage',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'content-Type': "application/json", 'id': 'uuid'}
    })
    .then(response => response.json())
};

export default ApiPlayers;