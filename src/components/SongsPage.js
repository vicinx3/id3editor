const SongsPage = ({songs}) => {
    songs.sort((a, b) => {
        return a.trkn[0] - b.trkn[0]
    })
    return (
        songs.map(song => <div> {song.aART}
                                {song.cprt}
                                {song.disk[0] + '/' + song.disk[1]}
                                {song.rtng === 0 ? 'not explicit' : 'explicit'}
                                {song.trkn[0] + '/' + song.trkn[1]}
                                {song['\xa9ART']}
                                {song['\xa9alb']}
                                {song['\xa9day']}
                                {song['\xa9gen']}
                                {song['\xa9nam']}        
                          </div>)
    )
}

export default SongsPage