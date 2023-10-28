let data = [];
search_term = '';
const searchId = document.querySelector('#search')
const container = document.querySelector('.mediaSection')


// Fetch Data from API
window.onload = function () {
    axios({
        url: 'https://jsonplaceholder.ir/photos',
        method: 'get'
    }).then(res => {
        data = res.data;
        //console.log(data)
        showPhoto()
    })
    const inputSearch = document.querySelector('#search')
    inputSearch.addEventListener('input', e => {
        search_term = e.target.value;
        filterBarHandler();
    })

}
//creat and showPhoto
function showPhoto() {
    const container = document.querySelector('.mediaSection')
    data.map((item) => {
        addTodo(item)
    })
    deleteItem()
}

// search in input
const filterBarHandler = () => {
    const container = document.querySelector('.mediaSection')
    container.innerHTML = ''
    data.filter(item => item.title.toLowerCase().includes(search_term.toLowerCase())).forEach(item => {
        addTodo(item)
    });
    deleteItem()
}

//create new media
const addTodo = (item) => {
    const loading = document.querySelector('.loading');
    const newMedia = document.createElement('div');
    const image = document.createElement('img')
    const title = document.createElement('span')
    image.setAttribute('src', item.url);
    title.innerText = item.title
    newMedia.appendChild(image);
    newMedia.appendChild(title);
    newMedia.classList = 'media'
    container.appendChild(newMedia)
    loading.classList.remove('show');
}

//remove new media
const deleteItem = () => {
    const photoList = document.querySelectorAll('.mediaSection div')
    for (item of photoList) {
        item.addEventListener('click', function () {
            this.remove()
        })
    }
}

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
console.log( { scrollTop, scrollHeight, clientHeight });
    if ((clientHeight + scrollTop) >= scrollHeight-200) {
        loadMorePhotos();
    }
})
const loadMorePhotos = () => {
    const loading = document.querySelector('.loading');
    loading.classList.add('show');
    setTimeout(getPost ,100)
}        
 const getPost =() =>{
    axios({
        url: `https://jsonplaceholder.ir/photos/${Math.floor(Math.random()*100)}`,
        method: 'get'

    }).then(res => {
        data = res.data;
        addTodo(data)
    })
 } 
