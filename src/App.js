import React, { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Home from './components/table/Home';
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';
import Report from './components/report/Report';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser,loadSettings} from './actions/setting';
import setAuthToken from './utils/setAuthToken';

// import './App.css';

const App = () => {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to server data, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());
    store.dispatch(loadSettings());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) ;
      // window.history.go('/login');
      <Navigate to="/login"/>
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            path="/"
            element={<PrivateRoute component={Home} />}
          />
          <Route
            path="/report"
            element={<PrivateRoute component={Report} />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
