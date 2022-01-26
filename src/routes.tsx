import React, { ReactNode, useContext } from 'react'
import { Routes as Switch, Route, useLocation, Navigate } from 'react-router-dom';
import { Home, Login } from './pages';
import { AppContext } from './providers/AppProvider';

interface IProps {
  children: ReactNode;
}
const RequireAuth: React.FC<IProps> = ({children}) => {
  let location = useLocation();
  const { user } = useContext(AppContext);
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
}

const Routes = () => (
    <Switch>
      <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
      <Route path="/login" element={<Login />} />
    </Switch>
)

export default Routes
