import QueryResult from './QueryResult.jsx';
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';

export default function Form() {
  const [movieTitle, setMovieTitle] = useState('');

  const [queryResult, setQueryResult] = useState(undefined);

  function handleMovieTitle(e) {
    setMovieTitle(e.target.value);
  }

  function searchMovie(e) {
    e.preventDefault();
    setQueryResult({loading: true});
    
    fetch(`/.netlify/functions/fetchMovie?title=${encodeURIComponent(movieTitle)}`)
        .then(response => {
          if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
        return response.json();
        })
        .then(data => {
    if (data.Response === "False") {
        console.log("Movie not found!");
        return setQueryResult({ error: "Movie not found!" });
      }
      console.log(data);
      return setQueryResult(data);
    })
  .catch(error => {
     if (error.message.includes("Failed to fetch")) {
        console.error("Network error! Please check your internet connection.");
        return setQueryResult({ error: "Network error! Please check your internet connection." });
      }
      console.error("Unexpected error:", error);
      return setQueryResult({ error: "An unexpected error occurred. Try again later." });
  });
 }
 
 const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const updateNavHeight = () => {
      const height = document.querySelector("nav")?.clientHeight || 0;
      setNavHeight(height);
    };

    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);

    return () => window.removeEventListener("resize", updateNavHeight);
  }, []);

  const formHeight = `calc(100vh - ${navHeight}px)`;

    
    return (
        <form style={{minHeight: formHeight}}>
          <label htmlFor="movieQuery">
            <input onChange={handleMovieTitle} type="text" name="movieQuery" id="movieQuery" placeholder="search for movie..." />
            <button onClick={searchMovie}>search</button>
          </label>
          
          {queryResult?.loading && <p>Fetching movie data... Please wait.</p>}
          {(!queryResult?.loading && queryResult?.error) && <p>{queryResult.error}</p>}
          {(queryResult && !queryResult?.loading && !queryResult?.error) && (
            <Link to={`/details/${queryResult?.Title}`} state={{data: queryResult}} style={{textDecoration: 'none', color: 'inherit' }}>
          <section className="result">
            {<QueryResult title={queryResult?.Title} year={queryResult?.Year} img={queryResult?.Poster} />}
          </section>
          </Link>
          )}
          
        </form>
    )
}