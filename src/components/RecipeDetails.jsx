import React from 'react';

function RecipeDetails({ recipe, onClose }) {
  return (
    <div className="recipe-details">
      <img src={recipe.image} alt={recipe.name} />
      <h2>{recipe.name}</h2>
      
      <div className="recipe-meta">
        <span>Cuisine: {recipe.cuisine}</span>
        <span>Preparation Time: {recipe.prepTimeMinutes} mins</span>
        <span>Cooking Time: {recipe.cookTimeMinutes} mins</span>
      </div>

      <h3>Ingredients</h3>
      <ul className="ingredients-list">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>

      <button className="btn btn-secondary" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default RecipeDetails;