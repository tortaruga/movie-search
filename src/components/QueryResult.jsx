import imgNotAvailable from '/assets/image-not-available.png';

export default function queryResult(props) {
    
    let img;
    if (!props.img || props.img === 'N/A') {
        img = imgNotAvailable;
    } else {
        img = props.img;
    }

    return (
        <div className="result-preview">
            <div className="img-wrapper">
                <img src={img} alt="movie poster" />
            </div>

            <h1>{props.title} ({props.year})</h1>
        </div>
    )
}