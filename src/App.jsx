
import { Route, Routes, Link } from "react-router-dom";
import MovieDetails from "./components/MovieDetails.jsx";
import Form from "./components/Form.jsx";

function App() {

  return (
    <>
      <main>

        <nav>
          <Link to='/' style={{textDecoration: 'none', color: 'inherit' }}><h1>mmovies</h1></Link>
        </nav>

        <Routes>
          <Route path="/" element={<Form />}></Route>
          <Route path="details/:id" element={<MovieDetails />}></Route>
        </Routes>

      </main>

      <footer></footer>
    </>
  )
}

export default App
