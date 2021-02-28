import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import songServices from '../services/services.js'
import axios from 'axios'

const AlbumsPage = ({albums, artist}) => {
    let albumsArray = [...albums].map(item => item.toLowerCase())
    const [albumImage, setalbumImage] = useState([])
    useEffect(() => {
        albumsArray = albumsArray.map(item => {
            let res = item.split('-')
            if (res.length !== 1) {
                res.pop()
            }
            res = res.join('-')
            res = res.trim()
            return res
        })
        songServices.authenticate()
        .then(response => {
            let token = response
            axios.get("https://api.spotify.com/v1/search?q="+ artist.params.art + "&type=artist", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.data.artists.items[0].id)
            .then(response => {
                axios.get(`https://api.spotify.com/v1/artists/${response}/albums`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.data.items)
                .then(res => setalbumImage(res.filter(item => albumsArray.includes(item.name.toLowerCase()))))
            })
        })
    }, [])
    console.log(albumImage)
    return (
        albumImage.length >= albumsArray.length ? 
        <div id = "all">
            {(albumImage.map(album => 
                <div id = "individual">
                    <img src = {album.images[0].url}></img>
                    <Link to = {`/album/${album.name}`} key = {album.name}>{album.name}</Link>
                </div>
                )
            )}
        </div>
        : <div id = "loading">Loading Albums</div>
    )
}

export default AlbumsPage