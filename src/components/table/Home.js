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
    <div className="py-5 my-5">
      
      <div className="container mx-auto">
      <h2 className="my-5">Home</h2>
        <Fragment>
          <table className="table container m-auto overflow-scroll">
            <thead>
              <tr>
                {headerData.map((h) => (
                  <th className="text-center" key={h}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-center">{rows}</tbody>
          </table>
        </Fragment>
        <div />
      </div>
    </div>
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
