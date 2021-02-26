import {Link} from 'react-router-dom'

const AlbumsPage = ({albums}) => {
    const albumsArray = [...albums]
    return (
        <div>
            {albumsArray.map(album => <Link to = {`/album/${album}`} key = {album}>{album}</Link>)}
        </div>
    )
}

export default AlbumsPage