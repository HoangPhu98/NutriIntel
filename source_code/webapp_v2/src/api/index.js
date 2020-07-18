import axios from 'axios'

const API_BASE_URL = 'http://localhost:4004'

const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})


export function fetchUnits() {
    return client.get('/unit/all')
}