const APIURL="http://localhost:8000/?url=https://open.spotify.com/track/7aux5UvnlBDYlrlwoczifW?si=566366fc44ec4012&format=lrc"
const URL='https://open.spotify.com/track/7aux5UvnlBDYlrlwoczifW?si=566366fc44ec4012'
const OPTION = {
    method: 'GET',
}
fetch (APIURL,OPTION) 
.then(reponse => {
    return reponse.json()
})
.then(data => {
    console.log(data)
})