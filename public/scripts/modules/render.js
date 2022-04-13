function render(books, searchValue) {
  searchResults.innerHTML = ''
  if (books.length === 0) searchResults.innerText = `No results found for '${searchValue}' 😢`
  books.forEach((book) => {
    searchResults.insertAdjacentHTML(
      'beforeend',
      `

      <li>
        <img src="https://raw.githubusercontent.com/JustinLung/the-web-is-for-everyone-scrollbook/${book.book_cover}" />
        <p>${book.name}</p>
      </li>
    `
    )
  })
}

export { render }
