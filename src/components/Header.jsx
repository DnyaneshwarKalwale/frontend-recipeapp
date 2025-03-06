import React from 'react';
import { ChefHat, PlusCircle, Sparkles } from 'lucide-react';

function Header({ onAddClick, onSurpriseClick }) {
  return (
    <header className="header">
      <h1>
        <ChefHat className="inline-block mr-2" />
        Recipe Book
      </h1>
      <div className="header-buttons">
        <button className="btn btn-secondary" onClick={onSurpriseClick}>
          <Sparkles size={18} />
          Surprise Me
        </button>
        <button className="btn btn-primary" onClick={onAddClick}>
          <PlusCircle size={18} />
          Add Recipe
        </button>
      </div>
    </header>
  );
}

export default Header;