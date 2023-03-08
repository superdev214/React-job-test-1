import React, { Fragment } from "react";
import spinner from "./spinner.gif";

const Spinner = () => (
  <Fragment>
    <div className="my-5 py-5 border text-center text-bg-danger">
      <img
        src={spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
      <h3 className="text-bg-danger">
        You have to login.
      </h3>
    </div>
  </Fragment>
);

export default Spinner;
