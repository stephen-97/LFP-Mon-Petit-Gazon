
const Request = (endpoint: string) : Promise<any> => {
    const controller = new AbortController()

    // 5 second timeout:
    setTimeout(() => controller.abort(), 5000)

    // FETCH, la methode est toujours  GET, la base de l'url est la même, donc utilise le endpoint
    return fetch(`https://api.mpg.football${endpoint}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        signal: controller.signal
    })
        .then(response => response.json().then(data => data))
}

export { Request }