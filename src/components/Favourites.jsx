import React from 'react'
import { useGlobalContext } from '../context/context'

function Favourites() {

  const { mealSelection, favourites, removeFromFavourites } = useGlobalContext()
  return (
   <section className="favourites">
    <div className="favourites-content">
      <h5>Favourites</h5>
      <div className="favourites-container">
        {
          favourites.map((item)=>{
            const {idMeal, strMealThumb: image} = item;
            return (
            <div key={idMeal} className="favourite-item">
              <img src={image} alt="" className="favourite-img img" onClick={() => mealSelection(idMeal, true)} />
              <button className="remove-btn" onClick={() => removeFromFavourites(idMeal)}>remove</button>
            </div>
            ) 
          })
        }
      </div>
    </div>
   </section>
  )
}

export default Favourites
