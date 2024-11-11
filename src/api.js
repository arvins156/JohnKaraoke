const APIURL="http://localhost:8000/?url=https://open.spotify.com/track/7aux5UvnlBDYlrlwoczifW?si=ae05fba6cd7048ab"
const OPTION = {
    method: 'GET',
}

export const getLyrics = (values) => {
    console.log(APIURL + values);
    return fetch (APIURL, OPTION) 
    .then(reponse => {
        return reponse.json()
    })
    .then(data => data.lines)
    .then(lines => {
        lines.map(obj => {
            return obj.startTimeMs = Number(obj.startTimeMs);
        })
    })
    ;
};