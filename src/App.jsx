import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MouseFollower from './MouseFollower';
import AppRoutes from './routes/AppRoutes';
import HelpBubble from './HelpBubble';
import GlobalLoginButton from './GlobalLoginButton';

function App() {
  return (
    <BrowserRouter>
      <MouseFollower />
      <AppRoutes />
      <HelpBubble />
      <GlobalLoginButton />
    </BrowserRouter>
  );
}

export default App;
