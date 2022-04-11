import { getAllBooks } from './api.js'

const searchResults = document.getElementById('searchResults')

async function search(e) {
  const searchValue = e.target.value.toLowerCase()
  if(searchValue === '') {
    searchResults.innerHTML = ''
  } else {
    const books = await getAllBooks()
    const filteredBooks = books.filter(book => book.name.toLowerCase().includes(searchValue))
    render(filteredBooks)
  }
}

function debounce(func, timeout = 200){
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, args); }, timeout)
  }
}

function render(books) {
  searchResults.innerHTML = ''
  if(books.length === 0) searchResults.innerText = 'No results found :('
  books.forEach(book=>{
    searchResults.insertAdjacentHTML('beforeend', `
      <li>${book.name}</li>
    `)
  })
}

export {
  search,
  debounce
}
