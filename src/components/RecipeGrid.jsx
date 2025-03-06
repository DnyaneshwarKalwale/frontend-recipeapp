import React from 'react';
import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChefHat, Clock, Users } from 'lucide-react';

const SortableRecipeCard = ({ recipe, onRecipeClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: recipe._id.toString()
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab'
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="recipe-card"
      onClick={() => onRecipeClick(recipe)}
    >
      <div className="recipe-card-image">
        <img src={recipe.image} alt={recipe.name} loading="lazy" />
        <div className="recipe-card-overlay">
          <div className="recipe-quick-info">
            <span><Clock size={16} /> {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</span>
            <span><Users size={16} /> {recipe.servings} servings</span>
            <span><ChefHat size={16} /> {recipe.cuisine}</span>
          </div>
        </div>
      </div>
      <div className="recipe-card-content">
        <h3>{recipe.name}</h3>
        <p className="recipe-description">{recipe.cuisine}</p>
        <div className="recipe-tags">
          {recipe.tags?.slice(0, 3).map((tag, index) => (
            <span key={index} className="recipe-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const DragOverlayContent = ({ recipe }) => (
  <div className="recipe-card" style={{ 
    transform: 'rotate(3deg)',
    cursor: 'grabbing',
    opacity: 0.8,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  }}>
    <div className="recipe-card-image">
      <img src={recipe.image} alt={recipe.name} loading="lazy" />
    </div>
    <div className="recipe-card-content">
      <h3>{recipe.name}</h3>
      <p className="recipe-description">{recipe.cuisine}</p>
    </div>
  </div>
);

function RecipeGrid({ recipes, onRecipeClick, currentPage, totalPages, onPageChange, onReorder }) {
  const [activeId, setActiveId] = React.useState(null);
  
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  const handleDragStart = (event) => setActiveId(event.active.id);
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) onReorder(active.id, over.id);
    setActiveId(null);
  };

  const activeRecipe = activeId ? recipes.find(r => r._id.toString() === activeId) : null;

  return (
    <div className="recipe-container">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <SortableContext items={recipes.map(r => r._id.toString())} strategy={rectSortingStrategy}>
          <div className="recipe-grid">
            {recipes.map(recipe => (
              <SortableRecipeCard key={recipe._id} recipe={recipe} onRecipeClick={onRecipeClick} />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeId && <DragOverlayContent recipe={activeRecipe} />}
        </DragOverlay>
      </DndContext>
      
      <div className="pagination">
        <button 
          className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        <div className="pagination-numbers">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button 
          className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default RecipeGrid;