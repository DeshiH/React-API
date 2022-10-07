import { useEffect, useState } from "react";
import Personajes from "../Personajes/Personajes";

function Pagina(props) {
  return (
    <header className="d-flex justify-content-between align-items-center mt-2 ">
      {props.page > 1 ? (
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => props.setPage(props.page - 1)}
        >
          Previous
        </button>
      ) : (
        <button className="invisible"></button>
      )}
      <button
        className="btn btn-secondary btn-sm"
        onClick={() => props.setPage(props.page + 1)}
      >
        Next
      </button>
    </header>
  );
}

function characterList() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    function rickandmorty() {
      let urlAPI = `https://rickandmortyapi.com/api/character?page=${page}`;
      fetch(urlAPI)
        .then((res) => res.json())
        .then((json) => {
          if (json.info.next === null) {
            setCharacters([]);
          } else {
            setCharacters(json.results);
            setResults(json.results);
          }
        });
    }
    rickandmorty();
  }, [page]);

  const searcher = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length == 0) {
      setCharacters(results);
    } else {
      fetch(`https://rickandmortyapi.com/api/character/?name=${search}`)
        .then((res) => res.json())
        .then((json) => {
          setCharacters(json.results);
        });
    }
  };

  //Agregar funcion que desaparezca el boton de next usando if
  return (
    <div className="container">
      <h1 className="rick">Rick and Morty API</h1>

      <nav className="navbar bg-dark">
        <div className="container-fluid">
          <form className="d-flex" role="search">
            <input
              onKeyUp={searcher}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
      </nav>
      <Pagina page={page} setPage={setPage} />
      <div className="row">
        {characters && characters.length === 0 ? (
          <h1>Sin resultados</h1>
        ) : (
          characters.map((character) => {
            return (
              <div className="col-6" key={character.id}>
                <Personajes character={character} />
              </div>
            );
          })
        )}
      </div>
      <Pagina page={page} setPage={setPage} />
    </div>
  );
}
export default characterList;
