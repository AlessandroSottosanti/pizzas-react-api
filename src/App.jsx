import { useEffect, useState } from "react";

function App() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getPizzas();
  }, []);

  const getPizzas = () => {
   
  };



  return (
    <>
      <div className="container">
        <section>
          <h2>Le nostre pizze</h2>

          {menu.length > 0 ? (
            <div className="row row-cols-2 row-cols-lg-3">
              {menu.map((curItem) => (
                <div className="col" key={curItem.id}>
                  <div className="card">
                    <img src={`${apiUrl}/${curItem.image}`} alt="" />
                    <div className="card-body">
                      <h4>{curItem.name}</h4>
                      <button
                        onClick={() => cancella(curItem.id)}
                        className="btn btn-danger"
                      >
                        Cancella
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Nessuna pizza presente</p>
          )}
        </section>

        <section>
          <h3>Aggiungi una nuova pizza</h3>
          
        </section>
      </div>
    </>
  );
}

export default App;
