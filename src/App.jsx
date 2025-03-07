import React, { useState, useEffect } from 'react';
import RecipeGrid from './components/RecipeGrid';
import RecipeForm from './components/RecipeForm';
import RecipeDetails from './components/RecipeDetails';
import Header from './components/Header';

const API_URL = 'https://recipe-new.onrender.com/api/recipes';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setRecipes(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setLoading(false);
    }
  };

  // SurpriseMe
  const handleSurpriseMe = () => {
    if (recipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      setSelectedRecipe(recipes[randomIndex]);
    }
  };

  const handleAddRecipe = async (newRecipe) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });
      const data = await response.json();
      setRecipes([data, ...recipes]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleUpdateRecipe = async (updatedRecipe) => {
    try {
      const response = await fetch(`${API_URL}/${updatedRecipe._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecipe),
      });
      const data = await response.json();
      setRecipes(recipes.map(recipe => recipe._id === data._id ? data : recipe));
      setSelectedRecipe(null);
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const handleReorder = async (activeId, overId) => {
    if (activeId === overId) return;

    const updatedRecipes = [...recipes];
    const oldIndex = updatedRecipes.findIndex(r => r._id === activeId);
    const newIndex = updatedRecipes.findIndex(r => r._id === overId);
    const [moved] = updatedRecipes.splice(oldIndex, 1);
    updatedRecipes.splice(newIndex, 0, moved);
    
    try {
      await fetch(`${API_URL}/reorder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderedIds: updatedRecipes.map(r => r._id)
        }),
      });
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error('Error reordering recipes:', error);
    }
  };

  const closeModal = () => {
    setShowForm(false);
    setSelectedRecipe(null);
  };

  // Pagination calculations
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  return (
    <div>
      <Header 
        onAddClick={() => setShowForm(true)}
        onSurpriseClick={handleSurpriseMe}  
      />

      {loading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <RecipeGrid 
          recipes={currentRecipes}
          onRecipeClick={handleRecipeClick}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onReorder={handleReorder}
        />
      )}

      {showForm && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <RecipeForm onSubmit={handleAddRecipe} onClose={closeModal} />
          </div>
        </div>
      )}

      {selectedRecipe && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <RecipeDetails 
              recipe={selectedRecipe} 
              onClose={closeModal}
              onUpdate={handleUpdateRecipe}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

