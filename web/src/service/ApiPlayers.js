import React from 'react';

const ApiPlayers = (dataPlayers) => {
    return fetch('http://localhost:4000/playersPage',{
        method: 'POST',
        body: JSON.stringify(dataPlayers),
        headers: {'content-Type': "application/json"}
    })
    .then(response => response.json())
    .then((data) => {
        return data;
    })
};

export default ApiPlayers;