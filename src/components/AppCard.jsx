const apiUrl = import.meta.env.VITE_API_URL;


const AppCard = ({pizza, onCancel}) => {

    console.log(pizza);
    return (<div className="card my-3">
        <img src={`${apiUrl}/${pizza.image}`} alt="" />
        <div className="card-body">
            <h4>{pizza.name}</h4>
        </div>
        <div className="container my-2">
            <h4>Ingredienti:</h4>
            <ul>
                {pizza.ingredients && pizza.ingredients.map((curItem, index) => {
                    return (
                        <li key={index}>{curItem}</li>
                    )
                })}
            </ul>
        </div>
        <button className="btn btn-danger" onClick={onCancel}>Cancella</button>
    </div>)
}

export default AppCard;