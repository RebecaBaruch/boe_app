fetch('http://127.0.0.1:5000/getResults/6477d0245c49dc742d2f5302', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response => 
        response.json()
        
    )
    .then(responseData => {
        console.log(responseData);
    })
    .catch(error => {
        console.log(error)
    });   