import { useEffect, useState } from "react";
import axios from "axios";

const initialFormData = {
  name: "",
  image: "",
};

const apiUrl = "http://localhost:3001";

function App() {
  const [menu, setMenu] = useState([]);
  const [formData, setFormData] = useState(initialFormData); // object

  useEffect(() => {
    getPizzas();
  }, []);

  const getPizzas = () => {
    axios.get(`${apiUrl}/pizzas`).then((resp) => {
      console.log(resp);
      setMenu(resp.data.pizze);
    });
  };

  const handlePizzaForm = (event) => {
    event.preventDefault();

    // 1 creo l'oggetto della nuova pizza
    // const newPizza = {
    //   ...formData,
    //   id: Date.now(),
    // };

    axios.post(`${apiUrl}/pizzas`, formData).then((resp) => {
      console.log(resp);

      // 2 creo la copia dell'array menu precedente, aggiungendo la nuova pizza
      const newArray = [...menu, resp.data];

      // 3. aggiorno lo stato del menu
      setMenu(newArray);

      // 4. Ripulisco i campi del form
      setFormData(initialFormData);
    });
  };

  const cancella = (idDaCancellare) => {
    axios.delete(`${apiUrl}/pizzas/${idDaCancellare}`).then((resp) => {
      const newArray = menu.filter(
        (curPizza) => curPizza.id !== idDaCancellare
      );
      setMenu(newArray);
    });
  };

  const handleInputChange = (event) => {
    const keyToChange = event.target.name;
    // Se l'input è checkbox,
    //    allora il value da inserire sarà true o false, preso da target.checked
    let newValue;

    if (event.target.type === "checkbox") {
      newValue = event.target.checked;
    } else {
      newValue = event.target.value;
    }

    const newData = {
      ...formData,
      [keyToChange]: newValue,
    };

    setFormData(newData);
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
          <form onSubmit={handlePizzaForm}>
            <div className="mb-3">
              <label htmlFor="pizzaName">Nome della pizza</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="pizzaName"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="pizzaImage">Immagine</label>
              <input
                type="text"
                className="form-control"
                name="image"
                id="pizzaImage"
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Salva
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default App;
