import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components';
import Routes from './routes';
import { AppProvider } from './providers/UserProvider';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes />
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default App;
