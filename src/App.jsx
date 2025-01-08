import { useEffect, useState } from "react";
import axios from "axios";
import AppCard from "./components/AppCard";
const apiUrl = import.meta.env.VITE_API_URL;

const initialData = {
  name: '',
  image: ''
}

function App() {
  const [menu, setMenu] = useState([]);
  const [formData, setFormData] = useState(initialData);
  const [ingredients, setIngredients] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getPizzas();
  }, [filter]);

  useEffect(() => {
    getIngredients();
  }, []);


// Get pizze
  const getPizzas = () => {
    let url = `${apiUrl}/pizzas`;
    if (filter !== "all") {
      url += `?ingredient=${filter}`;
    }
    axios.get(url).then((resp) => {
      setMenu(resp.data.pizze)
    })
  };

  // Get ingredienti
  const getIngredients = () => {
    axios.get(`${apiUrl}/ingredients`).then((resp) => {
      setIngredients(resp.data.ingredients);
    })
  };



  const handleInputChange = (event) => {
    // console.log(event.target.value);
    // console.log(event.target.name);
    const keyToChange = event.target.name;

    const newData = {
      ...formData,
      [keyToChange]: event.target.value
    }

    setFormData(newData);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    console.log("submit", formData);

    axios.post(`${apiUrl}/pizzas`, formData).then((resp) => {
      console.log(resp);
      const newPizza = resp.data;

      const newMenu = [
        ...menu,
        newPizza
      ];

      setMenu(newMenu);
      setFormData(initialData);
    });
  }

  const handleDeleteCard = (id) => {
    console.log(`elimina card ${id}`);

    axios.delete(`${apiUrl}/pizzas/${id}`).then((resp) => {

      const newMenu = menu.filter((curPizza) => curPizza.id !== id);
      setMenu(newMenu);
      console.log(resp);
    });
  }

  
  return (
    <>
      <div className="container">

        <section className="my-5">
          <label className="mx-2" htmlFor="ingredient">Filtra per ingrediente:</label>
          <select name="ingredient" id="" value={filter} onChange={(event) => setFilter(event.target.value)}>
            <option value="all">Tutti</option>
            {ingredients.map((curItem, index) => 
              <option key={index} value={curItem} >{curItem}</option>
            )}
          </select>
        </section>

        <section>
          <h2>Le nostre pizze</h2>

          {menu.length > 0 ? (
            <div className="row row-cols-2 row-cols-lg-3">
              {menu.map((curItem) => (
                <div className="col" key={curItem.id}>
                  <AppCard
                    pizza={curItem}
                    onCancel={() => handleDeleteCard(curItem.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>Nessuna pizza presente</p>
          )}
        </section>

        <section onSubmit={handleFormSubmit}>
          <h3>Aggiungi una nuova pizza</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="name">Nome pizza</label>
              <input type="text" name="name" id="name" className="form-control" value={formData.name} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="image">Url immagine</label>
              <input type="text" name="image" id="image" className="form-control" value={formData.image} onChange={handleInputChange} />
            </div>

            <button type="subumit" className="btn btn-primary">invia</button>
          </form>
        </section>
      </div>
    </>
  );
}

export default App;
