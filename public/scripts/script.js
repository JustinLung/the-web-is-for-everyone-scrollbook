//Imports
import { search, debounce } from './modules/search.js'

const searchEl = document.getElementById('searchInput')
searchEl.addEventListener('keyup', debounce(search))
