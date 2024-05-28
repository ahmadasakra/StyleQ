import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
import ServicesSlider from './ServicesSlider/ServicesSlider';
import Footer from './Footer/Footer';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyle } from '../themes';

const HomePage = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Header toggleTheme={toggleTheme} theme={theme} />
      <ServicesSlider />
      <Footer />
    </ThemeProvider>
  );
};

export default HomePage;
