
import { useGlobalContext } from '../context/context'
import { BsHandThumbsUp } from 'react-icons/bs'

function Meals() {

const { meals, loading, mealSelection, addToFavourites } = useGlobalContext()

if(loading){
  return <section className="section">
    <h4>Loading...</h4>
  </section>
}

if(meals.length < 1){
  return <section className="no-meal">
  <h4>No meals matched your searched term. Please try again.</h4>
</section>
}
  return <section className="section-center">
  {meals.map((singleMeal)=>{
    
    const { idMeal, strMeal: title, strMealThumb: image } = singleMeal;

    return <article id={idMeal} className="single-meal"> 
    {/* We only want to invoke the modal content when clicked.For that we make 
      the 'selectMeal' function as a return of an arrow function. */}
      <img src={image} alt="" className="img" onClick={() => mealSelection(idMeal)} />
      <footer>
        <h5>{title}</h5>
        <button className="like-btn" onClick={() => addToFavourites(idMeal)}> < BsHandThumbsUp /> </button>
      </footer>
    </article>
  })}
</section>
}

export default Meals
