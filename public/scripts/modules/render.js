function render(books) {
  searchResults.innerHTML = ''
  if (books.length === 0) searchResults.innerText = 'No results found 😢'
  books.forEach((book) => {
    searchResults.insertAdjacentHTML(
      'beforeend',
      `
      <li>${book.name}</li>
    `
    )
  })
}

export { render }
