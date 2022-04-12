import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

export const getInitialDarkMode = (): boolean => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('dark-mode');
    if (storedPrefs !== null) {
      return storedPrefs.toLowerCase() === 'true';
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return true;
    }
  }

  return false;
};

type DarkModeContext = [boolean, () => void];
const initialState: DarkModeContext = [false, () => {}];
const DarkModeContext = createContext<DarkModeContext>(initialState);

interface DarkModeProviderProps {
  children: ReactNode;
}
export const useDarkModeContext = (): DarkModeContext => {
  return useContext(DarkModeContext);
};

export default function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

  const rawSetDarkMode = (isDarkMode: boolean) => {
    localStorage.setItem('dark-mode', String(isDarkMode));

    const root = window.document.documentElement;
    root.classList.remove(isDarkMode ? 'light' : 'dark');
    root.classList.add(isDarkMode ? 'dark' : 'light');
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const defaultDarkMode = getInitialDarkMode();
    setDarkMode(defaultDarkMode);
  }, []);

  useEffect(() => {
    rawSetDarkMode(isDarkMode);
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={[isDarkMode, toggleDarkMode]}>
      {children}
    </DarkModeContext.Provider>
  );
}
