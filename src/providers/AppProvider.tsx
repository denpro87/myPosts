import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { auth } from '../firebase';

interface IAppContext { 
  user: any;
  setUser: (user: any) => void;
}

export interface IUIProviderProps {
  children?: ReactNode;
}

export const AppContext = createContext({} as IAppContext);

export const AppProvider = ({ children }: IUIProviderProps) => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => { 
        setUser(userAuth);
    });
  }, []);
  
  return (
    <AppContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </AppContext.Provider>
  )
} 