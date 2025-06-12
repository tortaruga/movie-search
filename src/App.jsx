import { useState } from "react"

function App() {
  const [movieTitle, setMovieTitle] = useState('');

  function handleMovieTitle(e) {
    setMovieTitle(e.target.value);
  }

  function searchMovie(e) {
    e.preventDefault();
    
    fetch(`/.netlify/functions/fetchMovie?title=${encodeURIComponent(movieTitle)}`)
        .then(response => response.json())
        .then(data => console.log(data))  // Display movie details
        .catch(error => console.error("Error fetching movie:", error));
  }

  return (
    <>
      <main>
        <form>
          <input onChange={handleMovieTitle} type="text" name="movieQuery" id="movieQuery" placeholder="search for movie..." />
          <button onClick={searchMovie}>search</button>
        </form>
      </main>

      <footer></footer>
    </>
  )
}

export default App
