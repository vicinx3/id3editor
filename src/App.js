import { useState } from "react"
import FileForm from './components/FileForm.js'
import ArtistPage from './components/ArtistPage.js'
import AlbumsPage from './components/AlbumsPage.js'
import SongsPage from './components/SongsPage.js'
import songServices from './services/services.js'
import UploadProgress from './components/UploadProgress.js'
import {Switch, Route, useRouteMatch} from "react-router-dom"
import './App.css'
import axios from 'axios'

const App = () => {
    const [allSongs, setAllSongs] = useState([])
    const [retSongs, setRetSongs] = useState([])
    const [uploadProgress, setUploadProgress] = useState(0)

    const fileChange = (event) => {
        setAllSongs(event.target.files)
    }   

    const formSubmit = () => {
        const songData = new FormData()
        for (const song of allSongs) {
            songData.append('song', song, song.name)
        }

        return songServices.uploadSongs(songData, setUploadProgress)
        .then(response => {
            setRetSongs(response)
        })
    }

    const matchArtist = useRouteMatch('/artist/:art')
    const albums = matchArtist ? retSongs.filter(album => (album.aART === matchArtist.params.art)).map(album => album['\xa9alb']) : null

    const matchSong = useRouteMatch('/album/:alb')
    const songs = matchSong ? retSongs.filter(album => (album['\xa9alb'] === matchSong.params.alb)) : null
    
    return (
        <>
            <Switch>
                <Route path = "/album/:alb">
                    <SongsPage songs = {songs}/>
                </Route>
                <Route path = "/groupArtists">
                    <ArtistPage artists = {new Set(retSongs.map(song => song.aART).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())))}/>
                </Route>
                <Route path = "/artist/:art">
                    <AlbumsPage albums = {new Set(albums)}/>
                </Route>
                <Route path = "/">
                    {(uploadProgress === 0) ? <FileForm changeHandler = {fileChange} submitHandler = {formSubmit}/> : <UploadProgress percent = {uploadProgress}/>} 
                </Route>
            </Switch>       
        </>
    )
}

export default App;