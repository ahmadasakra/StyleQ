import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from "../../themes";
import aboutStyle from "../About/About.css";

const About = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (

    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Header toggleTheme={() => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      }} theme={theme} />
      <div className={aboutStyle.about}>
        <h1>{t('about1.title')}</h1>
        <p>{t('about1.content')}</p>
        <h2>{t('about1.team')}</h2>
        <div className={aboutStyle.team}>
          {t('about1.teamMembers', { returnObjects: true }).map((member, index) => (
            <div key={index} className={aboutStyle.teamMember}>
              <img src={`path/to/team/member/image/${index + 1}.jpg`} alt={member.name} className={aboutStyle.teamPhoto} />
              <h3>{member.name}</h3>
              <p className={aboutStyle.position}>{member.position}</p>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </ThemeProvider>

);
};

export default About;
