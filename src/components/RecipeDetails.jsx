import React, { useState } from 'react';

function RecipeDetails({ recipe, onClose, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: recipe.name,
    cuisine: recipe.cuisine,
    instructions: recipe.instructions,
    ingredients: recipe.ingredients.join('\n'),
    image: recipe.image,
    prepTimeMinutes: recipe.prepTimeMinutes,
    cookTimeMinutes: recipe.cookTimeMinutes,
    servings: recipe.servings
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate({
      ...formData,
      _id: recipe._id,
      ingredients: formData.ingredients.split('\n'),
      prepTimeMinutes: Number(formData.prepTimeMinutes),
      cookTimeMinutes: Number(formData.cookTimeMinutes),
      servings: Number(formData.servings)
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="recipe-details">
      {isEditing ? (
        <form>
          <div className="form-group">
            <label>Recipe Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Cuisine</label>
            <input
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Ingredients (one per line)</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label>Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Prep Time (minutes)</label>
            <input
              type="number"
              name="prepTimeMinutes"
              value={formData.prepTimeMinutes}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Cook Time (minutes)</label>
            <input
              type="number"
              name="cookTimeMinutes"
              value={formData.cookTimeMinutes}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Servings</label>
            <input
              type="number"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              required
            />
          </div>

          <div className="header-buttons">
            <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </form>
      ) : (
        <>
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

          <div className="header-buttons">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-primary" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default RecipeDetails;