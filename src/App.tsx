import React, { FC, useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Home from './pages/home/Home';
import 'devextreme/dist/css/dx.light.css';
import { useAppDispatch } from 'src/store/hooks';
import { initializeAuth } from 'src/reducers/auth/authSlice';
import Area1 from './components/area-1';
import Area2 from './components/area-2';
import Area3 from './components/area-3';
import Area4 from './components/area-4';
import Area5 from './components/area-5';
import Area6 from './components/area-6';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '2rem', marginTop: '2rem' }}>
        <Switch>
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Register} />
          <PublicRoute path="/forgot-password" component={ForgotPassword} />
          <ProtectedRoute path="/" exact component={() => <Home />} />
          <ProtectedRoute path="/a-area-1" component={() => <Area1 />} />
          <ProtectedRoute path="/a-area-2" component={() => <Area2 />} />
          <ProtectedRoute path="/a-area-3" component={() => <Area3 />} />
          <ProtectedRoute path="/a-area-4" component={() => <Area4 />} />
          <ProtectedRoute path="/a-area-5" component={() => <Area5 />} />
          <ProtectedRoute path="/a-area-6" component={() => <Area6 />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
