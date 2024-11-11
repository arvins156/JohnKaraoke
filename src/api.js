const APIURL="http://localhost:8000/?url="
const URL='https://open.spotify.com/track/7aux5UvnlBDYlrlwoczifW?si=566366fc44ec4012'
const OPTION = {
    method: 'GET',
}

export const getLyrics = () => {
    return fetch (APIURL,OPTION) 
    .then(reponse => {
        return reponse.json()
    })
    .then(data => data.lines);
};