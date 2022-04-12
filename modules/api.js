const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const baseUrl = 'https://scrollbook.api.fdnd.nl/v1'

async function getAllBooks() {
  return await fetchJson(`${baseUrl}/book`)
}

async function getBookById(id) {
  return await fetchJson(`${baseUrl}/book/${id}`)
}

async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .then(json => json.data)
    .catch((error) => error)
}

module.exports = {
  getAllBooks,
  getBookById
}
