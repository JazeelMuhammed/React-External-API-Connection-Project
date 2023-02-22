import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'

const AppContext = React.createContext()

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const getFavouritesFromLocalStorage = () => {
  let favourites = localStorage.getItem('favourites');
  if (favourites) {
    favourites = JSON.parse(localStorage.getItem('favourites'))
  }
  else {
    favourites = []
  }
  return favourites;
}

function AppProvider({children}) {
  
const [meals, setMeals] = useState([])
const [loading, setLoading] = useState(false)
const [searchTerm, setSearchTerm] = useState('')
const [showModal, setShowModal] = useState(false)
const [selectedMeal, setSelectedMeal] = useState(null)
const [favourites, setFavourites] = useState(getFavouritesFromLocalStorage())

const fetchMeals = async(url) =>{
//Loading is true when start fetching or updating data.
  setLoading(true)

  try {
// Only fetching data object from array using Destructuring.
// We use Axios to communicate with API's easily in our React App.
    const {data} = await axios(url)
    // only if any data is present.
   if (data.meals) {
    setMeals(data.meals)
   }
   else{
   // else return empty array for state meals.
    setMeals([])
   }  
  } 
   catch(error){
    console.log(error.response)
  }
   // Loading is false when stopped fetching data.
   setLoading(false) 
}

// To fetch Random Meal :-
const fetchRandomMeal = () =>{
  fetchMeals(randomMealUrl)
}
  
  useEffect(() => {
    fetchMeals(allMealsUrl)
  },[])  

  useEffect(()=>{
  /* Here we combine both allMeals db and inputted text
      for fetching meals data. */
  if (!searchTerm) 
  return
    fetchMeals(`${allMealsUrl}${searchTerm}`)
  }, [searchTerm])


  const mealSelection = (idMeal,favouriteMeal) => {
    let meal;
    if(favouriteMeal) {
      //if its true.
      meal = favourites.find((meal) => meal.idMeal === idMeal)
    }
    else{
      // Returns the 1st array element that satisfy the condition.
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    setSelectedMeal(meal)
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const addToFavourites = (idMeal) => {
    console.log(idMeal)
    const alreadyFavourites = favourites.find((meal)=> meal.idMeal === idMeal)
    if (alreadyFavourites){
      return
    }
    else{
      const meal = meals.find((meal)=> meal.idMeal === idMeal)
      const updatedFavourites = [...favourites, meal]
      setFavourites(updatedFavourites)
      localStorage.setItem('favourites', JSON.stringify(updatedFavourites))
    }
  }

  const removeFromFavourites = (idMeal) => {
    const updatedFavourites = favourites.filter((meal) => meal.idMeal !== idMeal)
    setFavourites(updatedFavourites)
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites))
  }

  return (
    <AppContext.Provider value={{ meals, loading, setSearchTerm, fetchRandomMeal, showModal, mealSelection, selectedMeal,
    closeModal,favourites,addToFavourites,removeFromFavourites }}>
        { children }
    </AppContext.Provider>
  )
}

// we made a custom hook for useContext.
export const useGlobalContext = () =>{
  return useContext(AppContext)
}

export {AppContext, AppProvider}