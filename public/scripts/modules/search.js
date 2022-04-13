import { getAllBooks } from './api.js'
import { render } from './render.js'

const searchResults = document.getElementById('searchResults')

async function search(e) {
  const searchValue = e.target.value.toLowerCase()
  if (searchValue === '') {
    searchResults.innerHTML = ''
  } else {
    const books = await getAllBooks()
    const filteredBooks = books.filter((book) =>
      book.name.toLowerCase().includes(searchValue)
    )
    render(filteredBooks, searchValue)
  }
}

function debounce(func, timeout = 200) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export { search, debounce }
