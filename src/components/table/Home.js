import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadTable } from "../../actions/setting";

const Home = ({ tableData, isAuthenticated, loading, loadTable }) => {
  const [headerData, setHeaderData] = useState([]);
  const [tableContents, setTableContents] = useState([]);

  useEffect(() => {
    
    if (isAuthenticated) {
      loadTable();
    }
  }, [isAuthenticated, loading, loadTable]);
  useEffect(() => {
    let isApiSubscribed = true;

    const handleTableData = () => {
      if (!isApiSubscribed) return;
      if (tableData && tableData.length) {
        setHeaderData(tableData[0]);

        let contentsData = [...tableData];
        contentsData.shift();
        setTableContents(contentsData);
      }
    };

    handleTableData();

    return () => {
      isApiSubscribed = false;
    };
  }, [tableData]);
  const rows = tableContents?.map((tc, index) => (
    <tr key={index}>
      {tc.map((t, _index) => (
        <td key={_index}>{t}</td>
      ))}
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            {headerData.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </Fragment>
  );
};

// Home.propTypes = {
//   // tableData: PropTypes.array.isRequired,
// };

const mapStateToProps = (state) => ({
  loadTable: PropTypes.func.isRequired,
  tableData: state.setting.table?.tabledata,
  isAuthenticated: state.setting.isAuthenticated,
  loading: state.setting.loading,
});

export default connect(mapStateToProps, { loadTable })(Home);
