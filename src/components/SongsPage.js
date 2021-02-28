import './SongsPage.css'

const SongsPage = ({songs}) => {
    songs.sort((a, b) => {
        return a.trkn[0] - b.trkn[0]
    })
    {console.log(songs)}
    return (
        <div id = "songsDiv">
        {songs.map(song =>  <div> {song['\xa9ART']}
                                    <br></br>
                                 {song['\xa9alb']}
                                 <br></br>
                                 {song['\xa9nam']}        
                            </div>)}
        </div>

    )
}

export default SongsPage