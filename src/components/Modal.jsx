import React from 'react'
import { useGlobalContext } from '../context/context'

function Modal() {

  const {selectedMeal, closeModal} = useGlobalContext()
  
  //Destructured meals object properties to selectedMeal state.
  const { strMealThumb: image, strMeal: title, strInstructions: text, strSource: source } = selectedMeal
  return (
    <aside className="modal-overlay">
      <div className="modal-container">
        <img src={image} alt="" className="img modal-img" />
        <div className="modal-content">
          <h4><b>{title}</b></h4>
          <p><b>Cooking Instructions</b></p>
          <p>{text}</p>
          <a href={source} target="_blank">Original Source</a>
          <button className="btn btn-hipster close-btn" onClick={closeModal}>close</button>
        </div>
      </div>
    </aside>
  )
}

export default Modal
