import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({
  component: Component,
  setting: { isAuthenticated, loading }
}) => {
  if (loading) return <Spinner />;
  if (isAuthenticated) {
    
    return <Component />;
  }

  return <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  setting: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  setting: state.setting
});

export default connect(mapStateToProps)(PrivateRoute);
