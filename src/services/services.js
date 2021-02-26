import axios from 'axios'

const uploadSongs = (songs, setProgress) => {
    const request = axios.post('/', songs, {
        headers : {
            'content-type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent
            let percent = Math.floor((loaded * 100) / total)
            setProgress(percent)
        }
    })
    
    return request.then(response => response.data)
}

const authenticate = () => {
    return axios.get('/auth')
    .then(response => response.data)
}

export default {uploadSongs, authenticate}