import React, { createContext, ReactNode, useState } from 'react';
interface IAppContext { 
  user: any;
  setUser: (user: any) => void;
}

export interface IUIProviderProps {
  children?: ReactNode;
}

export const AppContext = createContext({} as IAppContext);

export const AppProvider = ({ children }: IUIProviderProps) => {
  const [user, setUser] = useState(null);
  
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