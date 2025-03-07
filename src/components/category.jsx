import React from 'react';

function CategoryFilter({ cuisines, selectedCuisine, onSelectCuisine, darkMode }) {
  return (
    <div className={`category-filter ${darkMode ? 'dark' : ''}`}>
      {cuisines.map(cuisine => (
        <button
          key={cuisine}
          className={`category-btn ${selectedCuisine === cuisine ? 'active' : ''}`}
          onClick={() => onSelectCuisine(cuisine)}
        >
          {cuisine}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;