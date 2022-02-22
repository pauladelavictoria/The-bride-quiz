const ApiWords = () => {
    return fetch('http://localhost:4000/Pruebas/Prueba3')
      .then(response => response.json())
  }
  
  export default ApiWords;