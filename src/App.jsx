import { useState, useEffect } from "react"

function App() {
  const [movieTitle, setMovieTitle] = useState('');
  const [queryResult, setQueryResult] = useState({});

  function handleMovieTitle(e) {
    setMovieTitle(e.target.value);
  }

  function searchMovie(e) {
    e.preventDefault();
    
    fetch(`/.netlify/functions/fetchMovie?title=${encodeURIComponent(movieTitle)}`)
        .then(response => response.json())
        .then(data => setQueryResult(data))  // Display movie details
        .catch(error => console.error("Error fetching movie:", error));
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
    <>
      <main>

        <nav>
          <h1>mmovies</h1>
        </nav>

        <form style={{minHeight: formHeight}}>
          <label htmlFor="movieQuery">
            <input onChange={handleMovieTitle} type="text" name="movieQuery" id="movieQuery" placeholder="search for movie..." />
            <button onClick={searchMovie}>search</button>
          </label>

          <section>
            <p>{queryResult.Title}</p>
          </section>
        </form>
      </main>

      <footer></footer>
    </>
  )
}

export default App
