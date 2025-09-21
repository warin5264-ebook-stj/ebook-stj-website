// components/ThemeToggleButton.js
"use client";

import { useTheme } from '@/context/ThemeContext';
import React from 'react';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.5rem',
        padding: '0.5rem'
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggleButton;