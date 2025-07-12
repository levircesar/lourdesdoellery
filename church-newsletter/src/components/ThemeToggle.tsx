import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-church-blue focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      style={{
        backgroundColor: theme === 'dark' ? '#3b82f6' : '#d1d5db'
      }}
      aria-label="Alternar tema"
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
      <span className="sr-only">
        {theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      </span>
    </button>
  );
};

export default ThemeToggle; 