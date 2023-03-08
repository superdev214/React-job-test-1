import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';
import { connect } from "react-redux";
const Report = ({
  education: { school, degree, fieldofstudy, current, to, from, description }
}) => (
  <div>
    <h3 className="text-dark">{school}</h3>
    <p>
      {formatDate(from)} - {to ? formatDate(to) : 'Now'}
    </p>
    <p>
      <strong>Degree: </strong> {degree}
    </p>
    <p>
      <strong>Field Of Study: </strong> {fieldofstudy}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

// Report.propTypes = {
//   education: PropTypes.object.isRequired
// };

const mapStateToProps = (state) => ({
  loadTable: PropTypes.func.isRequired,
  tableData: state.setting.table?.tabledata,
  isAuthenticated: state.setting.isAuthenticated,
  loading: state.setting.loading,
});

export default connect(mapStateToProps, { loadTable })(Report);