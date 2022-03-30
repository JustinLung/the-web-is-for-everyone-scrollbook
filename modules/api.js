const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const baseUrl = 'https://mijnhva.api.fdnd.nl/v1'


async function getAllBooks() {
  return await fetchJson(`${baseUrl}/page`)
}

async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .then(json => json.data)
    .catch((error) => error)
}

module.exports = {
  getAllBooks
}