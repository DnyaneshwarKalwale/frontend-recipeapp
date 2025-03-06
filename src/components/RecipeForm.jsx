import React, { useState } from 'react';

function RecipeForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    cuisine: '',
    instructions: '',
    ingredients: '',
    image: '',
    prepTimeMinutes: '',
    cookTimeMinutes: '',
    servings: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      ingredients: formData.ingredients.split('\n'),
      prepTimeMinutes: Number(formData.prepTimeMinutes),
      cookTimeMinutes: Number(formData.cookTimeMinutes),
      servings: Number(formData.servings)
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="recipe-form">
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
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
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default RecipeForm;