import { useLocation, useParams } from "react-router-dom"
import imgNotAvailable from '/assets/image-not-available.png';


export default function MovieDetails(props) {
    const location = useLocation();
    const {title} = useParams();
    const data = location.state?.data;

    let img;
        if (!data?.Poster || data?.Poster === 'N/A') {
            img = imgNotAvailable;
        } else {
            img = data?.Poster;
        }
    
    return (

        <div className="details">

            <div className="img-wrapper">
                <img src={img} alt="movie poster" />
            </div>

            <div className="subgroup">
            <h1>{data?.Title === 'N/A' ? '–' : data?.Title} ({data?.Year === 'N/A' ? '–' : data?.Year})</h1>
            <div className="main-info">
               <p className="genre">{data?.Genre === 'N/A' ? '–' : data?.Genre}</p>
               <p className="runtime">{data?.Runtime === 'N/A' ? '–' : data?.Runtime}</p>
               <p className="type">{data?.Type === 'N/A' ? '–' : data?.Type}</p>
            </div>

            <h2>Plot</h2>
            <p className="plot">{data?.Plot}</p>

            <div className="secondary-info">
              <p><span>Actors:</span> {data?.Actors === 'N/A' ? '–' : data?.Actors}</p>
              <p><span>Director:</span> {data?.Director === 'N/A' ? '–' : data?.Director}</p>
              <p><span>Writer:</span> {data?.Writer === 'N/A' ? '–' : data?.Writer}</p>
              <p><span>Release:</span> {data?.Released === 'N/A' ? '–' : data?.Released}</p>
              <p><span>Language:</span> {data?.Language === 'N/A' ? '–' : data?.Language}</p>
            </div>
           </div>
            
        </div>
    )
}