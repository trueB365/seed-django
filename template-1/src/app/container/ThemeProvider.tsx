import React, { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { Theme, ThemeColor, ThemeContextType, ThemePallete } from '@/app/types/theme';

const pallete: ThemePallete = {
    'light': {
      'primary': '#FF9933',
      'secondary': '#1976D2',
      'background': '#F7F7F7',
    },
    'dark': {
      'primary': '#39A5FF',
      'secondary': '#FFA822',
      'background': '#222222',
    },
  }

const theme: Theme = {
  color: {},
  navigation: {
    menuitems: [
      { name: 'home', path: '/' },
      { name: 'categories', path: '/categories' },
      { name: 'models', path: '/models' },
      { name: 'popular videos', path: '/popular' },
      { name: 'new Videos', path: '/new' },
      { name: 'Advertise', path: '/ads' },
    ],
    'branding': {
      website_title: 'AssoAss',
      logo_url: '/static/images/website_logo.png',
    },
    lang: [
      { label: 'English', key: '1' },
      { label: 'Swahili', key: '2' },
      { label: 'Russian', key: '3' },
    ],
  },
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType); // Default value

const ThemeProvider: FC<{ children: ReactNode; }> = ({ children }) => {
  const [themeName, setThemeName] = useState<string>('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) setThemeName(storedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', themeName);
  }, [themeName]);


  const toggleTheme = () => {
    setThemeName(themeName === 'light' ? 'dark' : 'light');
  };

  theme.color = pallete[themeName] as ThemeColor; // Type assertion

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };