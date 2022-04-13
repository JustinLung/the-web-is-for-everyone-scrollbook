function render(books, searchValue) {
  searchResults.innerHTML = ''
  if (books.length === 0) searchResults.innerText = `No results found for '${searchValue}' 😢`
  books.forEach((book) => {
    searchResults.insertAdjacentHTML(
      'beforeend',
      `

      <li>
      <a href="/book/${book.book_id}">
        <img src="https://raw.githubusercontent.com/JustinLung/the-web-is-for-everyone-scrollbook/${book.book_cover}" />
        <p>${book.name}</p>
      </a>
      </li>
    `
    )
  })
}

export { render }
