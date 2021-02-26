import axios from 'axios'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import songServices from '../services/services.js'
import './ArtistPage.css'

const ArtistPage = ({artists}) =>  {
    const artistArray = [...artists]
    const [artistImage, setArtistImage] = useState([])

    useEffect(() => {
        songServices.authenticate()
        .then(response => {
            let token = response
            let promises = []
            for (let artist of artistArray) {
                promises.push(
                axios.get("https://api.spotify.com/v1/search?q="+ artist + "&type=artist", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }))
            }
            Promise.all(promises)
            .then(response => response.map(obj => obj.data.artists.items[0].id))
            .then(response => {
                let promisesInner = []
                for (let id of response) {
                    promisesInner.push(axios.get("https://api.spotify.com/v1/artists/"+ id, {
                                        headers: {
                                            'Authorization': `Bearer ${token}`,
                                            "Accept": "application/json",
                                            "Content-Type": "application/json"
                                        }
                    })
                    )
                }
                Promise.all(promisesInner)
                .then(res => res.map(obj => obj.data.images[0].url))
                .then(res => setArtistImage(res))
            })
        })
    }, [])
    return (
            artistImage.length == artistArray.length ? 
            <div id = "all">
                {(artistArray.map((artist, index) => 
                    <div id = "individual">
                        <img src = {artistImage[index]}></img>
                        <Link to = {`/artist/${artist}`} key = {artist}>{artist}</Link>
                    </div>
                    )
                )}
            </div>
            : <div id = "loading">Loading Artists</div>
    )
}

export default ArtistPage