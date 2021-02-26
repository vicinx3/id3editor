import './UploadProgress.css'

const UploadProgress = ({percent}) => {
    return (
        <div id = "uploadPercent">{percent}% Uploaded</div>
    )
}

export default UploadProgress