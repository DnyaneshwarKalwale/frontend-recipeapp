import React, { useState, useEffect } from 'react';
import RecipeGrid from './components/RecipeGrid';
import RecipeForm from './components/RecipeForm';
import RecipeDetails from './components/RecipeDetails';
import Header from './components/Header';
import CategoryFilter from './components/category';

const API_URL = 'https://recipe-new.onrender.com/api/recipes';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [cuisines, setCuisines] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const recipesPerPage = 8;

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (recipes.length > 0) {
      const uniqueCuisines = [...new Set(recipes.map(recipe => recipe.cuisine))];
      setCuisines(['All', ...uniqueCuisines]);
    }
  }, [recipes]);

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

  // Add the missing function
  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const filteredRecipes = selectedCuisine === 'All' 
    ? recipes 
    : recipes.filter(recipe => recipe.cuisine === selectedCuisine);

  const handleSurpriseMe = () => {
    if (filteredRecipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
      setSelectedRecipe(filteredRecipes[randomIndex]);
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
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Header 
        onAddClick={() => setShowForm(true)}
        onSurpriseClick={handleSurpriseMe}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        darkMode={darkMode}
      />

      {!loading && (
  
      <CategoryFilter
  cuisines={cuisines}
  selectedCuisine={selectedCuisine}
  onSelectCuisine={(cuisine) => {
    setCurrentPage(1);
    setSelectedCuisine(cuisine);
  }}
  darkMode={darkMode}
/>
      )}

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