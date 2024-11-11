const APIURL="http://localhost:8000/?url="
const OPTION = {
    method: 'GET',
}

export const getLyrics = (values) => {
    return fetch (APIURL + values, OPTION) 
    .then(reponse =>  reponse.json())
    .then(data => data.lines)
    .then(lines => {
        for (let i = 0; i < lines.length; i++ ) {
            lines[i].startTimeMs = Number(lines[i].startTimeMs);
        }
        return lines;
    })
};

