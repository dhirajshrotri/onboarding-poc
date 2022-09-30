export const fetchScore =  ( payload , token) => {
    return new Promise(async (resolve, reject) => {
        await fetch('http://35.200.193.2:3000/api', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(payload)
        }).then((data) => data.json())
            .then((data) => resolve(data.rating));
    })
}