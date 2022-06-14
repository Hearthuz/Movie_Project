var searchResultDisplay = document.getElementById('search_result')
var singleAnimeDisplay = document.getElementById('single_anime_result')
var interestedResultDisplay = document.getElementById('interested_result')
var interestedHeaderDisplay = document.getElementById('interestedHeader')

function hideAll(){
    searchResultDisplay.style.display='none'
    singleAnimeDisplay.style.display='none'
    interestedResultDisplay.style.display='none'
    interestedHeaderDisplay.style.display='none'
}

function onLoad(){
    hideAll()
    topAnime()
}

document.getElementById('homeButton').addEventListener('click', function(){
    hideAll()
    topAnime()
})

function singleAnimeData(anime){
    hideAll()
    singleAnimeDisplay.style.display='block'
    let imageElem = document.getElementById('image')
    imageElem.setAttribute('src', anime.image_url)
    let titleElem = document.getElementById('title')
    titleElem.innerHTML = anime.title
    let typeElem = document.getElementById('type')
    typeElem.innerHTML = anime.type
    let episodesElem = document.getElementById('episodes')
    episodesElem.innerHTML = anime.episodes
    let scoreElem = document.getElementById('score')
    scoreElem.innerHTML = anime.score
    let statusElem = document.getElementById('rated')
    statusElem.innerHTML = anime.rated
    let synopsisElem = document.getElementById('synopsis')
    synopsisElem.innerHTML = anime.synopsis
    let urlElem = document.getElementById('url')
    urlElem.setAttribute('href', anime.url)
}

document.getElementById('searchButton').addEventListener('click',() =>{
    const query = document.getElementById('inputText').value
    console.log(query)
    fetch(`https://api.jikan.moe/v4/anime?q=${query}&sfw`)
    .then((response) => {
        return response.json()
    })
    .then(data => {
        hideAll()
        searchResultDisplay.style.display='flex'
        searchResultList(data.data)
    })
    .catch(error => {
        alert('your input is not in database')
    })
})

document.getElementById('interestedButton').addEventListener('click',() =>{
    showAllInterestedResult()
})

function showAllInterestedResult(){
    fetch(`https://se104-project-backend.du.r.appspot.com/movies/642110332`,{
        method: 'GET'
    })
    .then((response) => {
        return response.json()
    })
    .then(data => {
        hideAll()
        interestedHeaderDisplay.style.display='block'
        interestedResultDisplay.style.display='flex'
        interestedList(data)
    })
    .catch(error => {
        alert('your input is not in database')
    })
}

function searchResultList(animeList){
    const searchResult = document.getElementById('search_result');
    searchResult.innerHTML = ''
    console.log(animeList)
    for(anime of animeList){
        displaySearchResult(anime)
    }
}

function interestedList(data){
    const interestedResult = document.getElementById('interested_result');
    interestedResult.innerHTML = ''
    console.log(data)
    for(anime of data){
        displayInterestedResult(anime)
    }
}

function displayInterestedResult(anime){
    const searchResult = document.getElementById('interested_result');
    let colDiv = document.createElement('div')
    colDiv.classList.add('col') 
    let firstDiv = document.createElement('div')
    firstDiv.classList.add('card')
    colDiv.appendChild(firstDiv)
    let image = document.createElement('img')
    image.setAttribute('src',anime.image_url)
    image.classList.add('card-img-top')
    firstDiv.appendChild(image)
    let secondDiv = document.createElement('div')
    secondDiv.classList.add('card-body')
    firstDiv.appendChild(secondDiv)
    let header5 = document.createElement('h5')
    header5.classList.add('card-title')
    header5.classList.add('text-dark')
    header5.innerHTML = anime.title
    secondDiv.appendChild(header5)
    let paragraph = document.createElement('p')
    paragraph.classList.add('card-text')
    paragraph.classList.add('text-secondary')
    paragraph.innerHTML = anime.type
    secondDiv.appendChild(paragraph)
    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-warning')
    button.classList.add('me-3')
    button.setAttribute('type', 'button')
    button.innerText = 'detail'
    button.addEventListener('click', function(){
        hideAll()
        singleAnimeData(anime)
    })
    secondDiv.appendChild(button)
    let deleteButton = document.createElement('button')
    deleteButton.classList.add('btn')
    deleteButton.classList.add('btn-danger')
    deleteButton.setAttribute('type', 'button')
    deleteButton.innerText = 'delete'
    deleteButton.addEventListener('click', function(){
        let cf = `Want to add ${anime.title} ?`;
        if(confirm(cf)){
            console.log(anime.id)
            deleteAnime(anime.id)
        }
    })
    secondDiv.appendChild(deleteButton)
    searchResult.appendChild(colDiv)
}

function displaySearchResult(anime){
    const searchResult = document.getElementById('search_result');
    let colDiv = document.createElement('div')
    colDiv.classList.add('col') 
    let firstDiv = document.createElement('div')
    firstDiv.classList.add('card')
    firstDiv.addEventListener('dblclick', function() {
        let cf = `Want to add ${anime.title} ?`;
        if(confirm(cf)){
            console.log(anime)
            addAnimeToDB(anime)
        }
    })
    colDiv.appendChild(firstDiv)
    let image = document.createElement('img')
    image.setAttribute('src',anime.images.jpg.image_url)
    image.classList.add('card-img-top')
    firstDiv.appendChild(image)
    let secondDiv = document.createElement('div')
    secondDiv.classList.add('card-body')
    firstDiv.appendChild(secondDiv)
    let header5 = document.createElement('h5')
    header5.classList.add('card-title')
    header5.classList.add('text-dark')
    header5.innerHTML = anime.title
    secondDiv.appendChild(header5)
    let paragraph = document.createElement('p')
    paragraph.classList.add('card-text')
    paragraph.classList.add('text-secondary')
    paragraph.innerHTML = anime.type
    secondDiv.appendChild(paragraph)
    searchResult.appendChild(colDiv)
}

function addAnimeToDB(anime){
    fetch('https://se104-project-backend.du.r.appspot.com/movies',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            id: '642110332',
            movie: {
                url: `${anime.url}`,
                image_url: `${anime.images.jpg.image_url}`,
                title: `${anime.title}`,
                synopsis: `${anime.synopsis}`,
                type: `${anime.type}`,
                episodes: `${anime.episodes}`,
                score: `${anime.score}`,
                rated: `${anime.rating}`,
            }
        })
    }).then(response => {
        if (response.status === 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data => {
        console.log('success',data)
        alert(`anime ${data.title} is now added`)
        showAllInterestedResult()
    }).catch(error => {
        return null
    })
}

function deleteAnime(id){
    fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=642110332&&movieId=${id}`,{
        method: 'DELETE'
    }).then(response => {
        if (response.status === 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data => {
        alert(`Anime name ${data.title} is now deleted`)
        showAllInterestedResult()
    }).catch(error => {
        alert('your input student id is not in database')
    })
}
function topAnime(){
    fetch('https://api.jikan.moe/v4/top/anime?q=bypopularity')
    .then((response) => {
        return response.json()
    })
    .then(data => {
        console.log(data)
        hideAll()
        searchResultDisplay.style.display='flex'
        searchResultList(data.data)
    })
    .catch(error => {
        alert('your input is not in database')
    })
}
