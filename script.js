var searchResultDisplay = document.getElementById('search_result')

function hideAll(){
    searchResultDisplay.style.display='none'
}
document.getElementById('homeButton').addEventListener('click', function(){
    hideAll()
})

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
function searchResultList(animeList){
    const searchResult = document.getElementById('search_result');
    searchResult.innerHTML = ''
    console.log(animeList)
    for(anime of animeList){
        displaySearchResult(anime)
    }
}
function displaySearchResult(anime){
    console.log(anime)
    const searchResult = document.getElementById('search_result');
    let colDiv = document.createElement('div')
    colDiv.classList.add('col') 
    let firstDiv = document.createElement('div')
    firstDiv.classList.add('card')
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
    paragraph.innerHTML = anime.status
    secondDiv.appendChild(paragraph)
    searchResult.appendChild(colDiv)
}
function onLoad(){
    hideAll()
}