import { MenuProps } from 'antd';

interface  ThemePallete {
  [key: string]: ThemeColor;
}

interface ThemeColor {
  primary?: string;
  secondary?: string;
  background?: string;
}

interface Theme {
  color: ThemeColor;
  navigation: MenuArgs;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

interface MenuArgs {
  menuitems: {
    name: string;
    path: string;
    isActive?: boolean;
  }[];
  branding: {
    logo_url: string;
    website_title: string;
  },
  lang: MenuProps['items']
}
