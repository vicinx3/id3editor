import {useHistory} from 'react-router-dom'
import './FileForm.css'

const FileForm = ({changeHandler, submitHandler}) => {
    const history = useHistory()

    const submitWrapper = (event) => {
        event.preventDefault()
        submitHandler().then(response => history.push('/groupArtists'))
    }

    return (
        <div id = "uploadDiv">
            <form id = "uploadForm" onSubmit = {submitWrapper}>
                <input type = "file" id = "fileInput" multiple onChange = {changeHandler}></input>
                <button type = "submit">Upload Files</button>
            </form>
        </div>
    )
}

export default FileForm