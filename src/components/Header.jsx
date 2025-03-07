import React from 'react';
import { ChefHat, PlusCircle, Sparkles, Moon, Sun } from 'lucide-react';

function Header({ onAddClick, onSurpriseClick, onToggleDarkMode, darkMode }) {
  return (
    <header className="header">
      <h1>
        <ChefHat className="inline-block mr-2" />
        Recipe Book
      </h1>
      <div className="header-buttons">
        <button className="btn btn-secondary" onClick={onToggleDarkMode}>
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          {darkMode ? ' Light Mode' : ' Dark Mode'}
        </button>
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